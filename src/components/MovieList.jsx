import PropTypes from 'prop-types';
import MovieCard from './MovieCard';

const MovieList = ({ movies }) => (
  
  <>
    {movies.map((movie, index) => (
      <MovieCard key={movie.id} movie={movie} index={index} />
    ))}
     
  </>
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
