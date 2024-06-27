import {
  ADD_MOVIE,
  EDIT_MOVIE,
  DELETE_MOVIE,
  FETCH_MOVIES,
  FETCH_MOVIE,
  TOGGLE_WATCHED,
  RATE_MOVIE,
  REVIEW_MOVIE,
  SET_FLASH_MESSAGE
} from './actions';

const initialState = {
  movies: [],
  selectedMovie: null,
  flashMessage: ''
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIES:
      return {
        ...state,
        movies: action.payload
      };
    case FETCH_MOVIE:
      return {
        ...state,
        selectedMovie: action.payload
      };
    case ADD_MOVIE:
      return {
        ...state,
        movies: [...state.movies, action.payload]
      };
    case EDIT_MOVIE:
      return {
        ...state,
        movies: state.movies.map(movie => (movie._id === action.payload._id ? action.payload : movie))
      };
    case DELETE_MOVIE:
      return {
        ...state,
        movies: state.movies.filter(movie => movie._id !== action.payload)
      };
    case TOGGLE_WATCHED:
      return {
        ...state,
        movies: state.movies.map(movie => (movie._id === action.payload._id ? action.payload : movie))
      };
    case RATE_MOVIE:
      return {
        ...state,
        movies: state.movies.map(movie => (movie._id === action.payload._id ? action.payload : movie))
      };
    case REVIEW_MOVIE:
      return {
        ...state,
        movies: state.movies.map(movie => (movie._id === action.payload._id ? action.payload : movie))
      };
    case SET_FLASH_MESSAGE:
      return {
        ...state,
        flashMessage: action.payload
      };
    default:
      return state;
  }
};

export default rootReducer;


 