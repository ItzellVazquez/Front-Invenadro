import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import SearchFilter from "./SearchFilter";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import PriceRangeFilter from "./PriceRangeFilter";

const FiltersBar = ({
  searchText,
  setSearchText,
  categories,
  categoryFilter,
  setCategoryFilter,
  priceFilter,
  setPriceFilter,
  priceRange,
  setPriceRange,
}) => (
  <Row className="filters-row mb-3">

    <Col xs={12} md={4}>
      <SearchFilter searchText={searchText} setSearchText={setSearchText} />
    </Col>

    <Col xs={12} md={3}>
      <CategoryFilter
        categories={categories}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
      />
    </Col>

    <Col xs={12} md={2}>
      <PriceFilter priceFilter={priceFilter} setPriceFilter={setPriceFilter} />
    </Col>

    <Col xs={12} md={3}>
      <PriceRangeFilter
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />
    </Col>

  </Row>
);

export default FiltersBar;
