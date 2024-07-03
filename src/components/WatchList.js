import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { firestore } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Carousel, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const WatchList = () => {
  const { currentUser } = useAuth();
  const [watchList, setWatchList] = useState([]);
  const [movieDetails, setMovieDetails] = useState({});
  const apiKey = '0d0f1379d0c8b95596f350605ec7f984'; // Replace with your TMDB API key

  useEffect(() => {
    const fetchWatchList = async () => {
      if (currentUser) {
        try {
          const userDocRef = doc(firestore, 'users', currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const watchListData = userDocSnap.data().watchList || [];
            setWatchList(watchListData);
            fetchMovieDetails(watchListData);
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Firestore Error:', error);
        }
      }
    };

    const fetchMovieDetails = async (watchList) => {
      const details = {};
      for (const item of watchList) {
        try {
          const id = item.id; // Access the nested id
          const type = item.type;
          const res = await fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}&language=en-US`);
          const json = await res.json();
          details[id] = json;
        } catch (error) {
          console.error('TMDB API Error:', error);
        }
      }
      setMovieDetails(details);
    };

    fetchWatchList();
  }, [currentUser]);

  const reduceItems = (acc, item, idx) => {
    const itemsPerGroup = window.innerWidth < 768 ? 2 : 3; // Example: Change 768 to your desired breakpoint
    const groupIndex = Math.floor(idx / itemsPerGroup);
    if (!acc[groupIndex]) {
      acc[groupIndex] = [];
    }
    acc[groupIndex].push(item);
    return acc;
  };

  const tvShows = watchList.filter(item => item.type === 'tv');
  const movies = watchList.filter(item => item.type === 'movie');

  return (
    <div className="watchlist-container">
      <h2 className="watchlist-heading">Watch List</h2>
      <h3 className="watchlist-subheading">TV Shows</h3>
      <Carousel className="watchlist-carousel">
        {tvShows.reduce(reduceItems, []).map((group, index) => (
          <Carousel.Item key={index}>
            <div className="d-flex justify-content-center">
              {group.map((item, idx) => {
                const id = item.id; // Access the nested id
                const details = movieDetails[id] || {};
                return (
                  <Card key={idx} className="movie-card">
                    <Link to={`/${item.type}/${id}`}>
                      <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${details.poster_path}`} />
                      <div className="hover-details">
                        <h5>{details.title || details.name}</h5>
                        <p>{details.release_date || details.first_air_date}</p>
                      </div>
                    </Link>
                  </Card>
                );
              })}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
      <h3 className="watchlist-subheading">Movies</h3>
      <Carousel className="watchlist-carousel">
        {movies.reduce(reduceItems, []).map((group, index) => (
          <Carousel.Item key={index}>
            <div className="d-flex justify-content-center">
              {group.map((item, idx) => {
                const id = item.id; // Access the nested id
                const details = movieDetails[id] || {};
                return (
                  <Card key={idx} className="movie-card">
                    <Link to={`/${item.type}/${id}`}>
                      <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${details.poster_path}`} />
                      <div className="hover-details">
                        <h5>{details.title || details.name}</h5>
                        <p>{details.release_date || details.first_air_date}</p>
                      </div>
                    </Link>
                  </Card>
                );
              })}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default WatchList;
