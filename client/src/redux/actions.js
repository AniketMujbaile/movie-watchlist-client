import axios from 'axios';

const API_URL = 'https://movie-watchlist-client.onrender.com/api/movies';
//const API_URL = 'http://localhost:5000/api/movies';

export const ADD_MOVIE = 'ADD_MOVIE';
export const EDIT_MOVIE = 'EDIT_MOVIE';
export const DELETE_MOVIE = 'DELETE_MOVIE';
export const FETCH_MOVIES = 'FETCH_MOVIES';
export const FETCH_MOVIE = 'FETCH_MOVIE';
export const TOGGLE_WATCHED = 'TOGGLE_WATCHED';
export const RATE_MOVIE = 'RATE_MOVIE';
export const REVIEW_MOVIE = 'REVIEW_MOVIE';
export const SET_FLASH_MESSAGE = 'SET_FLASH_MESSAGE';

export const fetchMovies = () => async (dispatch) => {
  try {
    const response = await axios.get(API_URL);
    dispatch({
      type: FETCH_MOVIES,
      payload: response.data,
    });
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
};

export const fetchMovie = id => async dispatch => {
  const { data } = await axios.get(`${API_URL}/${id}`);
  dispatch({
    type: FETCH_MOVIE,
    payload: data
  });
};

export const addMovie = movie => async dispatch => {
  const { data } = await axios.post(API_URL, movie);
  dispatch({
    type: ADD_MOVIE,
    payload: data
  });
  dispatch(setFlashMessage('Movie added successfully!'));
};

export const editMovie = movie => async dispatch => {
  try {
    const { data } = await axios.put(`${API_URL}/${movie._id}`, movie);
    dispatch({
      type: EDIT_MOVIE,
      payload: data
    });
    dispatch(setFlashMessage('Movie edited successfully!'));
  } catch (error) {
    console.error('Error editing movie:', error.response || error.message);
    dispatch(setFlashMessage('Failed to edit movie. Please try again.'));
  }
};
 
export const deleteMovie = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    dispatch({
      type: DELETE_MOVIE,
      payload: id,
    });
  } catch (error) {
    console.error('Error deleting movie:', error);
  }
}; 

export const toggleWatched = id => async dispatch => {
  const { data } = await axios.get(`${API_URL}/${id}`);
  const updatedMovie = { ...data, watched: !data.watched };
  await axios.put(`${API_URL}/${id}`, updatedMovie);
  dispatch({
    type: TOGGLE_WATCHED,
    payload: updatedMovie
  });
};

export const rateMovie = (id, rating) => async dispatch => {
  const { data } = await axios.get(`${API_URL}/${id}`);
  const updatedMovie = { ...data, rating };
  await axios.put(`${API_URL}/${id}`, updatedMovie);
  dispatch({
    type: RATE_MOVIE,
    payload: updatedMovie
  });
};

export const reviewMovie = (id, review) => async dispatch => {
  const { data } = await axios.get(`${API_URL}/${id}`);
  const updatedMovie = { ...data, review };
  await axios.put(`${API_URL}/${id}`, updatedMovie);
  dispatch({
    type: REVIEW_MOVIE,
    payload: updatedMovie
  });
};

export const setFlashMessage = message => ({
  type: SET_FLASH_MESSAGE,
  payload: message
});

 
