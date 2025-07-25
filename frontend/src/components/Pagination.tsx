import React, { useEffect, useState } from "react";

interface PaginationProps {
  page: number;
  pageSize: number;
  totalItems: number;
  setPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalItems, pageSize, setPage }) => {
    const [pages, setPages] = useState<number[]>([]);
    const totalPages = Math.ceil(totalItems / pageSize);

    useEffect(() => {
        setPages(Array.from({ length: totalPages }, (_, index) => index + 1));
    }, [totalItems, pageSize]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };
  return (
    <div>
      <div className="join ">
        {pages.map((p) => (
            <button key={p} className={`join-item btn  ${page === p ? 'btn-active btn-primary scale-110' : ''}`} onClick={() => handlePageChange(p)}>{p}</button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
