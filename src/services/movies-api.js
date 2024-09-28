import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNzBjZDE3YjI5ODZhMzljZGZlMjU1ZTllMzc2MmY4YSIsIm5iZiI6MTcyNzI2MTM4MC4zMDM2NTUsInN1YiI6IjY2ZjNlODFjNzQwMTM4NjQxZTY5ZjE1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pcj5UwrL9CWi2jRNf0OysjvfvlliqOB0NbQStml3yBs";

const options = {
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};

export const fetchTrendingMovies = async () => {
  const { data } = await axios.get("trending/movie/day", options);
  return data.results;
};

export const fetchMovie = async (movieId) => {
  const { data } = await axios.get(`movie/${movieId}`, options);
  return data;
};

export const fetchCast = async (movieId) => {
  const { data } = await axios.get(`movie/${movieId}/credits`, options);
  return data.cast;
};

export const fetchReviews = async (movieId) => {
  const { data } = await axios.get(`movie/${movieId}/reviews`, options);
  return data.results;
};

export const fetchMovieByQuery = async (query) => {
  const { data } = await axios.get(`search/movie?query=${query}`, options);
  return data.results;
};
