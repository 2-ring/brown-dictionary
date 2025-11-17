import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Word } from '../database/db';
import { searchWords, getRandomWords } from '../database/db';
import { WordFeed } from '../components/feed/word-feed';
import { Spinner } from '../components/common/spinner';

export const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      const results = await searchWords(query);
      setWords(results);
      setLoading(false);
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

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

  return (
    <div className="px-6 py-8">
      {words.length > 0 ? (
        <WordFeed
          words={words}
          onRandomClick={handleLoadMore}
          isLoadingRandom={loadingMore}
          title={`Search results for "${query}"`}
          subtitle={`${words.length} ${words.length === 1 ? 'result' : 'results'} found`}
          headerStyle="secondary"
        />
      ) : (
        <div className="text-center py-12">
          <p className="text-text-muted text-lg mb-4">
            No results found for "{query}"
          </p>
          <p className="text-text-muted">
            Try searching for a different term
          </p>
        </div>
      )}
    </div>
  );
};
