import { useState, useEffect } from 'react';
import { fetchMovies } from '../api/tmdbApi';
import MovieList from '../components/MovieList';
import Spotlight from '../components/Spotlight';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
    const endpoint = "trending/movie/week"
  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchMovies(endpoint);
      setMovies(data.results);
    };
    getMovies();
  }, []);

  return (
    <>
    <h1><span>Movie</span>Browser</h1>
      <Spotlight />
      <h1>Films Populaires</h1>
      <MovieList movies={movies} />
    </>
  );
};

export default HomePage;
