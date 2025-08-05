import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  getPopularMovies,
  getMoviesBySearch,
} from "../redux/slices/movieSlice";
import MovieList from "../components/movies/MovieList";
import Pagination from "../components/ui/Pagination";
import Navbar from "../components/layout/Navbar";
import FilterSelect from "../components/ui/FilterSelect";

const Explore = () => {
  const dispatch = useDispatch();
  const { movies, loading, error, totalResults } = useSelector(
    (state) => state.movies
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query") || "";
  const page = parseInt(searchParams.get("page")) || 1;
  const typeFilter = searchParams.get("type") || "";

  const [availableTypes, setAvailableTypes] = useState([]);
  const [hasInitializedFilters, setHasInitializedFilters] = useState(false);

  useEffect(() => {
    if (query) {
      dispatch(getMoviesBySearch({ query, page, type: typeFilter }));
    } else {
      dispatch(getPopularMovies(page));
    }
  }, [dispatch, query, page, typeFilter]);

 
  useEffect(() => {
    if (!hasInitializedFilters && movies.length > 0) {
      const types = new Set();
      movies.forEach((movie) => {
        if (movie.Type) types.add(movie.Type.toLowerCase());
      });
      setAvailableTypes(Array.from(types));
      setHasInitializedFilters(true);
    }
  }, [movies, hasInitializedFilters]);


  const handleTypeChange = (selectedType) => {
    const params = {
      query,
      page: 1,
      ...(selectedType && { type: selectedType }),
    };
    setSearchParams(params);
  };

  const filterOptions = useMemo(() => {
    const normalizedTypes = new Set(
      [
        ...availableTypes.map((t) => t.toLowerCase()),
        typeFilter.toLowerCase(),
      ].filter(Boolean)
    );
    return Array.from(normalizedTypes).map(
      (type) => type.charAt(0).toUpperCase() + type.slice(1)
    );
  }, [availableTypes, typeFilter]);

  return (
    <>
      <Navbar />
      <div className="text-center my-3">
        <FilterSelect
          label="Type"
          options={filterOptions}
          value={typeFilter}
          onChange={handleTypeChange}
        />
      </div>
      <div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && <MovieList movies={movies} />}
        {totalResults > 10 && <Pagination />}
      </div>
    </>
  );
};

export default Explore;
