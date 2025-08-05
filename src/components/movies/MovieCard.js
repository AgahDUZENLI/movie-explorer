import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../redux/slices/favoritesSlice";
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from "reactstrap";



const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.movies);

  const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(movie.imdbID));
    } else {
      dispatch(addFavorite(movie));
    }
  };

return (
    <Card className="movie-card">
      <CardImg top src={movie.Poster} alt={movie.Title} />
      <CardBody>
        <CardTitle tag="h5">{movie.Title}</CardTitle>
        <CardText>{movie.Year}</CardText>
        <Button
          color={isFavorite ? "danger" : "secondary"}
          onClick={toggleFavorite}
        >
          {isFavorite ? "❤️ Remove" : "🤍 Favorite"}
        </Button>
      </CardBody>
    </Card>
  );
};

export default MovieCard;