import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovies } from '../api/tmdbApi';
import axios from 'axios';
import { API_KEY_YouTube } from '../../config';

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailers, setTrailers] = useState([]);
  const [loading, setLoading] = useState(false);

  const YouTube_API_KEY =  API_KEY_YouTube;

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

  return (
    <>
      {movie ? (
        <div>
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
          />
          {loading ? (
            <p>Chargement...</p>
          ) : (
            <div>
              {trailers.map(trailer => (
                <div key={trailer.id.videoId}>
                  <h3>{trailer.snippet.title}</h3>
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${trailer.id.videoId}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={trailer.snippet.title}
                  ></iframe>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          <l-tail-chase size="40" speed="1.75" color="#fa7157"></l-tail-chase>
        </div>
      )}
    </>
  );
};

export default MovieDetailPage;
