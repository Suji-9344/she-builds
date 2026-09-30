# Movie Explorer Application

A simple React application for searching movies using the OMDb public movie API.

## Features

- Search movies
- View movie details
- Display IMDb ratings
- Category filter
- Loading message
- Error handling
- Responsive design
- React Router navigation
- Reusable React components

## Technologies

- React
- Vite
- JavaScript
- CSS
- OMDb API

## How to Run

1. Open the project folder in VS Code.
2. Open the terminal.
3. Run:

```bash
npm install
```

4. Create a file named `.env` in the project root.
5. Add:

```text
VITE_OMDB_API_KEY=your_api_key
```

6. Run:

```bash
npm run dev
```

7. Open the local URL shown by Vite.

## API Key

Get a free API key from the OMDb API website and put it in the `.env` file.

Do not upload the `.env` file to GitHub. The `.gitignore` file is included for this.

## Project Structure

src/
- components/
  - Navbar.jsx
  - SearchBar.jsx
  - Filter.jsx
  - Loading.jsx
  - ErrorMessage.jsx
  - MovieCard.jsx
  - MovieList.jsx
- pages/
  - Home.jsx
  - MovieDetails.jsx
- api.js
- App.jsx
- main.jsx
- style.css
