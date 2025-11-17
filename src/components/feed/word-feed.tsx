import { useState } from 'react';
import type { Word } from '../../database/db';
import { WordCard } from '../word/word-card';
import { Button } from '../common/button';

interface WordFeedProps {
  words: Word[];
  itemsPerPage?: number;
  showRandomButton?: boolean;
}

export const WordFeed = ({ words, itemsPerPage = 10, showRandomButton = false }: WordFeedProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(words.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentWords = words.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

      if (endPage - startPage < maxPagesToShow - 1) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  if (words.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="space-y-6 pt-12">
        {currentWords.map((word) => (
          <WordCard key={word.slug} word={word} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex flex-col items-center gap-6 mt-12">
          <div className="flex items-center gap-2">
            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`
                  w-10 h-10 rounded-full font-medium transition-colors
                  ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-gray-200'
                  }
                `}
              >
                {page}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-gray-400">
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-full transition-all hover:bg-blue-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-400"
            >
              Next ›
            </button>
            <button
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-full transition-all hover:bg-blue-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-400"
            >
              Last »
            </button>
          </div>
        </div>
      )}

      {showRandomButton && (
        <div className="flex justify-center mt-8">
          <Button variant="outline">More random definitions</Button>
        </div>
      )}
    </div>
  );
};
