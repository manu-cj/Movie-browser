import { useState, useEffect } from 'react';
import { fetchMovies } from '../api/tmdbApi';
import MovieList from '../components/MovieList';


const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [id, setId] = useState('');

  const handleSearch = async () => {
    const data = await fetchMovies(`search/movie?query=${query}`);
    setMovies(data.results);
  };


  const handleCategory = async (genreId) => {
    try {
      const url = `discover/movie`;
      const data = await fetchMovies(url, genreId);
      setMovies(data.results);
      setId(genreId); // Mettre à jour l'état id
    } catch (error) {
      setError('Erreur lors de la récupération des films par genre.');
    }
  };

// useEffect(() => {
//   const getCategory = async () => {
//     try {
//       const url = `discover/movie`;
//       const datas = await fetchMovies(url, id);
//       setMovies(datas.results);
//     } catch (error) {
//       setError('Erreur lors de la récupération des films.');
//     } finally {
//       setLoading(false);
//     }
//   }
//   getCategory()
  
// }, )



  useEffect(() => {
      const getGenre = async () => {
    try {
      const url = "genre/movie/list";
      const genreData = await fetchMovies(url);
      setGenres(genreData.genres);
    } catch (error) {
      setError('Erreur lors de la récupération des genres.');
    } finally {
      setLoading(false);
    }
  };
  getGenre();
  }, [])


  useEffect(() => {
    if (id) {
      handleCategory(id);
    }
  }, [id]);


  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }


  return (
    <>
      <h1>Recherche de Films</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher un film"
      />
      <button onClick={handleSearch}>Rechercher</button>
      <nav className='category-nav'>
        <ul>
        {genres.map((genre, index) => (
         <li key={index}>
         <button onClick={() => handleCategory(genre.id)}>
           {genre.name}
         </button>
       </li>
      ))}
        </ul>
      </nav>
      
      <MovieList movies={movies} />
    </>
    
  );
};

export default SearchPage;
