const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

export async function searchMovies(searchText, type = "") {
  if (!API_KEY) {
    throw new Error("OMDb API key is missing. Add it to the .env file.");
  }

  const params = new URLSearchParams({
    apikey: API_KEY,
    s: searchText,
    page: "1"
  });

  if (type) {
    params.set("type", type);
  }

  const response = await fetch(`${BASE_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Unable to connect to the movie service.");
  }

  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "No movies found.");
  }

  return data.Search || [];
}

export async function getMovieDetails(id) {
  if (!API_KEY) {
    throw new Error("OMDb API key is missing. Add it to the .env file.");
  }

  const params = new URLSearchParams({
    apikey: API_KEY,
    i: id,
    plot: "full"
  });

  const response = await fetch(`${BASE_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Unable to get movie details.");
  }

  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "Movie not found.");
  }

  return data;
}