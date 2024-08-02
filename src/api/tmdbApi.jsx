import axios from 'axios';

const API_KEY = '5dcb863a6669daff2279567afe585904';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (endpoint, genreId = null) => {
  try {
    const params = {
      api_key: API_KEY,
    };

    if (genreId) {
      params.with_genres = genreId;
    }

    const response = await axios.get(`${BASE_URL}/${endpoint}`, {
      params: params,
    });
    return response.data;
  } catch (error) {
    console.error('Erreur de récupération des films:', error);
  }
};

