import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Pagination = ({
  currentPage,
  totalPages,
  goToPreviousPage,
  goToNextPage,
  setCurrentPage
}) => (
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

        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`btn ${
              currentPage === i + 1
                ? "btn-pagination-active"
                : "btn-pagination-inactive"
            }`}
          >
            {i + 1}
          </button>
        ))}

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

export default Pagination;
