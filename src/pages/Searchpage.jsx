import { useState, useEffect } from 'react';
import { fetchMovies } from '../api/tmdbApi';
import MovieList from '../components/MovieList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';


const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [id, setId] = useState('');
  const [totalPage, setTotalPage] = useState('');
  const [actualPage, setActualPage] = useState(2);


  const handleSearch = async () => {
    const data = await fetchMovies(`search/movie?query=${query}`);
    setMovies(data.results);
    setTotalPage(data.total_pages);
    if (totalPage > 500) {
      setTotalPage('500');
    }
  };


  const handleCategory = async (genreId, pageNumber) => {
    try {
      const url = `discover/movie`;
      const data = await fetchMovies(url, genreId, pageNumber);
      setMovies(data.results);
      setId(genreId);
      if (data.total_pages > 500) {
        setTotalPage('500');
        console.log(totalPage);
      }
      else {
        setTotalPage(data.total_pages);
      }
    } catch (error) {
      setError('Erreur lors de la récupération des films par genre.');
    }
  };

  if (query === "" && id === "") {
    handleCategory("28");
  }


  const nextPage = async (genreId, pageNumber) => {
    if (actualPage !== 500) {
      setActualPage(prevActualPage => prevActualPage + 1);
    }
    console.log(actualPage);
    console.log(genreId);

    try {
      const url = `discover/movie`;
      const data = await fetchMovies(url, genreId, pageNumber);
      setMovies(data.results);
      setId(genreId);
      if (data.total_pages > 500) {
        setTotalPage('500');
        console.log(totalPage);
      }
      else {
        setTotalPage(data.total_pages);
      }
    } catch (error) {
      setError('Erreur lors de la récupération des films par genre.');
    }
  }

  const PreviousPage = async (genreId, pageNumber) => {
    if (actualPage > 2) {
      setActualPage(prevActualPage => prevActualPage - 1);
    }
    console.log(actualPage);
    console.log(genreId);

    try {
      const url = `discover/movie`;
      const data = await fetchMovies(url, genreId, pageNumber);
      setMovies(data.results);
      setId(genreId);
      if (data.total_pages > 500) {
        setTotalPage('500');
        console.log(totalPage);
      }
      else {
        setTotalPage(data.total_pages);
      }
      
    
    } catch (error) {
      setError('Erreur lors de la récupération des films par genre.');
    }
  }

  const firstAndLastPage = async (genreId, pageNumber) => {
    try {
      const url = `discover/movie`;
      const data = await fetchMovies(url, genreId, pageNumber);
      setMovies(data.results);
      setId(genreId);
      if (data.total_pages > 500) {
        setTotalPage('500');
        console.log(totalPage);
      }
      else {
        setTotalPage(data.total_pages);
      }
      
    
    } catch (error) {
      setError('Erreur lors de la récupération des films par genre.');
    }
  }

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
      <nav className="category-nav">
        <ul>
          {genres.map((genre, index) => (
            <li key={index} onClick={() => handleCategory(genre.id, actualPage)}>
              {genre.name}
            </li>
          ))}
        </ul>
      </nav>
      <section className="movie-list">
        <MovieList movies={movies} totalPage={totalPage} />
        <div className="pagination">
          <div className="page">
            <FontAwesomeIcon onClick={() => PreviousPage(id, actualPage)} icon={faCaretLeft} className="previous-button" />
          </div>
          <div className="page">
            <p  onClick={() => firstAndLastPage(id, 1)}>1</p>
          </div>
          <div
            className="page"
            style={{
              backgroundColor:
                actualPage !== 1 && actualPage !== totalPage
                  ? "#fa7157"
                  : "black",
            }}
          >
            <p>
              {actualPage !== 2 &&actualPage !== totalPage
                ? actualPage-1
                : "..."}
            </p>
          </div>
          <div className="page">
            <p onClick={() => firstAndLastPage(id, totalPage)}>{totalPage}</p>
          </div>
          <div className="page">
            <FontAwesomeIcon
              onClick={() => nextPage(id, actualPage)}
              icon={faCaretRight}
              className="next-button"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default SearchPage;
