import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { getMovieDetails } from "../api";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMovie() {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadMovie();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <Loading />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <ErrorMessage message={error} />
      </>
    );
  }

  const poster =
    movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/300x450?text=No+Poster";

  return (
    <>
      <Navbar />

      <main className="details-container">
        <Link to="/" className="back-link">← Back to Search</Link>

        <div className="details-card">
          <img src={poster} alt={movie.Title} />

          <div className="details-content">
            <h1>{movie.Title}</h1>
            <p className="rating">⭐ IMDb Rating: {movie.imdbRating}</p>

            <p><strong>Year:</strong> {movie.Year}</p>
            <p><strong>Genre:</strong> {movie.Genre}</p>
            <p><strong>Runtime:</strong> {movie.Runtime}</p>
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Actors:</strong> {movie.Actors}</p>
            <p><strong>Language:</strong> {movie.Language}</p>

            <h3>Plot</h3>
            <p>{movie.Plot}</p>
          </div>
        </div>
      </main>
    </>
  );
}

export default MovieDetails;