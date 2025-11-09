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

// ===== FIREBASE INTERFACE (COMMENTED OUT FOR NOW) =====
/*
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, getDocs, query, where, orderBy, limit } from 'firebase/firestore';

const firebaseConfig = {
  // Your Firebase config here
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
*/

// ===== TEST DATA IMPLEMENTATION =====

const TEST_WORDS: Word[] = [
  {
    term: "cake is just gay bread",
    slug: "cake-is-just-gay-bread",
    definitions: [
      {
        text: "fruit cake. fish cake. confetti cake. pineapple upside down cake. POUND CAKE.....",
        example: "cassatella di sant'Agata cakes from italy are shaped like boobies (look it up) to honor Saint Agatha of Sicily. Made of sponge, moistened with juice or liqueur, and stuffed with ricotta and chocolate. Decorated with marzipan, icing, and candied fruit....like come on\n\noh and sugar? gay salt\n\nCake is just gay bread",
        author: "Sickomonster",
        upvotes: 847,
        downvotes: 53,
        createdAt: new Date("2025-11-07"),
      },
    ],
    createdAt: new Date("2025-11-07"),
    viewCount: 2341,
  },
  {
    term: "yeet",
    slug: "yeet",
    definitions: [
      {
        text: "To forcefully throw an object with the intent of showing dominance and/or power.",
        example: "Person 1: *Chucks football at full power*\nPerson 2: Damn, he really yeeted that ball!",
        author: "ThrowMaster3000",
        upvotes: 12453,
        downvotes: 892,
        createdAt: new Date("2024-03-15"),
      },
      {
        text: "An exclamation of excitement, approval, surprise, or all-around energy.",
        example: "Teacher: You got an A on the test!\nStudent: YEET!",
        author: "YeetKing",
        upvotes: 8234,
        downvotes: 456,
        createdAt: new Date("2024-05-22"),
      },
    ],
    createdAt: new Date("2024-03-15"),
    viewCount: 45823,
  },
  {
    term: "bussin",
    slug: "bussin",
    definitions: [
      {
        text: "When something is really good, especially food.",
        example: "Yo, this pizza is bussin bussin!",
        author: "FoodCritic99",
        upvotes: 5621,
        downvotes: 234,
        createdAt: new Date("2024-08-10"),
      },
    ],
    createdAt: new Date("2024-08-10"),
    viewCount: 18234,
  },
  {
    term: "rizz",
    slug: "rizz",
    definitions: [
      {
        text: "Short for charisma. The ability to attract romantic interest.",
        example: "Bro, you got no rizz. That's why she left you on read.",
        author: "CharmSchool",
        upvotes: 9876,
        downvotes: 543,
        createdAt: new Date("2024-01-20"),
      },
    ],
    createdAt: new Date("2024-01-20"),
    viewCount: 34567,
  },
  {
    term: "no cap",
    slug: "no-cap",
    definitions: [
      {
        text: "Means no lie or for real. Used to emphasize that you're telling the truth.",
        example: "That concert was amazing, no cap.",
        author: "TruthTeller",
        upvotes: 7234,
        downvotes: 321,
        createdAt: new Date("2024-06-05"),
      },
    ],
    createdAt: new Date("2024-06-05"),
    viewCount: 23456,
  },
  {
    term: "mid",
    slug: "mid",
    definitions: [
      {
        text: "Used to describe something that is mediocre or of poor quality.",
        example: "That movie was mid, not gonna lie.",
        author: "CriticCorner",
        upvotes: 4532,
        downvotes: 876,
        createdAt: new Date("2024-09-12"),
      },
    ],
    createdAt: new Date("2024-09-12"),
    viewCount: 15678,
  },
  {
    term: "slay",
    slug: "slay",
    definitions: [
      {
        text: "To do something very well or look amazing.",
        example: "She absolutely slayed that performance!",
        author: "PerformanceQueen",
        upvotes: 6789,
        downvotes: 234,
        createdAt: new Date("2024-04-18"),
      },
    ],
    createdAt: new Date("2024-04-18"),
    viewCount: 28901,
  },
  {
    term: "vibe check",
    slug: "vibe-check",
    definitions: [
      {
        text: "Assessing the emotional atmosphere or mood of a situation or person.",
        example: "Walking into that party... vibe check: immaculate.",
        author: "VibeAnalyzer",
        upvotes: 3456,
        downvotes: 123,
        createdAt: new Date("2024-07-23"),
      },
    ],
    createdAt: new Date("2024-07-23"),
    viewCount: 12345,
  },
  {
    term: "simp",
    slug: "simp",
    definitions: [
      {
        text: "Someone who does way too much for someone they like.",
        example: "He bought her flowers every day for a month. Total simp behavior.",
        author: "RealityCheck",
        upvotes: 8901,
        downvotes: 1234,
        createdAt: new Date("2024-02-14"),
      },
    ],
    createdAt: new Date("2024-02-14"),
    viewCount: 41234,
  },
  {
    term: "hits different",
    slug: "hits-different",
    definitions: [
      {
        text: "When something feels better or more impactful than usual.",
        example: "That song at 2am just hits different.",
        author: "MoodMaster",
        upvotes: 5432,
        downvotes: 234,
        createdAt: new Date("2024-10-05"),
      },
    ],
    createdAt: new Date("2024-10-05"),
    viewCount: 19876,
  },
];

// TEST DATA API
export const getWords = async (): Promise<Word[]> => {
  return Promise.resolve([...TEST_WORDS]);
};

export const getWordBySlug = async (slug: string): Promise<Word | null> => {
  const word = TEST_WORDS.find(w => w.slug === slug);
  return Promise.resolve(word || null);
};

export const getWordsByLetter = async (letter: string): Promise<Word[]> => {
  const upperLetter = letter.toUpperCase();
  const words = TEST_WORDS.filter(w =>
    w.term.toUpperCase().startsWith(upperLetter)
  );
  return Promise.resolve(words);
};

export const searchWords = async (searchTerm: string): Promise<Word[]> => {
  const results = TEST_WORDS.filter(word =>
    word.term.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return Promise.resolve(results);
};

export const getRandomWords = async (count: number = 5): Promise<Word[]> => {
  const shuffled = [...TEST_WORDS].sort(() => Math.random() - 0.5);
  return Promise.resolve(shuffled.slice(0, count));
};
