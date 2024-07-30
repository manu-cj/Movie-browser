import PropTypes from 'prop-types';
import { useState } from 'react';

function TrendingCards({ movies }) {
    let startNumber = 0
    const [start, setStart] = useState(startNumber)

 
    let endNumber = 3
    const [end, setEnd] = useState(endNumber)
    
    
    const limitedMovies = movies.slice(start, end);



    const ClickForNext = () => {
        setStart(prevStart => prevStart + 1);
        setEnd(prevEnd => prevEnd + 1);
        console.log(end);
    }
    
    const ClickForPrevious = () => {
        setStart(prevStart => prevStart - 1);
        setEnd(prevEnd => prevEnd - 1);
    }
    return (
      <>
        

        <section className="trending-section">
        {start !== 0 && <button onClick={ClickForPrevious}>-</button>}
          {limitedMovies.map((movie, index) => (
            <div
              key={movie.id}
              className={index === 1 ? "selected-movie trending-card" : "trending-card"}
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w200${movie.poster_path})`,
              }}
            >
              <h3>{movie.title}</h3>
            </div>
          ))}
                  {end < movies.length - 1 && <button onClick={ClickForNext}>+</button>}

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