 import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteMovie, toggleWatched, rateMovie, reviewMovie } from '../redux/actions';
import { FaEdit, FaTrash, FaStar } from 'react-icons/fa';

const MovieItem = ({ movie }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteMovie(movie._id));
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-4 rounded-lg shadow-xl flex flex-col items-start text-white transform transition duration-300 hover:scale-105">
      <div className="flex justify-between items-center w-full mb-2">
        <Link to={`/details/${movie._id}`} className="flex-grow">
          <h3 className="text-xl font-bold text-yellow-400">{movie.title}</h3>
        </Link>
        <div className="flex items-center">
          <Link to={`/edit/${movie._id}`} className="text-yellow-500 hover:text-yellow-600 transition duration-300 mr-2">
            <FaEdit size={20} />
          </Link>
          <button
            className="text-red-500 hover:text-red-600 transition duration-300 ml-2"
            onClick={handleDelete}
          >
            <FaTrash size={20} />
          </button>
        </div>
      </div>
      <p className="text-gray-300 mb-2">{movie.description}</p>
      <p className="text-gray-400">Year: {movie.releaseYear}</p>
      <p className="text-gray-400">Genre: {movie.genre}</p>
      <div className="flex justify-between items-center w-full">
        <p className="text-gray-400">Watched: {movie.watched ? 'Yes' : 'No'}</p>
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition duration-300"
          onClick={() => dispatch(toggleWatched(movie._id))}
        >
          Toggle Watched
        </button>
      </div>
      <div className="mt-3 w-full">
        <label className="text-gray-300">Rating:</label>
        <div className="flex items-center mt-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={`cursor-pointer ${star <= movie.rating ? 'text-yellow-400' : 'text-gray-600'}`}
              onClick={() => dispatch(rateMovie(movie._id, star))}
            />
          ))}
        </div>
      </div>
      <div className="mt-3 w-full">
        <label className="text-gray-300">Review:</label>
        <textarea 
          value={movie.review}
          onChange={(e) => dispatch(reviewMovie(movie._id, e.target.value))}
          className="w-full bg-gray-700 text-white border border-gray-600 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          rows="3"
        ></textarea>
      </div>
    </div>
  );
};

export default MovieItem;
