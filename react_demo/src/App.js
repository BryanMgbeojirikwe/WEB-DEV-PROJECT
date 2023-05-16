import React, { useEffect, useState } from "react";
import "./App.css";
import MovieCard from "./MovieCard";
import Cookies from "js-cookie";

function App() {
  const [movies, setMovies] = useState([]);
  const [term, setTerm] = useState("");

  useEffect(() => {
    fetch("/api/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    const storedSearchTerm = Cookies.get("searchTerm");
    if (storedSearchTerm) {
      fetch(`/api/movies/search?term=${encodeURIComponent(storedSearchTerm)}`)
        .then((res) => res.json())
        .then((data) => setMovies(data))
        .catch((error) => console.error("Error:", error));
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (term === "") {
      window.location.reload();
    } else {
      fetch(`/api/movies/search?term=${encodeURIComponent(term)}`)
        .then((res) => res.json())
        .then((data) => {
          setMovies(data);
          setTerm(""); // Clear the search bar
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  const handleGenreClick = (genreId) => {
    fetch(`/api/movies/genre/${genreId}`)
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error:", error));
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
          <button onClick={() => handleGenreClick(28)}>Action</button>
          <button onClick={() => handleGenreClick(10749)}>Romance</button>
          <button onClick={() => handleGenreClick(12)}>Adventure</button>
          <button onClick={() => handleGenreClick(35)}>Comedy</button>
        </div>
      </div>

      <div className="movies">
        {movies.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
}

export default App;