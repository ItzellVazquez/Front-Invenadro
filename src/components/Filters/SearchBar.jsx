const SearchBar = ({ searchText, setSearchText, setCurrentPage }) => (
  <div className="search-wrapper" style={{ width: "100%" }}>
    <input
      type="text"
      className="filter-input"
      placeholder="Buscar producto"
      value={searchText}
      onChange={(e) => {
        setSearchText(e.target.value);
        setCurrentPage(1);
      }}
      style={{ width: "100%" }} 
    />
  </div>
);

export default SearchBar;
