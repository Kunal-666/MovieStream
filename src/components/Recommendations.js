import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Recommendations = () => {
  const { currentUser, fetchRecommendations } = useAuth();
  const [tvRecommendations, setTvRecommendations] = useState([]);
  const [movieRecommendations, setMovieRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movieDetails, setMovieDetails] = useState({});
  const [tvDetails, setTvDetails] = useState({});

  useEffect(() => {
    const getRecommendations = async () => {
      setLoading(true);
      setError(null);
      try {
        if (currentUser) {
          const recs = await fetchRecommendations(currentUser.uid);
          setTvRecommendations(recs.tv);
          setMovieRecommendations(recs.movie);
        } else {
          // setError('User not logged in');
        }
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        setError('Failed to fetch recommendations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getRecommendations();
  }, [currentUser, fetchRecommendations]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const movieIds = movieRecommendations.map(movie => movie.id);
      const promises = movieIds.map(async id => {
        try {
          const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=0d0f1379d0c8b95596f350605ec7f984`);
          if (!response.ok) {
            throw new Error('Failed to fetch movie details');
          }
          const data = await response.json();
          setMovieDetails(prevDetails => ({
            ...prevDetails,
            [id]: {
              title: data.title,
              release_date: data.release_date,
              poster_path: data.poster_path
            }
          }));
        } catch (error) {
          console.error(`Error fetching movie details for ID ${id}:`, error);
        }
      });

      await Promise.all(promises);
    };

    if (movieRecommendations.length > 0) {
      fetchMovieDetails();
    }
  }, [movieRecommendations]);

  useEffect(() => {
    const fetchTvDetails = async () => {
      const tvIds = tvRecommendations.map(tv => tv.id);
      const promises = tvIds.map(async id => {
        try {
          const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=0d0f1379d0c8b95596f350605ec7f984&language=en-US`);

          const data = await response.json();
          setTvDetails(prevDetails => ({
            ...prevDetails,
            [id]: {
              title: data.original_name,
              release_date: data.first_air_date,
              last_date: data.last_air_date,
              poster_path: data.poster_path
            }
          }));
        } catch (error) {
          console.error(`Error fetching TV details for ID ${id}:`, error);
          setError(`Failed to fetch TV details for ID ${id}`);
        }
      });

      try {
        await Promise.all(promises);
      } catch (error) {
        console.error('Error fetching TV details:', error);
      }
    };

    if (tvRecommendations.length > 0) {
      fetchTvDetails();
    }
  }, [tvRecommendations]);

  // Function to reduce items into groups of 5 for better layout
  const reduceItems = (acc, item, idx) => {
    const itemsPerGroup = window.innerWidth < 768 ? 2 : 4; // Example: Change 768 to your desired breakpoint
    const groupIndex = Math.floor(idx / itemsPerGroup);
    if (!acc[groupIndex]) {
      acc[groupIndex] = [];
    }
    acc[groupIndex].push(item);
    return acc;
  };

  if (loading) {
    return <p>Loading recommendations...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="recommendations-container"> {/* Add a container class for overall styling */}
      <h2 className="recommendation-heading">Recommendations</h2>

      {/* TV Shows Recommendations */}
      {currentUser ? (
        <>
          <h3 className="recommendation-subheading">TV Shows</h3>
          <Carousel className="recommendation-carousel">
            {tvRecommendations.reduce(reduceItems, []).map((group, index) => (
              <Carousel.Item key={index}>
                <div className="d-flex justify-content-center">
                  {group.map((item, idx) => {
                    const id = item.id;
                    const details = tvDetails[id] || {};
                    const recommendation = tvRecommendations.find(rec => rec.id === id);

                    return (
                      <Card key={idx} className="movie-card">
                        <Link to={`/tv/${id}`}>
                          <Card.Img
                            variant="top"
                            src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                          />
                          <div className="hover-details">
                            <h5>{details.title || details.name}</h5>
                            <p>{details.release_date || details.first_air_date}</p>
                            <p>{details.last_date || details.last_air_date}</p>
                            {recommendation && <p>Recommended</p>}
                          </div>
                        </Link>
                      </Card>
                    );
                  })}
                </div>
              </Carousel.Item>
            ))}
          </Carousel>

          {/* Movies Recommendations */}
          <h3 className="recommendation-subheading">Movies</h3>
          <Carousel className="recommendation-carousel">
            {movieRecommendations.reduce(reduceItems, []).map((group, index) => (
              <Carousel.Item key={index}>
                <div className="d-flex justify-content-center">
                  {group.map((item, idx) => {
                    const id = item.id;
                    const details = movieDetails[id] || {};
                    const recommendation = movieRecommendations.find(rec => rec.id === id);

                    return (
                      <Card key={idx} className="movie-card">
                        <Link to={`/movie/${id}`}>
                          <Card.Img
                            variant="top"
                            src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                          />
                          <div className="hover-details">
                            <h5>{details.title || details.name}</h5>
                            <p>{details.release_date || details.first_air_date}</p>
                            {recommendation && <p>Recommended</p>}
                          </div>
                        </Link>
                      </Card>
                    );
                  })}
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </>
      ) : (
        <p>Please log in to see recommendations.</p>
      )}
    </div>
  );
};

export default Recommendations;
