import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  onItemsPerPageChange,
  onCustomLimitSubmit,
}) => {
  const [customLimit, setCustomLimit] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Generate page numbers to display
  const getPageNumbers = () => {
    if (totalPages <= 1) return [1];

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handleCustomLimitChange = (e) => {
    setCustomLimit(e.target.value);
  };

  const handleItemsPerPageChange = (e) => {
    const value = e.target.value;
    if (value === "custom") {
      setShowCustomInput(true);
    } else {
      setShowCustomInput(false);
      onItemsPerPageChange(Number(value));
    }
  };

  const handleCustomLimitSubmit = (e) => {
    e.preventDefault();
    const limit = parseInt(customLimit);
    if (limit > 0) {
      onItemsPerPageChange(limit);
      setCustomLimit("");
      setShowCustomInput(false);
    }
  };

  // Calculate the range of items being displayed
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="pagination-controls">
      <div className="pagination-info">
        {totalItems > 0
          ? `Showing ${startItem}-${endItem} of ${totalItems} customers`
          : "No customers to display"}
      </div>

      {totalPages > 1 && (
        <div className="page-selector">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="page-btn"
          >
            <FaChevronLeft />
          </button>

          {getPageNumbers().map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`page-num ${currentPage === pageNum ? "active" : ""}`}
            >
              {pageNum}
            </button>
          ))}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="page-btn"
          >
            <FaChevronRight />
          </button>
        </div>
      )}

      <div className="items-per-page">
        <label>Items per page:</label>
        <select
          value={
            [5, 10, 25, 50, 100].includes(itemsPerPage)
              ? itemsPerPage
              : "custom"
          }
          onChange={handleItemsPerPageChange}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="custom">Custom</option>
        </select>
        {showCustomInput && (
          <form
            onSubmit={handleCustomLimitSubmit}
            className="custom-limit-form"
          >
            <div className="custom-limit-wrapper">
              <input
                type="number"
                value={customLimit}
                onChange={handleCustomLimitChange}
                placeholder="Enter limit"
                min="1"
                className="custom-limit-input"
                autoFocus
              />
              <button type="submit" className="custom-limit-btn">
                Set
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Pagination;
