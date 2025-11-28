const SearchBar = ({ searchText, setSearchText, setCurrentPage }) => (
  <div className="filter-input">
    <input
      type="text"
      className="input-search"
      placeholder="Buscar producto"
      value={searchText}
      onChange={(e) => {
        setSearchText(e.target.value);
        setCurrentPage(1);
      }}
    />
  </div>
);

export default SearchBar;
