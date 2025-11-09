import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Word, searchWords } from '../database/db';
import { WordFeed } from '../components/feed/word-feed';

export const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-ud-text-muted">Searching...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-ud-text mb-2">
          Search results for "{query}"
        </h1>
        <p className="text-ud-text-muted">
          {words.length} {words.length === 1 ? 'result' : 'results'} found
        </p>
      </div>

      {words.length > 0 ? (
        <WordFeed words={words} />
      ) : (
        <div className="text-center py-12">
          <p className="text-ud-text-muted text-lg mb-4">
            No results found for "{query}"
          </p>
          <p className="text-ud-text-muted">
            Try searching for a different term
          </p>
        </div>
      )}
    </div>
  );
};
