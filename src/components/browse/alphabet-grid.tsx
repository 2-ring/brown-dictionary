import { Link } from 'react-router-dom';

export const AlphabetGrid = () => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('');

  return (
    <div className="grid grid-cols-7 gap-2">
      {alphabet.map((letter) => (
        <Link
          key={letter}
          to={`/browse/${letter}`}
          className="aspect-square md:aspect-[3/4] bg-[#373E49] hover:bg-[#434B57] border-0 rounded-lg flex items-center justify-center text-2xl font-bold text-white transition-colors"
        >
          {letter}
        </Link>
      ))}
    </div>
  );
};
