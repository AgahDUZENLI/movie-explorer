import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, ButtonGroup } from "reactstrap";

const Pagination = () => {
  const { totalResults, currentPage } = useSelector((state) => state.movies);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get("query") || "";
  const totalPages = Math.ceil(totalResults / 10);

  const handlePageClick = (page) => {
    if (query) {
      navigate(`/explore?query=${encodeURIComponent(query)}&page=${page}`);
    } else {
      navigate(`/explore?page=${page}`);
    }
  };

  const maxButtons = 10;
  const startPage = Math.max(currentPage - 5, 1);
  const endPage = Math.min(startPage + maxButtons - 1, totalPages);

  return (
    <div className="d-flex justify-content-center my-4">
      <ButtonGroup>
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
          const page = startPage + i;
          return (
            <Button
              key={page}
              color={page === currentPage ? "dark" : "secondary"}
              outline={page !== currentPage}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </Button>
          );
        })}
      </ButtonGroup>
    </div>
  );
};

export default Pagination;