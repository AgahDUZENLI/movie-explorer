import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import MovieList from "../components/movies/MovieList";
import Navbar from "../components/layout/Navbar";
import FilterSelect from "../components/ui/FilterSelect";

const Favorites = () => {
  const [typeFilter, setTypeFilter] = useState("");
  const favorites = useSelector((state) => state.favorites.movies);

  const filteredFavorites = typeFilter
    ? favorites.filter((movie) => movie.Type.toLowerCase() === typeFilter.toLowerCase())
    : favorites;

  const filterOptions = useMemo(() => {
    const types = new Set(favorites.map((movie) => movie.Type.toLowerCase()));
    return Array.from(types).map(
      (type) => type.charAt(0).toUpperCase() + type.slice(1)
    );
  }, [favorites]);

  return (
    <>
      <Navbar />
      <FilterSelect
        label="Type"
        options={filterOptions}
        value={typeFilter}
        onChange={setTypeFilter}
      />
      <div>
        <h2>My Favorite Movies</h2>
        {filteredFavorites.length === 0 ? (
          <p>No favorites yet.</p>
        ) : (
          <MovieList movies={filteredFavorites} />
        )}
      </div>
    </>
  );
};

export default Favorites;