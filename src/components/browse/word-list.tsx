import { Link } from 'react-router-dom';
import type { Word } from '../../database/db';

interface WordListProps {
  words: Word[];
}

export const WordList = ({ words }: WordListProps) => {
  const columns = 3;
  const wordsPerColumn = Math.ceil(words.length / columns);

  const getColumn = (columnIndex: number) => {
    const start = columnIndex * wordsPerColumn;
    const end = start + wordsPerColumn;
    return words.slice(start, end);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[0, 1, 2].map((columnIndex) => (
        <div key={columnIndex} className="space-y-2">
          {getColumn(columnIndex).map((word) => (
            <Link
              key={word.slug}
              to={`/word/${word.slug}`}
              className="block text-ud-text hover:text-ud-blue-light transition-colors"
            >
              {word.term}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};
