import axios from 'axios';




const API_KEY = import.meta.env.VITE_API_KEY_TMDB;
const BASE_URL = 'https://api.themoviedb.org/3';


export const fetchMovies = async (endpoint, genreId = null, pageNumber = null) => {
  try {
    const params = {
      api_key: API_KEY,
    };

    if (genreId) {
      params.with_genres = genreId;
    }

    if (pageNumber) {
      params.page = pageNumber;
    }

    const response = await axios.get(`${BASE_URL}/${endpoint}`, {
      params: params,
    });
    return response.data;
  } catch (error) {
    console.error('Erreur de récupération des films:', error);
  }
};

