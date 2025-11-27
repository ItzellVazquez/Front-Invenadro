import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SearchBar = ({ searchText, setSearchText, setCurrentPage }) => (
  <Row>
    <Col xs="12" md="6" lg="4" className="text-start">
      <input
        className="input-search mb-3"
        type="text"
        placeholder="Buscar..."
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          setCurrentPage(1);
        }}
      />
    </Col>
  </Row>
);

export default SearchBar;
