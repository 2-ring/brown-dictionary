import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Word, getWordsByLetter } from '../database/db';
import { AlphabetGrid } from '../components/browse/alphabet-grid';
import { WordList } from '../components/browse/word-list';
import { Button } from '../components/common/button';

export const Browse = () => {
  const { letter } = useParams<{ letter: string }>();
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (letter) {
      const fetchWords = async () => {
        setLoading(true);
        const data = await getWordsByLetter(letter);
        setWords(data);
        setLoading(false);
      };

      fetchWords();
    }
  }, [letter]);

  if (!letter) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/" className="text-ud-blue-light hover:underline mb-4 inline-block">
            ← Home
          </Link>
        </div>

        <AlphabetGrid />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link to="/browse" className="text-ud-blue-light hover:underline mb-4 inline-block">
          ← Back to browse
        </Link>

        <h1 className="text-4xl font-bold text-ud-blue-light mt-4 mb-6">
          Words in {letter.toUpperCase()}
        </h1>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-ud-text-muted">Loading...</div>
        </div>
      ) : words.length > 0 ? (
        <>
          <WordList words={words} />

          <div className="mt-12 flex justify-center gap-4">
            <Button variant="outline">1</Button>
            <Button variant="outline">2</Button>
            <Button variant="outline">3</Button>
            <Button variant="outline">4</Button>
            <Button variant="outline">5</Button>
            <span className="self-center text-ud-text-muted mx-2">...</span>
            <Button variant="outline">Next »</Button>
            <Button variant="outline">Last »</Button>
          </div>
        </>
      ) : (
        <div className="text-center text-ud-text-muted py-12">
          No words found starting with {letter.toUpperCase()}
        </div>
      )}
    </div>
  );
};
