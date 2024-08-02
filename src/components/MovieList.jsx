import PropTypes from 'prop-types';
import MovieCard from './MovieCard';

const MovieList = ({ movies }) => (
  
  <div>
    {/* {genres.map((genre, index) => (
      <p key={index}> {genre.name} </p>
    ))} */}
    {movies.map((movie) => (
      <MovieCard key={movie.id} movie={movie} />
    ))}
  </div>
);

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      poster_path: PropTypes.string,
      title: PropTypes.string,
    })
  ).isRequired,
  
  // genres : PropTypes.arrayOf(
  //   PropTypes.shape({
  //     id: PropTypes.number.isRequired,
  //     name: PropTypes.string
  //   })
  // ).isRequired
};

export default MovieList;
