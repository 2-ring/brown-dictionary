import { useEffect, useState } from 'react';
import type { Word } from '../database/db';
import { getWords } from '../database/db';
import { WordFeed } from '../components/feed/word-feed';
import { Spinner } from '../components/common/spinner';

export const Home = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWords = async () => {
      const data = await getWords();
      setWords(data);
      setLoading(false);
    };

    fetchWords();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <WordFeed words={words} showRandomButton={true} />
    </div>
  );
};
