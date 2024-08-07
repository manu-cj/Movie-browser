import PropTypes from 'prop-types';
import { useState } from 'react';
import 'ldrs/tailChase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';



function TrendingCards({ movies }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? movies.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === movies.length - 1 ? 0 : prevIndex + 1));
  };

  if (movies.length === 0) {
    return <div><l-tail-chase
    size="40"
    speed="1.75"
    color="#fa7157" 
  ></l-tail-chase></div>;
  }

  const prevIndex = currentIndex === 0 ? movies.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex === movies.length - 1 ? 0 : currentIndex + 1;
    return (
      <>
        <section className="trending-section ">
        <FontAwesomeIcon onClick={prevSlide} icon={faCaretLeft} className='previous-button' />
          <div className="carousel">
            <div
              className="trending-card prev"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w200${movies[prevIndex].poster_path})`,
              }}
            ></div>
            <div
              className="trending-card active"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w200${movies[currentIndex].poster_path})`,
              }}
            >
              <div className='glass note-div'>
                <p>IMDB</p>
                <p className='note'> ⭐{Math.round(movies[currentIndex].vote_average * 10) / 10 } </p>
              </div>
              <div className="glass trending-card-data">
                <p><a href={`https://movie-browser-manu-cj.netlify.app/movie/${movies[currentIndex].id}`}>{movies[currentIndex].title} </a></p> 
              </div>
            </div>
            <div
              className="trending-card next"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w200${movies[nextIndex].poster_path})`,
              }}
            ></div>

          </div>
          <FontAwesomeIcon onClick={nextSlide} icon={faCaretRight} className='next-button' />
        </section>
      </> 
    );
}
TrendingCards.propTypes = {
    movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        poster_path: PropTypes.string,
        title: PropTypes.string,
        vote_average: PropTypes.number,
        release_date: PropTypes.string
      })
    ).isRequired,
  };

export default TrendingCards;