import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Word } from '../database/db';
import { getWordsByLetter } from '../database/db';
import { AlphabetGrid } from '../components/browse/alphabet-grid';
import { WordList } from '../components/browse/word-list';
import { Pagination } from '../components/common/pagination';
import { Spinner } from '../components/common/spinner';

export const Browse = () => {
  const { letter } = useParams<{ letter: string }>();
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;

  useEffect(() => {
    if (letter) {
      const fetchWords = async () => {
        setLoading(true);
        const data = await getWordsByLetter(letter);
        setWords(data);
        setLoading(false);
        setCurrentPage(1);
      };

      fetchWords();
    }
  }, [letter]);

  const totalPages = Math.ceil(words.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentWords = words.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!letter) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/" className="text-primary hover:underline mb-4 inline-block">
            ← Home
          </Link>
        </div>

        <AlphabetGrid />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="bg-card rounded-xl overflow-hidden">
        <div className="px-8 py-6">
          <h1 className="text-4xl font-bold text-highlight mb-6 font-serif">
            Words in {letter.toUpperCase()}
          </h1>

          {loading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <Spinner />
            </div>
          ) : words.length > 0 ? (
            <WordList words={currentWords} />
          ) : (
            <div className="text-center text-text-muted py-12">
              No words found starting with {letter.toUpperCase()}
            </div>
          )}
        </div>
      </div>

      {!loading && words.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />
      )}
    </div>
  );
};
