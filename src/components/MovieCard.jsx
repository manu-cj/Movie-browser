import PropTypes from 'prop-types';

const MovieCard = ({ movie }) => (
  <div>
    <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
    <h3><a href={`http://127.0.0.1:5173/movie/${movie.id}`}>{movie.title}</a></h3>
  </div>
);

MovieCard.propTypes = {
  movie: PropTypes.shape({
    poster_path: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.number
  }).isRequired,
};

export default MovieCard;
