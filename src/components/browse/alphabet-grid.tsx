import { Link } from 'react-router-dom';

interface AlphabetGridProps {
  onLetterClick?: () => void;
}

export const AlphabetGrid = ({ onLetterClick }: AlphabetGridProps = {}) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('');

  return (
    <div className="grid grid-cols-9 md:grid-cols-9 gap-1">
      {alphabet.map((letter) => (
        <Link
          key={letter}
          to={`/browse/${letter}`}
          onClick={onLetterClick}
          className="aspect-[1/1.3] md:aspect-[1/2] bg-[#373E49] hover:bg-[#434B57] border-0 rounded-md flex items-center justify-center text-xl md:text-xl font-bold text-white transition-colors"
        >
          {letter}
        </Link>
      ))}
    </div>
  );
};
