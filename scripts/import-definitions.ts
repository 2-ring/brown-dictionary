import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface ImportDefinition {
  word: string;
  definition: string;
  example: string;
}

const createSlug = (term: string): string => {
  return term
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

const getRandomAuthor = (): string => {
  const authors = [
    'bear_necessities',
    'bruno_the_bear',
    'college_hill_kid',
    'ratty_regular',
    'scili_survivor',
    'pembroke_pro',
    'thayer_street_legend',
    'open_curriculum_fan',
    'snc_enthusiast',
    'spring_weekend_warrior'
  ];
  return authors[Math.floor(Math.random() * authors.length)];
};

const getRandomVotes = (): { upvotes: number; downvotes: number } => {
  const upvotes = Math.floor(Math.random() * 500) + 50;
  const downvotes = Math.floor(Math.random() * 50);
  return { upvotes, downvotes };
};

const importDefinitions = async () => {
  try {
    const jsonPath = path.join(__dirname, '../starting-defenitions.json');
    const jsonData = fs.readFileSync(jsonPath, 'utf-8');
    const definitions: ImportDefinition[] = JSON.parse(jsonData);

    console.log(`Found ${definitions.length} definitions to import`);

    const wordsRef = collection(db, 'words');

    for (let i = 0; i < definitions.length; i++) {
      const def = definitions[i];
      const votes = getRandomVotes();

      const wordData = {
        term: def.word,
        slug: createSlug(def.word),
        definitions: [
          {
            text: def.definition,
            example: def.example,
            author: getRandomAuthor(),
            upvotes: votes.upvotes,
            downvotes: votes.downvotes,
            createdAt: Timestamp.fromDate(new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)))
          }
        ],
        createdAt: Timestamp.fromDate(new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000))),
        viewCount: Math.floor(Math.random() * 10000) + 100
      };

      await addDoc(wordsRef, wordData);
      console.log(`Imported ${i + 1}/${definitions.length}: ${def.word}`);
    }

    console.log('✅ All definitions imported successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error importing definitions:', error);
    process.exit(1);
  }
};

importDefinitions();
