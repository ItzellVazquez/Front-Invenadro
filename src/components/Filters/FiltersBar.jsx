import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";     
import PriceRangeFilter from "./PriceRangeFilter";

const FiltersBar = ({
  searchText,
  setSearchText,
  categories,
  categoryFilter,
  setCategoryFilter,
  // priceFilter,
  // setPriceFilter,
  priceRange,
  setPriceRange,
  setCurrentPage
}) => (
  <Row className="filters-row mb-3 justify-content-start">

    {/* BUSCAR */}
    <Col xs={12} md="auto">
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        setCurrentPage={setCurrentPage}
      />
    </Col>

    {/* CATEGORÍA */}
    <Col xs={12} md="auto">
      <CategoryFilter
        categories={categories}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        setCurrentPage={setCurrentPage}
      />
    </Col>

    {/* PRECIO (SELECT) */}
    {/* <Col xs={12} md="auto">
      <PriceFilter
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
        setCurrentPage={setCurrentPage}
      />
    </Col> */}

    {/* RANGO DE PRECIOS */}
    <Col xs={12} md="auto">
      <PriceRangeFilter
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        setCurrentPage={setCurrentPage}
      />
    </Col>

  </Row>
);

export default FiltersBar;
