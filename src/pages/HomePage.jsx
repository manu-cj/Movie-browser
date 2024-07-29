import { useState, useEffect } from 'react';
import { fetchMovies } from '../api/tmdbApi';
import MovieList from '../components/MovieList';
import SearchPage from './Searchpage';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchMovies('movie/popular');
      setMovies(data.results);
    };
    getMovies();
  }, []);

  return (
    <div>
        <SearchPage/>
      <h1>Films Populaires</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
