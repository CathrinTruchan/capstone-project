import styled from "styled-components";

export default function LevelFilter({ setFilterQuery }) {
  function handleLevelFilter(event) {
    setFilterQuery(event.target.value);
  }

  return (
    <StyledInputWrapper>
      <input
        type="radio"
        id="beginner"
        name="levelfilter"
        value="beginner"
        onChange={handleLevelFilter}
        aria-label="beginner"
        role="radio"
      />
      <label htmlFor="beginner">beginner</label>
      <input
        type="radio"
        id="intermediate"
        name="levelfilter"
        value="intermediate"
        onChange={handleLevelFilter}
        aria-label="intermediate"
        role="radio"
      />
      <label htmlFor="intermediate">intermediate</label>
      <input
        type="radio"
        id="advanced"
        name="levelfilter"
        value="pro"
        onChange={handleLevelFilter}
        aria-label="advanced"
        role="radio"
      />
      <label htmlFor="advanced">pro</label>
      <input
        type="radio"
        id="all"
        name="levelfilter"
        value="all"
        onChange={handleLevelFilter}
        aria-label="all"
        role="radio"
      />
      <label htmlFor="all">all</label>
    </StyledInputWrapper>
  );
}

const StyledInputWrapper = styled.section`
  margin: 0.5rem 0 1rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  font-size: var(--font-small);
`;
