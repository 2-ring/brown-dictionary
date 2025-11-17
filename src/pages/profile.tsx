import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserDefinitionsByUsername, getRandomWords } from '../database/db';
import type { Word } from '../database/db';
import { WordFeed } from '../components/feed/word-feed';
import { Spinner } from '../components/common/spinner';

export default function Profile() {
  const { username } = useParams<{ username: string }>();
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadUserDefinitions = async () => {
    if (!username) return;

    try {
      setError(null);
      const userDefinitions = await getUserDefinitionsByUsername(username);
      setWords(userDefinitions);
    } catch (error) {
      console.error('Error loading user definitions:', error);
      setError('Failed to load user definitions');
    }
  };

  useEffect(() => {
    const initialLoad = async () => {
      setLoading(true);
      await loadUserDefinitions();
      setLoading(false);
    };

    initialLoad();
  }, [username]);

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
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-8">
      {words.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-text-muted text-lg">No definitions found for this user.</p>
        </div>
      ) : (
        <WordFeed
          words={words}
          showTopPadding={false}
          onRandomClick={handleLoadMore}
          isLoadingRandom={loadingMore}
          title={username}
          subtitle={`${words.length} ${words.length === 1 ? 'word' : 'words'}`}
        />
      )}
    </div>
  );
}
