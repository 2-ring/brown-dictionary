import { useEffect, useState } from 'react';
import type { Word } from '../database/db';
import { getRandomWords } from '../database/db';
import { WordFeed } from '../components/feed/word-feed';
import { Spinner } from '../components/common/spinner';

export const Home = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchRandomWords = async () => {
    const data = await getRandomWords(10);
    setWords(data);
  };

  useEffect(() => {
    const loadInitialWords = async () => {
      await fetchRandomWords();
      setLoading(false);
    };

    loadInitialWords();
  }, []);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    await fetchRandomWords();
    setLoadingMore(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <WordFeed
        words={words}
        showRandomButton={true}
        onRandomClick={handleLoadMore}
        isLoadingRandom={loadingMore}
      />
    </div>
  );
};
