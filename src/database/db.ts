import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, query, where, orderBy, limit, Timestamp } from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  type User
} from 'firebase/auth';

export interface Definition {
  text: string;
  example: string;
  author: string;
  upvotes: number;
  downvotes: number;
  createdAt: Date;
}

export interface Word {
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
const db = getFirestore(app);
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
  return snapshot.docs.map(doc => ({
    ...doc.data() as Word,
    createdAt: doc.data().createdAt.toDate(),
    definitions: doc.data().definitions.map((def: any) => ({
      ...def,
      createdAt: def.createdAt.toDate()
    }))
  }));
};

export const getWordBySlug = async (slug: string): Promise<Word | null> => {
  const wordsRef = collection(db, 'words');
  const q = query(wordsRef, where('slug', '==', slug), limit(1));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return {
    ...doc.data() as Word,
    createdAt: doc.data().createdAt.toDate(),
    definitions: doc.data().definitions.map((def: any) => ({
      ...def,
      createdAt: def.createdAt.toDate()
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
  return snapshot.docs.map(doc => ({
    ...doc.data() as Word,
    createdAt: doc.data().createdAt.toDate(),
    definitions: doc.data().definitions.map((def: any) => ({
      ...def,
      createdAt: def.createdAt.toDate()
    }))
  }));
};

export const searchWords = async (searchTerm: string): Promise<Word[]> => {
  const wordsRef = collection(db, 'words');
  const q = query(wordsRef);
  const snapshot = await getDocs(q);
  const results = snapshot.docs
    .map(doc => ({
      ...doc.data() as Word,
      createdAt: doc.data().createdAt.toDate(),
      definitions: doc.data().definitions.map((def: any) => ({
        ...def,
        createdAt: def.createdAt.toDate()
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
  const allWords = snapshot.docs.map(doc => ({
    ...doc.data() as Word,
    createdAt: doc.data().createdAt.toDate(),
    definitions: doc.data().definitions.map((def: any) => ({
      ...def,
      createdAt: def.createdAt.toDate()
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
        text: data.definition,
        example: data.example,
        author: data.author,
        upvotes: 0,
        downvotes: 0,
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
