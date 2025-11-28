const PriceRangeFilter = ({ priceRange, setPriceRange, setCurrentPage }) => {
  const handleMinChange = (e) => {
    const value = e.target.value;

    // Solo números (o vacío)
    if (/^\d*$/.test(value)) {
      setPriceRange((prev) => ({ ...prev, min: value === "" ? 0 : Number(value) }));
      setCurrentPage(1);
    }
  };

  const handleMaxChange = (e) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      setPriceRange((prev) => ({ ...prev, max: value === "" ? 0 : Number(value) }));
      setCurrentPage(1);
    }
  };

  return (
    <div className="filter-range">
      <input
        className="input-search-range"
        type="text"
        placeholder="Desde $"
        value={priceRange.min === 0 ? "" : priceRange.min}
        onChange={handleMinChange}
      />

      <span className="separator">⟶</span>

      <input
        className="input-search-range"
        type="text"
        placeholder="Hasta $"
        value={priceRange.max === 0 ? "" : priceRange.max}
        onChange={handleMaxChange}
      />
    </div>
  );
};

export default PriceRangeFilter;
