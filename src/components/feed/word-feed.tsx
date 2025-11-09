import { Word } from '../../database/db';
import { WordCard } from '../word/word-card';

interface WordFeedProps {
  words: Word[];
}

export const WordFeed = ({ words }: WordFeedProps) => {
  return (
    <div className="space-y-6">
      {words.map((word) => (
        <WordCard key={word.slug} word={word} />
      ))}
    </div>
  );
};
