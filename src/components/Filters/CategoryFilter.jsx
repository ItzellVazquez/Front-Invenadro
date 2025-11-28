const CategoryFilter = ({ categories, categoryFilter, setCategoryFilter, setCurrentPage }) => (
  <select
    className="filter-select"
    value={categoryFilter}
    onChange={(e) => {
      setCategoryFilter(e.target.value);
      setCurrentPage(1);
    }}
  >
    <option value="">Categoría</option>
    {categories.map((cat, i) => (
      <option key={i} value={cat}>
        {cat}
      </option>
    ))}
  </select>
);

export default CategoryFilter;
