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
  title?: string;
  subtitle?: string;
  headerStyle?: 'main' | 'secondary';
}

export const WordFeed = ({
  words,
  itemsPerPage = 10,
  onRandomClick,
  isLoadingRandom = false,
  showTopPadding = true,
  showAllDefinitions = false,
  title,
  subtitle,
  headerStyle = 'main'
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

  const titleClassName = headerStyle === 'secondary'
    ? "text-2xl font-bold text-text mb-2"
    : "text-4xl font-bold text-text mb-2 font-serif";
  const subtitleClassName = "text-text-muted";

  return (
    <div>
      {(title || subtitle) && (
        <div className="max-w-3xl mx-auto pt-12 pb-6">
          {title && (
            <h1 className={titleClassName}>{title}</h1>
          )}
          {subtitle && (
            <p className={subtitleClassName}>{subtitle}</p>
          )}
        </div>
      )}

      <div className={`space-y-6 ${showTopPadding && !title && !subtitle ? 'pt-12' : ''}`}>
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

      <div className="max-w-3xl mx-auto mt-8">
        <MoreRandomButton
          onClick={onRandomClick}
          isLoading={isLoadingRandom}
        />
      </div>
    </div>
  );
};
