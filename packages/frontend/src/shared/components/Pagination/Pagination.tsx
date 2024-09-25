import React from 'react';
import Button from '~/shared/components/Button/Button';

interface PaginationProps {
  total: number;
  limit: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ total, limit, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(total / limit);

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div className="pagination-container">
      <Button onClick={handlePrevious} disabled={currentPage === 1} variant="primary" size="small">
        Previous
      </Button>
      <span>{currentPage} / {totalPages}</span>
      <Button onClick={handleNext} disabled={currentPage === totalPages} variant="primary" size="small">
        Next
      </Button>
    </div>
  );
};

export default Pagination;
