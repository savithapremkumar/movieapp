import {combineReducers} from 'redux';
import { createReducer, createAsyncReducer } from '../helpers';
import { keys as movieActionKeys } from '../actions/movieBrowser';
import movieModalReducer from './movieModal';



// This will create a new state with both the existing 
// movies and new pages of movies
const moviesSuccessReducer = (state, action) => {
  const existingMovies = state.response ? state.response.Search : [];
  // Create a new state object to be returned
  // When creating the new state, be sure to include any
  // existing properties we want to persist
  return {
    ...state,
    isLoading: false,
    response: {
      ...action.response,
      Search: [
        ...existingMovies,
        ...action.response.Search
      ]
    }
  };
}

// Combines our movie browser related reducers to build our movieBrowser reducer
const movieBrowserReducer = combineReducers({
  movieModal: movieModalReducer,
  movieSearch: createAsyncReducer(movieActionKeys.SEARCH_MOVIES, {
    [`${movieActionKeys.SEARCH_MOVIES}_SUCCESS`]: moviesSuccessReducer
  }),
  movieDetails: createAsyncReducer(movieActionKeys.GET_MOVIE_DETAILS),
});

export default movieBrowserReducer;
