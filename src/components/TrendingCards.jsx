import PropTypes from 'prop-types';
import { useState } from 'react';

function TrendingCards({ movies }) {
    let startNumber = 0
    const [start, setStart] = useState(startNumber)
    let indexNumber = 0;
    const [startIndex, setStartIndex] = useState(indexNumber)
 
    let endNumber = 3
    const [end, setEnd] = useState(endNumber)
    
    
    const limitedMovies = movies.slice(start, end);



    const ClickForNext = () => {
      setStartIndex(prevStartIndex => prevStartIndex + 1);
        if (startIndex === 2) {
          setStartIndex(0);
        }
        if (startIndex == 1) {
          setStart(prevStart => prevStart + 1);
          setEnd(prevEnd => prevEnd + 1);
          setStartIndex(1);
        }
    }
    
    const ClickForPrevious = () => {
       
        if (start !== 0) {
          setStart(prevStart => prevStart - 1);
          setEnd(prevEnd => prevEnd - 1);
          
        }
        else {
          setStartIndex(0);
        }
    }

    const sectionStyle = {
      marginLeft: startIndex === 0 ? '125%' : '0',
      marginRight: limitedMovies.length === 2 ? '100%' : '0'
  };
    return (
      <>
        
        <h2></h2>
        {startIndex !== 0 && <button onClick={ClickForPrevious}>-</button>}
        <section className="trending-section"
        style={sectionStyle}
         >
        
          {limitedMovies.map((movie, index) => (
            <div
              key={movie.id}
              className={index === startIndex ? "selected-movie trending-card" : "trending-card"}
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w200${movie.poster_path})`,
              }}
            >
              <h3>{movie.title}</h3>
              <h1> {startIndex} </h1>
              <h1> {start} </h1>
            </div>
          ))}
        </section>
        { limitedMovies.length !== 2 && <button onClick={ClickForNext}>+</button>}

        


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