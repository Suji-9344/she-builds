function Filter({ value, onChange }) {
  return (
    <div className="filter-box">
      <label htmlFor="category">Category:</label>
      <select
        id="category"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All</option>
        <option value="movie">Movies</option>
        <option value="series">Series</option>
        <option value="episode">Episodes</option>
      </select>
    </div>
  );
}

export default Filter;