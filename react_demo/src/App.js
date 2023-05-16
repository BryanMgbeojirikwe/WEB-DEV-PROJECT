import { useEffect, useState } from "react";
import "./App.css";
import MovieCard from "./MovieCard";

function App() {
  const API_URL =
    "https://api.themoviedb.org/3/movie/popular?api_key=f98deb5d2da96315abf19e36b674a168";
  const API_SEARCH =
    "https://api.themoviedb.org/3/search/movie?api_key=f98deb5d2da96315abf19e36b674a168&query=";
  const API_GENRE = "https://api.themoviedb.org/3/discover/movie?api_key=f98deb5d2da96315abf19e36b674a168&with_genres=";
  
  const [movies, setMovies] = useState([]);
  const [term, setTerm] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (term === "") {
      window.location.reload();
    } else {
      fetch(API_SEARCH + term)
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.results);
          setTerm(""); // Clear the search bar
        });
    }
  };

  const handleGenreClick = (genreId) => {
    fetch(API_GENRE + genreId)
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
  };

  return (
    <div className="App">
      <div className="search_nav">
        <div className="title">
          <h1 onClick={() => window.location.reload()}>Movie Finder</h1>
        </div>
        <div className="search_box">
          <form onSubmit={handleSearch}>
            <input onChange={(e) => setTerm(e.target.value)} />
            <button>Search</button>
          </form>
        </div>
        <div className="genre_buttons">
          <button onClick={() => handleGenreClick(27)}>Horror</button>
          <button onClick={() => handleGenreClick(16)}>Animation</button>
          <button onClick={() => handleGenreClick(53)}>Thriller</button>
          <button onClick={() => handleGenreClick(28)}>Action</button>
          <button onClick={() => handleGenreClick(10749)}>Romance</button>
          <button onClick={() => handleGenreClick(12)}>Adventure</button>
          <button onClick={() => handleGenreClick(35)}>Comedy</button>
        </div>
      </div>

      <div className="movies">
        {movies.map((movie) => (
          <MovieCard {...movie} />
        ))}
      </div>
    </div>
  );
}

export default App;
