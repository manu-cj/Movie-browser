import PropTypes from 'prop-types';
import { useState } from 'react';
import 'ldrs/tailChase'

// Default values shown  



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
      <button onClick={prevSlide}>◀️</button>
      <div className="carousel">
        <div className="trending-card prev">
          <img
            src={`https://image.tmdb.org/t/p/w500${movies[prevIndex].poster_path}`}
            alt={movies[prevIndex].title}
          />
        </div>
        <div className="trending-card active">
          <img
            src={`https://image.tmdb.org/t/p/w500${movies[currentIndex].poster_path}`}
            alt={movies[currentIndex].title}
          />
        </div>
        <div className="trending-card next">
          <img
            src={`https://image.tmdb.org/t/p/w500${movies[nextIndex].poster_path}`}
            alt={movies[nextIndex].title}
          />
        </div>
      </div>
      <button onClick={nextSlide}>▶️</button>
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
      })
    ).isRequired,
  };

export default TrendingCards;