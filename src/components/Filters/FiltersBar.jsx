import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import PriceRangeFilter from "./PriceRangeFilter";
import PriceFilter from "./PriceFilter";

const FiltersBar = ({
  searchText,
  setSearchText,
  categories,
  categoryFilter,
  setCategoryFilter,
  priceRange,
  setPriceRange,
  setCurrentPage
}) => (
  <Row className="filters-row mb-3" style={{ alignItems: "center" }}>

    {/* BUSCAR PRODUCTO */}
    <Col xs={12} md={4}>
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        setCurrentPage={setCurrentPage}
      />
    </Col>

    {/* CATEGORÍA */}
    <Col xs={12} md={4}>
      <CategoryFilter
        categories={categories}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        setCurrentPage={setCurrentPage}
      />
    </Col>

    {/* 
    <Col xs={12} md={4}>
      <PriceFilter
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
        setCurrentPage={setCurrentPage}
      />
    </Col>
    */}

    {/* RANGO DE PRECIOS */}
    <Col xs={12} md={4}>
      <PriceRangeFilter
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        setCurrentPage={setCurrentPage}
      />
    </Col>

  </Row>
);

export default FiltersBar;
