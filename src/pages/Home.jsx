import { useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { searchMovies } from "../api";

function Home() {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(text) {
    setLoading(true);
    setError("");

    try {
      const results = await searchMovies(text, category);
      setMovies(results);
    } catch (err) {
      setMovies([]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleCategoryChange(value) {
    setCategory(value);
  }

  return (
    <>
      <Navbar />

      <main className="container">
        <section className="hero">
          <h1>Find Your Favorite Movies</h1>
          <p>Search movies and view their ratings, details and information.</p>

          <SearchBar onSearch={handleSearch} />
          <Filter value={category} onChange={handleCategoryChange} />
        </section>

        {loading && <Loading />}
        {!loading && error && <ErrorMessage message={error} />}

        {!loading && !error && movies.length > 0 && (
          <>
            <h2 className="section-title">Search Results</h2>
            <MovieList movies={movies} />
          </>
        )}

        {!loading && !error && movies.length === 0 && (
          <div className="empty-message">
            Search for a movie to see results.
          </div>
        )}
      </main>
    </>
  );
}

export default Home;