const express = require("express");
const path = require("path");
//const fetch = require("node-fetch");
require("isomorphic-fetch");
const Cookies = require("js-cookie");

const app = express();
app.use(express.json());
const port = 3000;

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "build")));

// API endpoint for fetching movies
app.get("/api/movies", (req, res) => {
  const API_URL =
    "https://api.themoviedb.org/3/movie/popular?api_key=f98deb5d2da96315abf19e36b674a168";

  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => res.json(data.results))
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

// API endpoint for searching movies
app.get("/api/movies/search", (req, res) => {
  const API_SEARCH = `https://api.themoviedb.org/3/search/movie?api_key=f98deb5d2da96315abf19e36b674a168&query=${encodeURIComponent(
    req.query.term
  )}`;

  fetch(API_SEARCH)
    .then((response) => response.json())
    .then((data) => {
      // Store the search term in a cookie
      Cookies.set("searchTerm", req.query.term);
      res.json(data.results);
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

// API endpoint for fetching movies by genre
app.get("/api/movies/genre/:genreId", (req, res) => {
  const API_GENRE = `https://api.themoviedb.org/3/discover/movie?api_key=f98deb5d2da96315abf19e36b674a168&with_genres=${req.params.genreId}`;

  fetch(API_GENRE)
    .then((response) => response.json())
    .then((data) => res.json(data.results))
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

// Catch-all route to serve the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
