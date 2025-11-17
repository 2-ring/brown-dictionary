import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserDefinitionsByUsername } from '../database/db';
import type { Word } from '../database/db';
import { WordFeed } from '../components/feed/word-feed';
import { Spinner } from '../components/common/spinner';

export default function Profile() {
  const { username } = useParams<{ username: string }>();
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUserDefinitions = async () => {
      if (!username) return;

      try {
        setLoading(true);
        setError(null);
        const userDefinitions = await getUserDefinitionsByUsername(username);
        setWords(userDefinitions);
      } catch (error) {
        console.error('Error loading user definitions:', error);
        setError('Failed to load user definitions');
      } finally {
        setLoading(false);
      }
    };

    loadUserDefinitions();
  }, [username]);

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
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold text-text mb-2 font-serif">{username}</h1>
      <p className="text-text-muted mb-8">
        {words.length} {words.length === 1 ? 'word' : 'words'}
      </p>

      {words.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-text-muted text-lg">No definitions found for this user.</p>
        </div>
      ) : (
        <WordFeed words={words} />
      )}
    </div>
  );
}
