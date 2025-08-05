import axios from "axios";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

export const fetchPopularMovies = async (page = 1) => {
  const res = await axios.get(
    `${BASE_URL}?apikey=${API_KEY}&s=cars&page=${page}`
  );

  if (res.data.Response === "True") {
    return {
      movies: res.data.Search || [],
      total: parseInt(res.data.totalResults, 10),
      currentPage: page,
    };
  } else {
    return {
      movies: [],
      total: 0,
      currentPage: page,
    };
  }
};