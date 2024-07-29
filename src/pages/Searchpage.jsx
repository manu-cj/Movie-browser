import { useState } from 'react';
import { fetchMovies } from '../api/tmdbApi';
import MovieList from '../components/MovieList';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    const data = await fetchMovies(`search/movie?query=${query}`);
    setMovies(data.results);
  };

  return (
    <div>
      <h1>Recherche de Films</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher un film"
      />
      <button onClick={handleSearch}>Rechercher</button>
      <MovieList movies={movies} />
    </div>
  );
};

export default SearchPage;
