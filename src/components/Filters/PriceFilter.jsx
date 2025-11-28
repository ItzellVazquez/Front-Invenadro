const PriceFilter = ({ priceFilter, setPriceFilter, setCurrentPage }) => (
  <select
    className="filter-select"
    value={priceFilter}
    onChange={(e) => {
      setPriceFilter(e.target.value);
      setCurrentPage(1);
    }}
  >
    <option value="">Precio</option>
    <option value="1">1 - 99</option>
    <option value="2">100 - 199</option>
    <option value="3">200 - 299</option>
    <option value="4">300 - 399</option>
    <option value="5">400 - 499</option>
  </select>
);

export default PriceFilter;
