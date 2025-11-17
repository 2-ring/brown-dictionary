import { useState } from 'react';
import type { Word } from '../../database/db';
import { WordCard } from '../word/word-card';
import { Button } from '../common/button';
import { Pagination } from '../common/pagination';

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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
      />

      {showRandomButton && (
        <div className="flex justify-center mt-8">
          <Button variant="outline">More random definitions</Button>
        </div>
      )}
    </div>
  );
};
