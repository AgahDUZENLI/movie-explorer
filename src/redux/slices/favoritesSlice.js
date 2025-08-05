import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
    name: "favorites",
    initialState:{
        movies:[]
    },
    reducers: {
        addFavorite: (state, action) => {
            const exists = state.movies.some(
                (movie) => movie.imdbID === action.payload.imdbID);
            if(!exists){
                state.movies.push(action.payload);
            }
        },
        removeFavorite:(state,action) => {
            state.movies = state.movies.filter(
                (movie) => movie.imdbID !== action.payload
            );

        }
    }
})

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;