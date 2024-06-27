import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const DetailsPage = () => {
  const { id } = useParams();
  const movies = useSelector(state => state.movies);
  
  const movie = movies.find(m => m._id === id);

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="bg-gray-600 min-h-screen flex flex-col">
      <nav className="flex items-center justify-between bg-gray-800 p-4">
      <Link to="/" className="flex items-center">
        <div className="flex items-center">
          <img src="https://cdn-icons-png.freepik.com/512/5213/5213657.png" alt="IMDB Logo" className="h-8 mr-2" />
          <span className="text-yellow-400 font-bold text-2xl">WatchList</span>
        </div>
        </Link>
        <Link to="/" className="flex items-center">
          <button className="bg-yellow-400 text-black font-bold py-2 px-6 rounded-full">
            Go Back
          </button>
        </Link>
      </nav>
      <div className="flex-grow flex items-center justify-center bg-gray-600">
        <div className="bg-gradient-to-br from-gray-800 to-gray-700 text-white rounded-lg shadow-xl p-6 max-w-xl w-full mx-4 my-4">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="text-gray-400">{movie.releaseYear}</p>
          <div className="mt-4">
            <h2 className="text-xl font-bold">Description</h2>
            <p className="text-gray-300">{movie.description}</p>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-bold">Genre</h2>
            <p className="text-gray-300">{movie.genre}</p>
          </div>
          <div className="flex items-center mt-4">
            <FaStar className="text-yellow-500 mr-2" />
            <p className="text-lg font-bold">{movie.rating}/5</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;


 