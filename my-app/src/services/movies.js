// API key to be moved into another file
const MOVIE_DB_API_KEY = '6c49cf53';
const MOVIE_DB_BASE_URL = 'http://www.omdbapi.com';

const createMovieDbUrl = (relativeUrl, queryParams) => {
  let baseUrl = `${MOVIE_DB_BASE_URL}${relativeUrl}&apikey=${MOVIE_DB_API_KEY}`;
  if (queryParams) {
    Object.keys(queryParams)
      .forEach(paramName => baseUrl += `&${paramName}=${queryParams[paramName]}`);
  }
  return baseUrl;
}


export const searchMovies = async ({ query, page}) => {
  const fullUrl = createMovieDbUrl(`?s=${query}`, {
    page
  });
  return fetch(fullUrl);
}

export const getMovieDetails = async ({movieId}) => {
  const fullUrl = createMovieDbUrl(`?i=${movieId}`);
  return fetch(fullUrl);
}