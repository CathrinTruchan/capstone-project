export default function LevelFilter({ setFilterQuery }) {
  function handleLevelFilter(event) {
    setFilterQuery(event.target.value);
  }

  return (
    <>
      <input
        type="radio"
        name="levelfilter"
        value="pro"
        onChange={handleLevelFilter}
      />
      all
      <input
        type="radio"
        name="levelfilter"
        value="beginner"
        onChange={handleLevelFilter}
      />
      beginner
      <input
        type="radio"
        name="levelfilter"
        value="intermediate"
        onChange={handleLevelFilter}
      />
      intermediate
      <input
        type="radio"
        name="levelfilter"
        value="pro"
        onChange={handleLevelFilter}
      />
      advanced
    </>
  );
}
