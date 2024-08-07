import { useState, useEffect } from 'react';
import { fetchMovies } from '../api/tmdbApi';
import play from '../assets/Play.svg'

function Spotlight() {
    const [movies, setMovies] = useState([]);
    const endpoint = "trending/movie/week"

    useEffect(() => {
        const getMovies = async () => {
          const data = await fetchMovies(endpoint);
          setMovies(data.results[0]);
        };
        getMovies();
      }, []);

    return (
      <>
        <section className="spotlight-section">
          <div
            className="spotlight"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w200${movies.poster_path})`,
            }}
          >
            <div className="control glass">
                <div className='play-logo'>
                    <img src={play} width={"100%"}/>
                </div>
              <div className="data-div">
                <h3>Movie spotlight</h3>
                <h2> {movies.title} </h2>
              </div>
            </div>
          </div>
        </section>
      </>
    );
}

export default Spotlight;