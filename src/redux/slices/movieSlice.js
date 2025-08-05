import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPopularMovies } from "../../services/omdbApi";

export const getPopularMovies = createAsyncThunk(
  "movies/getPopularMovies",
  async (page = 1) => {
    const result = await fetchPopularMovies(page);
    return result;
  }
);

export const getMoviesBySearch = createAsyncThunk(
  "movies/getMoviesBySearch",
  async ({ query, page = 1, type = "" }) => {
    const typeParam = type ? `&type=${type}` : "";
    const res = await fetch(`https://www.omdbapi.com/?apikey=e2f42327&s=${query}&page=${page}${typeParam}`);
    const data = await res.json();
    return {
      movies: data.Search || [],
      total: parseInt(data.totalResults || 0),
      currentPage: page,
    };
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    loading: false,
    error: null,
    totalResults: 0,
    currentPage: 1,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getPopularMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPopularMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.movies;
        state.totalResults = action.payload.total;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(getPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getMoviesBySearch.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMoviesBySearch.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.movies;
        state.totalResults = action.payload.total;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(getMoviesBySearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default movieSlice.reducer;
