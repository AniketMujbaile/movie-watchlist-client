const Movie = require('../models/movieModel');
const asyncHandler = require('../utils/asyncHandler');

const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    // console.error('Error fetching movies:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
 
const getMovieById = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404);
    throw new Error('Movie not found');
  }
});

const createMovie = asyncHandler(async (req, res) => {
  const { title, description, releaseYear, genre } = req.body;
  const movie = new Movie({ title, description, releaseYear, genre });
  const createdMovie = await movie.save();
  res.status(201).json(createdMovie);
});
 
const updateMovie = asyncHandler(async (req, res) => {
  const { title, description, releaseYear, genre, watched, rating, review } = req.body;
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      movie.title = title;
      movie.description = description;
      movie.releaseYear = releaseYear;
      movie.genre = genre;
      movie.watched = watched;
      movie.rating = rating;
      movie.review = review;
      const updatedMovie = await movie.save();
      res.json(updatedMovie);
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    // console.error('Error updating movie:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

const deleteMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
 
    const movie = await Movie.findByIdAndDelete(movieId);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (error) {
     res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
};
