import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';

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
