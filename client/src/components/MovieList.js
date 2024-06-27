import React from 'react';
import { useSelector } from 'react-redux';
import MovieItem from './MovieItem';

const MovieList = () => {
  const movies = useSelector(state => state.movies);

  return (
    <ul>
      {movies.map(movie => (
        <MovieItem key={movie._id} movie={movie} />
      ))}
    </ul>
  );
};

export default MovieList;

 