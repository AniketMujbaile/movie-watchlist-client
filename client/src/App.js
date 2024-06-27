import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './redux/store';
import HomePage from './pages/HomePage';
import AddEditMoviePage from './pages/AddEditMoviePage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import './index.css';

function FlashMessage() {
  const flashMessage = useSelector(state => state.flashMessage);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (flashMessage) {
      const timer = setTimeout(() => {
        dispatch({ type: 'SET_FLASH_MESSAGE', payload: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [flashMessage, dispatch]);

  if (!flashMessage) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow">
      {flashMessage}
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="container mx-auto">
          <FlashMessage />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add" element={<AddEditMoviePage />} />
            <Route path="/edit/:id" element={<AddEditMoviePage />} />
            <Route path="/details/:id" element={<MovieDetailsPage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
 