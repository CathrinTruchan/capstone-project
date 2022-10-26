export default function LevelFilter({ setFilterQuery }) {
  function handleLevelFilter(event) {
    setFilterQuery(event.target.value);
  }

  return (
    <>
      <input
        type="radio"
        id="all"
        name="levelfilter"
        value="pro"
        onChange={handleLevelFilter}
        checked
        aria-label="filter for all asanas"
      />
      <label for="all">all</label>
      <input
        type="radio"
        id="beginner"
        name="levelfilter"
        value="beginner"
        onChange={handleLevelFilter}
        aria-label="filter for beginner asanas"
      />
      <label for="beginner">beginner</label>
      <input
        type="radio"
        id="intermediate"
        name="levelfilter"
        value="intermediate"
        onChange={handleLevelFilter}
        aria-label="filter for intermediate asanas"
      />
      <label for="intermediate">intermediate</label>
      <input
        type="radio"
        id="advanced"
        name="levelfilter"
        value="pro"
        onChange={handleLevelFilter}
        aria-label="filter for advanced asanas"
      />
      <label for="advanced">advanced</label>
    </>
  );
}
