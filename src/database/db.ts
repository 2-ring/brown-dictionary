import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  doc,
  getDoc,
  runTransaction
} from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  type User
} from 'firebase/auth';

export interface Definition {
  id: string; // Unique identifier for the definition
  text: string;
  example: string;
  author: string;
  authorId?: string;
  upvotes: number; // Computed from upvoteUserIds.length
  downvotes: number; // Computed from downvoteUserIds.length
  upvoteUserIds: string[]; // Array of user IDs who upvoted
  downvoteUserIds: string[]; // Array of user IDs who downvoted
  createdAt: Date;
}

export interface Word {
  id?: string;
  term: string;
  slug: string;
  definitions: Definition[];
  createdAt: Date;
  viewCount: number;
}

// ===== FIREBASE CONFIGURATION =====
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// ===== AUTHENTICATION FUNCTIONS =====
export const signUp = async (email: string, password: string, displayName: string): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, { displayName });
  return userCredential.user;
};

export const signIn = async (email: string, password: string): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const signOut = async (): Promise<void> => {
  await firebaseSignOut(auth);
};

export const getWords = async (): Promise<Word[]> => {
  const wordsRef = collection(db, 'words');
  const q = query(wordsRef, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(docSnapshot => ({
    id: docSnapshot.id,
    ...docSnapshot.data() as Word,
    createdAt: docSnapshot.data().createdAt.toDate(),
    definitions: docSnapshot.data().definitions.map((def: any) => ({
      ...def,
      createdAt: def.createdAt.toDate(),
      upvotes: def.upvoteUserIds.length,
      downvotes: def.downvoteUserIds.length
    }))
  }));
};

export const getWordBySlug = async (slug: string): Promise<Word | null> => {
  const wordsRef = collection(db, 'words');
  const q = query(wordsRef, where('slug', '==', slug), limit(1));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const docSnapshot = snapshot.docs[0];
  return {
    id: docSnapshot.id,
    ...docSnapshot.data() as Word,
    createdAt: docSnapshot.data().createdAt.toDate(),
    definitions: docSnapshot.data().definitions.map((def: any) => ({
      ...def,
      createdAt: def.createdAt.toDate(),
      upvotes: def.upvoteUserIds.length,
      downvotes: def.downvoteUserIds.length
    }))
  };
};

export const getWordsByLetter = async (letter: string): Promise<Word[]> => {
  const wordsRef = collection(db, 'words');
  const upperLetter = letter.toUpperCase();
  const nextLetter = String.fromCharCode(upperLetter.charCodeAt(0) + 1);
  const q = query(
    wordsRef,
    where('term', '>=', upperLetter),
    where('term', '<', nextLetter),
    orderBy('term', 'asc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(docSnapshot => ({
    id: docSnapshot.id,
    ...docSnapshot.data() as Word,
    createdAt: docSnapshot.data().createdAt.toDate(),
    definitions: docSnapshot.data().definitions.map((def: any) => ({
      ...def,
      createdAt: def.createdAt.toDate(),
      upvotes: def.upvoteUserIds.length,
      downvotes: def.downvoteUserIds.length
    }))
  }));
};

export const searchWords = async (searchTerm: string): Promise<Word[]> => {
  const wordsRef = collection(db, 'words');
  const q = query(wordsRef);
  const snapshot = await getDocs(q);
  const results = snapshot.docs
    .map(docSnapshot => ({
      id: docSnapshot.id,
      ...docSnapshot.data() as Word,
      createdAt: docSnapshot.data().createdAt.toDate(),
      definitions: docSnapshot.data().definitions.map((def: any) => ({
        ...def,
        createdAt: def.createdAt.toDate(),
        upvoteUserIds: def.upvoteUserIds || [],
        downvoteUserIds: def.downvoteUserIds || [],
        upvotes: def.upvoteUserIds?.length || def.upvotes || 0,
        downvotes: def.downvoteUserIds?.length || def.downvotes || 0
      }))
    }))
    .filter(word =>
      word.term.toLowerCase().includes(searchTerm.toLowerCase())
    );
  return results;
};

export const getRandomWords = async (count: number = 5): Promise<Word[]> => {
  const wordsRef = collection(db, 'words');
  const snapshot = await getDocs(wordsRef);
  const allWords = snapshot.docs.map(docSnapshot => ({
    id: docSnapshot.id,
    ...docSnapshot.data() as Word,
    createdAt: docSnapshot.data().createdAt.toDate(),
    definitions: docSnapshot.data().definitions.map((def: any) => ({
      ...def,
      createdAt: def.createdAt.toDate(),
      upvotes: def.upvoteUserIds.length,
      downvotes: def.downvoteUserIds.length
    }))
  }));
  const shuffled = [...allWords].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Helper function to create a URL-friendly slug
const createSlug = (term: string): string => {
  return term
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
};

export interface NewWordData {
  term: string;
  definition: string;
  example: string;
  author: string;
  authorId?: string;
}

export const addNewWord = async (data: NewWordData): Promise<void> => {
  const wordsRef = collection(db, 'words');
  const slug = createSlug(data.term);

  // Check if word already exists
  const existingQuery = query(wordsRef, where('slug', '==', slug), limit(1));
  const existingSnapshot = await getDocs(existingQuery);

  if (!existingSnapshot.empty) {
    // Word exists, add definition to existing word
    // TODO: Implement adding definition to existing word
    throw new Error('Word already exists. Adding definitions to existing words is not yet implemented.');
  }

  // Create new word
  const newWord = {
    term: data.term,
    slug: slug,
    definitions: [
      {
        id: generateDefinitionId(),
        text: data.definition,
        example: data.example,
        author: data.author,
        authorId: data.authorId,
        upvotes: 0,
        downvotes: 0,
        upvoteUserIds: [],
        downvoteUserIds: [],
        createdAt: Timestamp.now()
      }
    ],
    createdAt: Timestamp.now(),
    viewCount: 0
  };

  await addDoc(wordsRef, newWord);
};

export interface Report {
  definitionId?: string;
  wordSlug?: string;
  reason: string;
  additionalInfo?: string;
  createdAt: Date;
  status: 'pending' | 'reviewed' | 'resolved';
}

export const submitReport = async (
  wordSlug: string,
  reason: string,
  additionalInfo?: string
): Promise<void> => {
  const reportsRef = collection(db, 'reports');

  const report = {
    wordSlug: wordSlug,
    reason: reason,
    additionalInfo: additionalInfo || '',
    createdAt: Timestamp.now(),
    status: 'pending'
  };

  await addDoc(reportsRef, report);
};

export const getUserDefinitions = async (userId: string): Promise<Word[]> => {
  const wordsRef = collection(db, 'words');
  const snapshot = await getDocs(wordsRef);

  // Filter words that have at least one definition by this user
  const userWords = snapshot.docs
    .map(docSnapshot => ({
      id: docSnapshot.id,
      ...docSnapshot.data() as Word,
      createdAt: docSnapshot.data().createdAt.toDate(),
      definitions: docSnapshot.data().definitions.map((def: any) => ({
        ...def,
        createdAt: def.createdAt.toDate(),
        upvoteUserIds: def.upvoteUserIds || [],
        downvoteUserIds: def.downvoteUserIds || [],
        upvotes: def.upvoteUserIds?.length || def.upvotes || 0,
        downvotes: def.downvoteUserIds?.length || def.downvotes || 0
      }))
    }))
    .filter(word =>
      word.definitions.some((def: Definition) => def.authorId === userId)
    );

  return userWords;
};

export const getUserDefinitionsByUsername = async (username: string): Promise<Word[]> => {
  const wordsRef = collection(db, 'words');
  const snapshot = await getDocs(wordsRef);

  // Filter words that have at least one definition by this username
  const userWords = snapshot.docs
    .map(docSnapshot => ({
      id: docSnapshot.id,
      ...docSnapshot.data() as Word,
      createdAt: docSnapshot.data().createdAt.toDate(),
      definitions: docSnapshot.data().definitions.map((def: any) => ({
        ...def,
        createdAt: def.createdAt.toDate(),
        upvoteUserIds: def.upvoteUserIds || [],
        downvoteUserIds: def.downvoteUserIds || [],
        upvotes: def.upvoteUserIds?.length || def.upvotes || 0,
        downvotes: def.downvoteUserIds?.length || def.downvotes || 0
      }))
    }))
    .filter(word =>
      word.definitions.some((def: Definition) => def.author.toLowerCase() === username.toLowerCase())
    );

  return userWords;
};

// ===== VOTE MANAGEMENT FUNCTIONS =====

/**
 * Generates a unique ID for a definition using timestamp and random string
 */
const generateDefinitionId = (): string => {
  return `def_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Gets the current vote state for a user on a specific definition
 * @param wordId - The ID of the word document
 * @param definitionId - The unique ID of the definition
 * @param userId - The ID of the user
 * @returns 'up' if upvoted, 'down' if downvoted, null if no vote
 */
export const getUserVote = async (
  wordId: string,
  definitionId: string,
  userId: string
): Promise<'up' | 'down' | null> => {
  const wordRef = doc(db, 'words', wordId);
  const wordDoc = await getDoc(wordRef);

  if (!wordDoc.exists()) {
    return null;
  }

  const word = wordDoc.data() as Word;
  const definition = word.definitions.find(def => def.id === definitionId);

  if (!definition) {
    return null;
  }

  if (definition.upvoteUserIds?.includes(userId)) {
    return 'up';
  }
  if (definition.downvoteUserIds?.includes(userId)) {
    return 'down';
  }

  return null;
};

/**
 * Upvotes a definition, removing any existing downvote from the same user
 * Uses transactions to prevent race conditions
 * @param wordId - The ID of the word document
 * @param definitionId - The unique ID of the definition
 * @param userId - The ID of the user voting
 */
export const upvoteDefinition = async (
  wordId: string,
  definitionId: string,
  userId: string
): Promise<void> => {
  const wordRef = doc(db, 'words', wordId);

  await runTransaction(db, async (transaction) => {
    const wordDoc = await transaction.get(wordRef);

    if (!wordDoc.exists()) {
      throw new Error('Word not found');
    }

    const word = wordDoc.data() as Word;
    const definitionIndex = word.definitions.findIndex(def => def.id === definitionId);

    if (definitionIndex === -1) {
      throw new Error('Definition not found');
    }

    const definition = word.definitions[definitionIndex];
    const upvoteUserIds = definition.upvoteUserIds;
    const downvoteUserIds = definition.downvoteUserIds;

    // Check if user already upvoted
    if (upvoteUserIds.includes(userId)) {
      // Already upvoted, no action needed
      return;
    }

    // Update the definition with new vote arrays
    const updatedDefinitions = [...word.definitions];
    const newUpvoteUserIds = [...upvoteUserIds, userId];
    const newDownvoteUserIds = downvoteUserIds.filter(id => id !== userId);

    updatedDefinitions[definitionIndex] = {
      ...definition,
      upvoteUserIds: newUpvoteUserIds,
      downvoteUserIds: newDownvoteUserIds,
      upvotes: newUpvoteUserIds.length,
      downvotes: newDownvoteUserIds.length
    };

    transaction.update(wordRef, {
      definitions: updatedDefinitions
    });
  });
};

/**
 * Downvotes a definition, removing any existing upvote from the same user
 * Uses transactions to prevent race conditions
 * @param wordId - The ID of the word document
 * @param definitionId - The unique ID of the definition
 * @param userId - The ID of the user voting
 */
export const downvoteDefinition = async (
  wordId: string,
  definitionId: string,
  userId: string
): Promise<void> => {
  const wordRef = doc(db, 'words', wordId);

  await runTransaction(db, async (transaction) => {
    const wordDoc = await transaction.get(wordRef);

    if (!wordDoc.exists()) {
      throw new Error('Word not found');
    }

    const word = wordDoc.data() as Word;
    const definitionIndex = word.definitions.findIndex(def => def.id === definitionId);

    if (definitionIndex === -1) {
      throw new Error('Definition not found');
    }

    const definition = word.definitions[definitionIndex];
    const upvoteUserIds = definition.upvoteUserIds;
    const downvoteUserIds = definition.downvoteUserIds;

    // Check if user already downvoted
    if (downvoteUserIds.includes(userId)) {
      // Already downvoted, no action needed
      return;
    }

    // Update the definition with new vote arrays
    const updatedDefinitions = [...word.definitions];
    const newUpvoteUserIds = upvoteUserIds.filter(id => id !== userId);
    const newDownvoteUserIds = [...downvoteUserIds, userId];

    updatedDefinitions[definitionIndex] = {
      ...definition,
      upvoteUserIds: newUpvoteUserIds,
      downvoteUserIds: newDownvoteUserIds,
      upvotes: newUpvoteUserIds.length,
      downvotes: newDownvoteUserIds.length
    };

    transaction.update(wordRef, {
      definitions: updatedDefinitions
    });
  });
};

/**
 * Removes a user's vote (upvote or downvote) from a definition
 * Uses transactions to prevent race conditions
 * @param wordId - The ID of the word document
 * @param definitionId - The unique ID of the definition
 * @param userId - The ID of the user removing their vote
 */
export const removeVote = async (
  wordId: string,
  definitionId: string,
  userId: string
): Promise<void> => {
  const wordRef = doc(db, 'words', wordId);

  await runTransaction(db, async (transaction) => {
    const wordDoc = await transaction.get(wordRef);

    if (!wordDoc.exists()) {
      throw new Error('Word not found');
    }

    const word = wordDoc.data() as Word;
    const definitionIndex = word.definitions.findIndex(def => def.id === definitionId);

    if (definitionIndex === -1) {
      throw new Error('Definition not found');
    }

    const definition = word.definitions[definitionIndex];
    const upvoteUserIds = definition.upvoteUserIds;
    const downvoteUserIds = definition.downvoteUserIds;

    // Update the definition with user removed from both arrays
    const updatedDefinitions = [...word.definitions];
    const newUpvoteUserIds = upvoteUserIds.filter(id => id !== userId);
    const newDownvoteUserIds = downvoteUserIds.filter(id => id !== userId);

    updatedDefinitions[definitionIndex] = {
      ...definition,
      upvoteUserIds: newUpvoteUserIds,
      downvoteUserIds: newDownvoteUserIds,
      upvotes: newUpvoteUserIds.length,
      downvotes: newDownvoteUserIds.length
    };

    transaction.update(wordRef, {
      definitions: updatedDefinitions
    });
  });
};

export { generateDefinitionId };
