import { useState, useEffect } from 'react';
import type { Word } from '../../database/db';
import { WordCard } from '../word/word-card';
import { Pagination } from '../common/pagination';
import { MoreRandomButton } from '../common/more-random-button';

interface WordFeedProps {
  words: Word[];
  itemsPerPage?: number;
  onRandomClick?: () => void;
  isLoadingRandom?: boolean;
  showTopPadding?: boolean;
  showAllDefinitions?: boolean;
}

export const WordFeed = ({
  words,
  itemsPerPage = 10,
  onRandomClick,
  isLoadingRandom = false,
  showTopPadding = true,
  showAllDefinitions = false
}: WordFeedProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 when words change
  useEffect(() => {
    setCurrentPage(1);
  }, [words]);

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
      <div className={`space-y-6 ${showTopPadding ? 'pt-12' : ''}`}>
        {currentWords.map((word) => (
          <WordCard key={word.slug} word={word} showAllDefinitions={showAllDefinitions} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />
      )}

      <MoreRandomButton
        onClick={onRandomClick}
        isLoading={isLoadingRandom}
      />
    </div>
  );
};
