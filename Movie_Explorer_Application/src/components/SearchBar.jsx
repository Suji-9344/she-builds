import { useState } from "react";

function SearchBar({ onSearch }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const value = text.trim();
    if (value) {
      onSearch(value);
    }
  }

  return (
    <form className="search-box" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;