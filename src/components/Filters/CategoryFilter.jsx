const CategoryFilter = ({ categories, categoryFilter, setCategoryFilter }) => (
  <select
    className="filter-select"
    value={categoryFilter}
    onChange={(e) => setCategoryFilter(e.target.value)}
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
