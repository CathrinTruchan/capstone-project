export default function SearchBar({ setSearchQuery }) {
  function handleSearch(event) {
    event.preventDefault();
    setSearchQuery(event.target.value);
  }
  return (
    <form>
      <input type="text" id="search" name="searchbar" onChange={handleSearch} />
    </form>
  );
}
