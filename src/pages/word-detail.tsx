import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Word } from '../database/db';
import { getWordBySlug } from '../database/db';
import { WordCard } from '../components/word/word-card';
import { Button } from '../components/common/button';

export const WordDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [word, setWord] = useState<Word | null>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-text-muted">Loading...</div>
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
      <div className="mb-8">
        <WordCard word={word} showAllDefinitions={true} />
      </div>

      <div className="flex justify-center">
        <Button variant="outline">More random definitions</Button>
      </div>
    </div>
  );
};
