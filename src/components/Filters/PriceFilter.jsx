const PriceFilter = ({ priceFilter, setPriceFilter }) => (
  <select
    className="filter-select"
    value={priceFilter}
    onChange={(e) => setPriceFilter(e.target.value)}
  >
    <option value="">Precio</option>
    <option value="1">$0–100</option>
    <option value="2">$100–200</option>
    <option value="3">$200–300</option>
    <option value="4">$300–400</option>
  </select>
);

export default PriceFilter;
