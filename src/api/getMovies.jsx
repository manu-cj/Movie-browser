// src/ApiComponent.js
import { useState, useEffect } from 'react';

const ApiComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/movie/157336?api_key=5dcb863a6669daff2279567afe585904');
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>API Data</h1>
      <div>
      <h1>{data.id}</h1>
      <p>Release Date: {data.release_date}</p>
      <p>Overview: {data.overview}</p>
    </div>
    </div>
  );
};

export default ApiComponent;
