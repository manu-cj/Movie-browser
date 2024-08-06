import { useState, useEffect } from 'react';
import { fetchMovies } from '../api/tmdbApi';
import MovieList from '../components/MovieList';
import 'ldrs/tailChase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import line from '../assets/Line 1.svg';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [id, setId] = useState(28);
  const [totalPage, setTotalPage] = useState('');
  const [actualPage, setActualPage] = useState(2);


  const handleSearch = async () => {
    try {
      if (typeof query !== 'string' || query.length < 1) {
        console.log(query.length);
        handleCategory(28);
        return;
      }
        const data = await fetchMovies(`search/movie?query=${query}`);
  
      setMovies(data.results || []);
      setTotalPage(data.total_pages || 0);
  
      if (data.total_pages > 500) {
        setTotalPage(500);
      }
  
      if (data.results.length === 0) {
        handleCategory(28);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des films:', error);
    }
  };

  const handleKeyUp = (event) => {
    if (query.length > 1) {
      handleSearch(event);
    } else {
      handleCategory(28);
    }
  };
  


  const handleCategory = async (genreId, pageNumber) => {
    try {
      const url = `discover/movie`;
      const data = await fetchMovies(url, genreId, pageNumber);
      setMovies(data.results);
      setId(genreId);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
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
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
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
    setActualPage(pageNumber);
    try {
      const url = `discover/movie`;
      const data = await fetchMovies(url, genreId, pageNumber);
      setMovies(data.results);
      setId(genreId);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
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
    return <div><l-tail-chase
    size="40"
    speed="1.75"
    color="#fa7157" 
  ></l-tail-chase></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  console.log(id);
  return (
    <>
      <h2><span>Movie</span>Browser</h2>
      <section className='searchBar-section'>
      <button onClick={handleSearch}><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="search a movie"
        onKeyUp={handleKeyUp}
        
      />
      </section>
      
      
      <nav className="category-nav">
      <ul>
  {genres.map((genre) => (
    <li
      key={genre.id}
      onClick={() => handleCategory(genre.id, actualPage)}
      style={{ color: id === genre.id ? "#fa7157" : "white" }}
      role="button"
      aria-label={`Select ${genre.name} genre`}
    >
      {genre.name}
      {id === genre.id ? <img src={line} /> : null}
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
