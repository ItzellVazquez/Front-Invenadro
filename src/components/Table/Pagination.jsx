import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Pagination = ({
  currentPage,
  totalPages,
  goToPreviousPage,
  goToNextPage,
  setCurrentPage
}) => {
  const getPageNumbers = () => {
    const pages = [];

    if (currentPage > 3) {
      pages.push(1);
      if (currentPage > 4) pages.push("...");
    }

    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      if (i > 0 && i <= totalPages) {
        pages.push(i);
      }
    }

    if (currentPage < totalPages - 2) {
      if (currentPage < totalPages - 3) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const pagesToShow = getPageNumbers();

  return (
    <Row className="justify-content-center mt-3">
      <Col xs="12" className="text-center">
        <div className="d-flex justify-content-center gap-2">

          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="btn btn-arrow"
          >
            ⟵ Anterior
          </button>

          {pagesToShow.map((page, index) =>
            page === "..." ? (
              <button
                key={`ellipsis-${index}`}
                disabled
                className="btn btn-pagination-inactive"
                style={{ cursor: "default" }}
              >
                ...
              </button>
            ) : (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`btn ${
                  currentPage === page
                    ? "btn-pagination-active"
                    : "btn-pagination-inactive"
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="btn btn-arrow"
          >
            Siguiente ⟶
          </button>

        </div>
      </Col>
    </Row>
  );
};

export default Pagination;
