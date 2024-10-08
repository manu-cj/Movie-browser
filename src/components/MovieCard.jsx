import PropTypes from 'prop-types';

const MovieCard = ({ movie, index }) => (
  <div className='card'>
    <div className={index%2 === 1 ? "little-picture-card" : "picture-card"} style={{
        backgroundImage:  movie.poster_path === null ? "url(https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available.jpg?s=612x612&w=0&k=20&c=P1DebpeMIAtXj_ZbVsKVvg-duuL0v9DlrOZUvPG6UJk=)" : `url(https://image.tmdb.org/t/p/w200${movie.poster_path})`
        
      }}>
      </div>
      <p><a href={`/movie/${movie.id}`}>{movie.title} ({movie.release_date.split('-')[0]}) </a></p>

  </div>
  
);

MovieCard.propTypes = {
  movie: PropTypes.shape({
    poster_path: PropTypes.string,
    title: PropTypes.string,
    release_date: PropTypes.string,
    id: PropTypes.number
  }).isRequired,

  index : PropTypes.number
};

export default MovieCard;
