import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ setSearchQuery }) {
  function handleSearch(event) {
    event.preventDefault();
    setSearchQuery(event.target.value);
  }
  return (
    <form>
      <StyledInput
        type="text"
        id="search"
        name="searchbar"
        arialabel="searchbar"
        placeholder="search all asanas..."
        onChange={handleSearch}
      />
    </form>
  );
}

const StyledInput = styled.input`
  all: unset;
  width: 16rem;
  height: 1.3rem;
  border-radius: 22px;
  padding: 0.5rem 1rem;
  border: none;
  box-shadow: var(--drop-shadow-color);
  margin: ${(props) => props.margin};
  font-size: var(--font-small);
  transition: 0.3s ease-in-out;
  &:focus {
    border: 1px solid var(--primary-light);
  }
`;
