const PriceRangeFilter = ({ priceRange, setPriceRange }) => (
  <div className="filter-range">
    <input
      type="number"
      placeholder="Desde"
      value={priceRange.min}
      onChange={(e) =>
        setPriceRange((prev) => ({ ...prev, min: Number(e.target.value) }))
      }
    />

    <span className="separator">-</span>

    <input
      type="number"
      placeholder="Hasta"
      value={priceRange.max}
      onChange={(e) =>
        setPriceRange((prev) => ({ ...prev, max: Number(e.target.value) }))
      }
    />
  </div>
);

export default PriceRangeFilter;
