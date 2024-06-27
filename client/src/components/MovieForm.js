import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMovie, editMovie, setFlashMessage } from '../redux/actions';
import { useNavigate, useParams, Link } from 'react-router-dom';

const MovieForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [genre, setGenre] = useState('');
  const [editing, setEditing] = useState(false);

  const { id } = useParams();
  const movies = useSelector(state => state.movies);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const movie = movies.find(movie => movie._id === id);
      if (movie) {
        setTitle(movie.title);
        setDescription(movie.description);
        setReleaseYear(movie.releaseYear);
        setGenre(movie.genre);
        setEditing(true);
      }
    }
  }, [id, movies]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMovie = {
      _id: editing ? id : undefined,
      title,
      description,
      releaseYear,
      genre,
      watched: false,
      rating: 0,
      review: ''
    };
    if (editing) {
      dispatch(editMovie(newMovie));
      dispatch(setFlashMessage('Movie edited successfully!'));
    } else {
      dispatch(addMovie(newMovie));
      dispatch(setFlashMessage('Movie added successfully!'));
    }
    navigate('/');
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setReleaseYear('');
    setGenre('');
    setEditing(false);
  };

  return (
    <div className="bg-gray-600 min-h-screen">
      <nav className="flex items-center justify-between bg-gray-800 p-4">
        <Link to="/" className="flex items-center">
          <img src="https://cdn-icons-png.freepik.com/512/5213/5213657.png" alt="WatchList Logo" className="h-8 mr-2" />
          <span className="text-yellow-400 font-bold text-2xl">WatchList</span>
        </Link>
        <Link to="/" className="bg-yellow-400 text-black font-bold py-2 px-6 rounded-full">
          Go Back
        </Link>
      </nav>
      <div className="container mx-auto p-6 max-w-4xl">
        <h1 className="text-2xl font-bold text-black text-center mb-6">{editing ? 'Edit Movie' : 'Add New Movie'}</h1>
        <form className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-lg shadow-xl" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-gray-300">Title</label>
            <input
              className="w-full px-3 py-2 border rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-gray-300">Description</label>
            <textarea
              className="w-full px-3 py-2 border rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-gray-300">Release Year</label>
            <input
              className="w-full px-3 py-2 border rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              type="number"
              value={releaseYear}
              onChange={(e) => setReleaseYear(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-gray-300">Genre</label>
            <input
              className="w-full px-3 py-2 border rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300" type="submit">
              {editing ? 'Save Changes' : 'Add Movie'}
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300"
              type="button"
              onClick={resetForm}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieForm;

 
 