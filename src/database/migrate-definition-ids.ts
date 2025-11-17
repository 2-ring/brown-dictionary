/**
 * Migration script to add unique IDs to existing definitions
 * Run this once to migrate old data
 */

import { db } from './db';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

const generateDefinitionId = (): string => {
  return `def_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

export const migrateDefinitionIds = async (): Promise<void> => {
  console.log('[Migration] Starting definition ID migration...');

  const wordsRef = collection(db, 'words');
  const snapshot = await getDocs(wordsRef);

  let updatedCount = 0;
  let skippedCount = 0;

  for (const docSnapshot of snapshot.docs) {
    const wordData = docSnapshot.data();
    const definitions = wordData.definitions || [];

    let needsUpdate = false;
    const updatedDefinitions = definitions.map((def: any) => {
      if (!def.id) {
        needsUpdate = true;
        return {
          ...def,
          id: generateDefinitionId(),
          upvoteUserIds: def.upvoteUserIds || [],
          downvoteUserIds: def.downvoteUserIds || [],
          upvotes: def.upvoteUserIds?.length || def.upvotes || 0,
          downvotes: def.downvoteUserIds?.length || def.downvotes || 0
        };
      }
      return def;
    });

    if (needsUpdate) {
      const wordRef = doc(db, 'words', docSnapshot.id);
      await updateDoc(wordRef, { definitions: updatedDefinitions });
      updatedCount++;
      console.log(`[Migration] Updated word: ${wordData.term} (${docSnapshot.id})`);
    } else {
      skippedCount++;
    }
  }

  console.log(`[Migration] Complete! Updated: ${updatedCount}, Skipped: ${skippedCount}`);
};

export const resetAllVotes = async (): Promise<void> => {
  console.log('[Migration] Starting vote reset...');

  const wordsRef = collection(db, 'words');
  const snapshot = await getDocs(wordsRef);

  let updatedCount = 0;

  for (const docSnapshot of snapshot.docs) {
    const wordData = docSnapshot.data();
    const definitions = wordData.definitions || [];

    const updatedDefinitions = definitions.map((def: any) => ({
      ...def,
      id: def.id || generateDefinitionId(), // Ensure ID exists
      upvoteUserIds: [],
      downvoteUserIds: [],
      upvotes: 0,
      downvotes: 0
    }));

    const wordRef = doc(db, 'words', docSnapshot.id);
    await updateDoc(wordRef, { definitions: updatedDefinitions });
    updatedCount++;
    console.log(`[Migration] Reset votes for: ${wordData.term} (${docSnapshot.id})`);
  }

  console.log(`[Migration] Vote reset complete! Updated: ${updatedCount} words`);
};
