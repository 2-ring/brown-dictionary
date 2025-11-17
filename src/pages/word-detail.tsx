import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Word } from '../database/db';
import { getWordBySlug, getRandomWords } from '../database/db';
import { WordFeed } from '../components/feed/word-feed';
import { Spinner } from '../components/common/spinner';

export const WordDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [word, setWord] = useState<Word | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const fetchWord = async () => {
      if (slug) {
        const data = await getWordBySlug(slug);
        setWord(data);
        setLoading(false);
      }
    };

    fetchWord();
  }, [slug]);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    const randomWords = await getRandomWords(10);
    setLoadingMore(false);
    if (randomWords.length > 0) {
      window.location.href = `/word/${randomWords[0].slug}`;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner />
      </div>
    );
  }

  if (!word) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-text mb-4">Word not found</h1>
          <p className="text-text-muted">
            The word you're looking for doesn't exist in our dictionary.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <WordFeed
        words={[word]}
        itemsPerPage={1}
        showRandomButton={true}
        onRandomClick={handleLoadMore}
        isLoadingRandom={loadingMore}
        showAllDefinitions={true}
      />
    </div>
  );
};
