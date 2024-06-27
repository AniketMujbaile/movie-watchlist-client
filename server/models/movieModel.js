const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  releaseYear: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  watched: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 0
  },
  review: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
