import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovies } from '../api/tmdbApi';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faStar } from '@fortawesome/free-solid-svg-icons';
import throttle from 'lodash/throttle';

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailers, setTrailers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchCalled, setSearchCalled] = useState(false);
  

  const YouTube_API_KEY = import.meta.env.VITE_API_KEY_YouTube;
  const movieDataSectionRef = useRef(null);


  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovies(`movie/${id}`);
        setMovie(data);
        rechercherTrailers(data);

        if (!searchCalled) {
          handleSearch(data.title);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des détails du film:', error);
      }
    };

    getMovieDetails();
  }, [id, searchCalled]);

  const handleSearch = useCallback(async (title) => {
    if (!searchCalled) { 
      try {
        const data = await fetchMovies(`search/movie?query=${title.split(' ')[0]}`);
        setMovies(data.results || []);
        console.log(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des films:', error);
      } finally {
        setSearchCalled(true); 
      }
    }
  }, [searchCalled]);

  const rechercherTrailers = useCallback(async (movie) => {
    setLoading(true);
    try {
      const youtubeResponse = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          q: `${movie.title} ${movie.release_date ? movie.release_date.split('-')[0] : ''} trailer`,
          key: YouTube_API_KEY,
          part: 'snippet',
          type: 'video',
          maxResults: 1
        }
      });

      const data = youtubeResponse.data;
      if (data.items) {
        setTrailers(data.items);
      } else {
        console.error('Erreur lors de la recherche de trailers.');
      }
    } catch (error) {
      console.error('Erreur lors de la requête à l\'API YouTube:', error);
    } finally {
      setLoading(false);
    }
  }, [YouTube_API_KEY]);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const movieDataSection = movieDataSectionRef.current;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      if (movieDataSection) {
        const newTop = 100 - (scrollY / windowHeight) * 100;
        const currentTop = parseFloat(movieDataSection.style.top) || 50;

        console.log('scrollY:', scrollY);
        console.log('windowHeight:', windowHeight);
        console.log('newTop:', newTop);

        const tolerance = 1.5;

        if (Math.abs(currentTop - newTop) > tolerance) {
          movieDataSection.style.top = `${newTop}vh`;
        }
      }
    }, 30);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const getTruncatedText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  };


  return (
    <section className="details-page-section">
      {loading ? (
        <div>
          <l-tail-chase size="40" speed="1.75" color="#fa7157"></l-tail-chase>
        </div>
      ) : (
        <section className="trailer-section">
          {trailers.length > 0
            ? trailers.map((trailer) => (
                <div key={trailer.id.videoId} className="trailer-div">
                  <iframe
                    src={`https://www.youtube.com/embed/${trailer.id.videoId}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={trailer.snippet.title}
                  ></iframe>
                </div>
              ))
            : movie && (
                <div className="movie-image-div">
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                  />
                </div>
              )}
        </section>
      )}
      {movie ? (
        <section className="movie-data-section" ref={movieDataSectionRef}>
          <div className="top-div-data-section">
            <h2>{movie.title}</h2>
            <div className="runtime-vote-div">
              <p>
                <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>{" "}
                {movie.runtime} minutes{" "}
              </p>
              <p>
                {" "}
                <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                {Math.round(movie.vote_average * 10) / 10} (IMDb)
              </p>
            </div>
          </div>
          <div className="middle-div-data-section">
            <table>
              <thead>
                <tr>
                  <th>Release date</th>
                  <th>Genre</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td> {movie.release_date} </td>
                  <td>
                    {" "}
                    <div className="genres-div">
                      {movie.genres.map((genre) => (
                        <p className="genre-button" key={genre.id}>
                          {genre.name}
                        </p>
                      ))}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="synopsys-div">
            <p>
              {showMore
                ? movie.overview
                : getTruncatedText(movie.overview, 150)}
              {movie.overview.length > 150 && (
                <span className="show-more" onClick={toggleShowMore}>
                  {showMore ? "See less" : "Show more"}
                </span>
              )}
            </p>
          </div>
          <section className='other-movies-section'>
            {movies.map((otherMovie) => (
              <div key={otherMovie.id} className="other-movie-div">
                <img src={otherMovie.poster_path === null ? `https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available.jpg?s=612x612&w=0&k=20&c=P1DebpeMIAtXj_ZbVsKVvg-duuL0v9DlrOZUvPG6UJk=` : `https://image.tmdb.org/t/p/w200${otherMovie.poster_path}`} />
                <p><a href={`http://127.0.0.1:5173/movie/${otherMovie.id}`}>{otherMovie.title} ({otherMovie.release_date.split('-')[0]}) </a></p>
                
                
              </div>
            ))}
          </section>
        </section>
      ) : (
        <div>
          <l-tail-chase size="40" speed="1.75" color="#fa7157"></l-tail-chase>
        </div>
      )}
    </section>
  );
};

export default MovieDetailPage;
