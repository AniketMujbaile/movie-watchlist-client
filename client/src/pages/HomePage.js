import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies } from '../redux/actions';  
import MovieItem from '../components/MovieItem';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const dispatch = useDispatch();
  const movies = useSelector(state => state.movies);

  useEffect(() => {
    dispatch(fetchMovies());  
  }, [dispatch]); 

  return (
    <div className="bg-gray-600 min-h-screen">
      <nav className="flex items-center justify-between bg-gray-800 p-4">
        <Link to="/" className="flex items-center">
          <img src="https://cdn-icons-png.freepik.com/512/5213/5213657.png" alt="WatchList Logo" className="h-8 mr-2" />
          <span className="text-yellow-400 font-bold text-2xl">WatchList</span>
        </Link>
        <Link to="/add" className="bg-yellow-400 hover:bg-yellow-500 font-semibold px-6 py-2 rounded-full">
            Add Movie
        </Link>
      </nav>
      <div className="p-6">
        <div className="flex justify-center items-center mb-4">
          <h1 className="text-2xl font-bold text-black">My Watchlist</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {movies.map(movie => (
            <MovieItem key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;


 