interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
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

  if (totalPages <= 1) return null;

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="flex flex-col items-center gap-6 mt-12">
      <div className="flex items-center gap-2">
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`
              w-10 h-10 rounded-full font-bold transition-colors
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
        {!isFirstPage && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="px-4 py-2 rounded-full font-bold transition-all hover:bg-blue-600 hover:text-white"
            >
              « First
            </button>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              className="px-4 py-2 rounded-full font-bold transition-all hover:bg-blue-600 hover:text-white"
            >
              ‹ Previous
            </button>
          </>
        )}

        {!isLastPage && (
          <>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              className="px-4 py-2 rounded-full font-bold transition-all hover:bg-blue-600 hover:text-white"
            >
              Next ›
            </button>
            <button
              onClick={() => onPageChange(totalPages)}
              className="px-4 py-2 rounded-full font-bold transition-all hover:bg-blue-600 hover:text-white"
            >
              Last »
            </button>
          </>
        )}
      </div>
    </div>
  );
};
