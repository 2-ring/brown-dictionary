import { useEffect, useState } from 'react';
import { Word, getWords } from '../database/db';
import { WordFeed } from '../components/feed/word-feed';
import { Button } from '../components/common/button';
import { Banner } from '../components/layout/banner';

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
        <div className="text-ud-text-muted">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Banner />
      </div>

      <div className="mb-8">
        <WordFeed words={words} />
      </div>

      <div className="flex justify-center">
        <Button variant="outline">More random definitions</Button>
      </div>
    </div>
  );
};
