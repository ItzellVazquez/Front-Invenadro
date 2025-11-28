const SearchFilter = ({ searchText, setSearchText }) => (
  <div className="filter-input">
    <input
      type="text"
      placeholder="Buscar producto"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
    />
    <span className="icon">🔍</span>
  </div>
);

export default SearchFilter;
