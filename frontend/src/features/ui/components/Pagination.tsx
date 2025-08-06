import React from "react";

interface PaginationProps {
  page: number;
  pageSize: number;
  totalItems: number;
  setPage: (page: number) => void;
  neighbors?: number; // how many pages to show around current
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  pageSize,
  totalItems,
  setPage,
  neighbors = 1,
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  if (totalPages <= 1) return null; // No pagination if only one page or no items

  const createPageList = () => {
    const pages: (number | "ellipsis")[] = [];
    const startPage = Math.max(2, page - neighbors);
    const endPage = Math.min(totalPages - 1, page + neighbors);

    pages.push(1);
    if (startPage > 2) pages.push("ellipsis");

    for (let p = startPage; p <= endPage; p++) {
      pages.push(p);
    }

    if (endPage < totalPages - 1) pages.push("ellipsis");
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const pageList = createPageList();

  return (
    <div className="join mx-auto">
      {/* Previous button */}
      <button
        className="join-item btn"
        disabled={page <= 1}
        onClick={() => setPage(page - 1)}
      >
        ‹
      </button>

      {/* Page numbers with ellipsis */}
      {pageList.map((item, index) =>
        item === "ellipsis" ? (
          <span key={`e-${index}`} className="join-item btn disabled">
            …
          </span>
        ) : (
          <button
            key={item}
            className={`join-item btn ${item === page ? "btn-active btn-primary scale-110" : ""}`}
            onClick={() => setPage(item)}
          >
            {item}
          </button>
        )
      )}

      {/* Next button */}
      <button
        className="join-item btn"
        disabled={page >= totalPages}
        onClick={() => setPage(page + 1)}
      >
        ›
      </button>
    </div>
  );
};

export default Pagination;
