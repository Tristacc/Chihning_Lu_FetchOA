import React from "react";

const Pagination = ({ numberOfPages, currentPage, onPageChange }) => {
  const handlePrevious = () => {
    onPageChange((page) => page - 1);
  };

  const handleNext = () => {
    onPageChange((page) => page + 1);
  };

  return (
    <div className="pagination-container">
      <button onClick={handlePrevious} disabled={currentPage === 1}>
        Previous
      </button>
      <span>
        Page {currentPage} of {numberOfPages}
      </span>
      <button onClick={handleNext} disabled={currentPage === numberOfPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
