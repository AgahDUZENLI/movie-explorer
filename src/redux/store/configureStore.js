import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../slices/movieSlice"
import favoritesReducer from "../slices/favoritesSlice";


export const store = configureStore({
    reducer:{
        movies:movieReducer,
        favorites: favoritesReducer,
    }
})