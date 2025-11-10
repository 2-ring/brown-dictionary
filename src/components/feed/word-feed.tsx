import type { Word } from '../../database/db';
import { WordCard } from '../word/word-card';

interface WordFeedProps {
  words: Word[];
}

export const WordFeed = ({ words }: WordFeedProps) => {
  return (
    <div className="space-y-6 pt-12">
      {words.map((word) => (
        <WordCard key={word.slug} word={word} />
      ))}
    </div>
  );
};
