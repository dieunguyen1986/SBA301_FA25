// src/components/common/PaginationControl.jsx
import { Pagination } from "react-bootstrap";

export const PaginationControl = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null; // không render nếu chỉ có 1 trang

  // Spread operator to create an array of page numbers
  const pages = [...Array(totalPages).keys()]; // [0, 1, 2, ..., totalPages-1]

  return (
    <Pagination className="justify-content-center my-3">
      <Pagination.Prev
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
      />

      {pages.map((p, index) => (
        typeof p === "string" ? (
          <Pagination.Ellipsis key={index} disabled />
        ) : (
        <Pagination.Item
          key={p}
          active={p === currentPage}
          onClick={() => onPageChange(p)}>
          {p + 1}
        </Pagination.Item>
      )))}

      <Pagination.Next
        disabled={currentPage === totalPages - 1}
        onClick={() => onPageChange(currentPage + 1)}
      />
    </Pagination>
  );
};
