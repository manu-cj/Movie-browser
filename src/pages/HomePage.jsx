import { useState, useEffect } from 'react';
import { fetchMovies } from '../api/tmdbApi';
import Spotlight from '../components/Spotlight';
import TrendingCards from '../components/TrendingCards';
import { API_KEY_TMDB } from '../../config';
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

  const API_KEY = API_KEY_TMDB;
  console.log(API_KEY);
  return (
    <>
    <h2><span>Movie</span>Browser</h2>
      <Spotlight />
      <h2>Trending</h2>
      <TrendingCards movies={movies} />
    </>
  );
};

export default HomePage;
