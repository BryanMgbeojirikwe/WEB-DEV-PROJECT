import React from 'react';
import './MovieList.css';

class MovieList extends React.Component {
  render() {
    return (
      <div className="movie-list">
        {this.props.movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <img src={movie.image} alt={movie.title} />
            <h2>{movie.title}</h2>
          </div>
        ))}
      </div>
    );
  }
}

export default MovieList;
