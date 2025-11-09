import { Link } from 'react-router-dom';

export const AlphabetGrid = () => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('');

  return (
    <div className="grid grid-cols-9 gap-3">
      {alphabet.map((letter) => (
        <Link
          key={letter}
          to={`/browse/${letter}`}
          className="aspect-square bg-ud-navy-light hover:bg-ud-navy border border-ud-border rounded flex items-center justify-center text-2xl font-bold text-ud-text transition-colors"
        >
          {letter}
        </Link>
      ))}
    </div>
  );
};
