import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovies } from '../api/tmdbApi';
import axios from 'axios';
import { API_KEY_YouTube } from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faStar } from '@fortawesome/free-solid-svg-icons';

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailers, setTrailers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState(null);

  const YouTube_API_KEY = API_KEY_YouTube;

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovies(`movie/${id}`);
        setMovie(data);
        rechercherTrailers(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails du film:', error);
      }
    };

    getMovieDetails();
  }, [id]);

  const rechercherTrailers = async (movie) => {
    setLoading(true);
    try {
      // Rechercher des trailers sur YouTube
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
  };

  useEffect(() => {
    const handleScroll = () => {
      const movieDataSection = document.querySelector('.movie-data-section');
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      if (movieDataSection) {
        movieDataSection.style.top = `${40 - (scrollY / windowHeight) * 100}vh`;
      }

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      setScrollTimeout(setTimeout(() => {
        if (movieDataSection) {
          movieDataSection.style.top = '40vh';
        }
      }, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [scrollTimeout]);


  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const getTruncatedText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  };

  console.log(movie);

  return (
    <section className='details-page-section'>
      {loading ? (
        <div>
          <l-tail-chase size="40" speed="1.75" color="#fa7157"></l-tail-chase>
        </div>
      ) : (
        <section className="trailer-section">
          {trailers.length > 0 ? (
            trailers.map((trailer) => (
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
          ) : (
            movie && (
              <div className="movie-image-div">
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                />
              </div>
            )
          )}
        </section>
      )}
      {movie ? (
        <section className="movie-data-section">
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
                {movie.vote_average} (IMDb)
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
          <div className='synopsys-div'>
          <p>
            {showMore ? movie.overview : getTruncatedText(movie.overview, 150)}
            {movie.overview.length > 150 && (
              <span className='show-more' onClick={toggleShowMore}>
                {showMore ? 'See less' : 'Show more'}
              </span>
            )}
          </p>
          </div>
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
