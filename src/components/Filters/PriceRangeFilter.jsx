const PriceRangeFilter = ({ priceRange, setPriceRange, setCurrentPage }) => (
  <div className="filter-range">
    <input
      type="number"
      placeholder="Desde"
      value={priceRange.min}
      onChange={(e) => {
        setPriceRange((prev) => ({ ...prev, min: Number(e.target.value) }));
        setCurrentPage(1);
      }}
    />

    <span className="separator">-</span>

    <input
      type="number"
      placeholder="Hasta"
      value={priceRange.max}
      onChange={(e) => {
        setPriceRange((prev) => ({ ...prev, max: Number(e.target.value) }));
        setCurrentPage(1);
      }}
    />
  </div>
);

export default PriceRangeFilter;
