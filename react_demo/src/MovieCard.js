
import React from "react";
import "./MovieCard.css";

const MovieCard = (props) => {
  const API_IMG = "https://image.tmdb.org/t/p/w500/";
  return (
    <div className="card">
      <div className="poster">
        <img src={props.poster_path ? API_IMG + props.poster_path : "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bmV0ZmxpeHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"} />
      </div>
      <div className="info">
        <p className="title">{props.title}</p>
        <p className={`vote ${props.vote_average < 5.5 ? 'below' : props.vote_average >= 5.5 && props.vote_average <= 6.5 ? 'mid' : 'above'}`}>
  {props.vote_average}
</p>
      </div>

      <div className='overview'>
      <h2 className = 'title_overview'>Overview:</h2>
      <h3 className = 'overview_info'>{props.overview}</h3>

      </div>

    </div>
  );
};
export default MovieCard;
