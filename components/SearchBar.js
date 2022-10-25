import styled from "styled-components";

export default function SearchBar({ setSearchQuery }) {
  function handleSearch(event) {
    setSearchQuery(event.target.value);
  }

  function handleFocus(event) {
    setSearchQuery("");
    event.target.value = "";
  }

  return (
    <StyledInput
      type="text"
      id="search"
      name="searchbar"
      arialabel="searchbar"
      placeholder="search all asanas..."
      onChange={handleSearch}
      onBlur={handleFocus}
    />
  );
}

const StyledInput = styled.input`
  all: unset;
  display: block;
  color: var(--text-dark);
  width: 10rem;
  height: 1rem;
  border-radius: 22px;
  padding: 0.5rem 1rem;
  border: none;
  background-color: var(--background-neutral);
  margin: ${(props) => props.margin};
  box-shadow: var(--drop-shadow-gray);
  font-size: var(--font-small);
  &:focus {
    box-shadow: none;
    border: 1px solid var(--highlight);
    background-color: var(--background-primary);
  }
`;
