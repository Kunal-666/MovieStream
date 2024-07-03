import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
// import './all.css'; // Import the CSS file

function All() {
  const [HomeList, setHomeList] = useState([]);
  const [MpPList, setMpPList] = useState([]);
  const [MtrPList, setMtrPList] = useState([]);
  const [tvList, setTvList] = useState([]);
  const [tvPList, setTvPList] = useState([]);
  const [TtrPList, setTtrPList] = useState([]);
  const [genres, setGenres] = useState({});

  const fetchGenres = async () => {
    const responses = await Promise.all([
      fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=0d0f1379d0c8b95596f350605ec7f984').then(res => res.json()),
      fetch('https://api.themoviedb.org/3/genre/tv/list?api_key=0d0f1379d0c8b95596f350605ec7f984').then(res => res.json())
    ]);

    const allGenres = [...responses[0].genres, ...responses[1].genres];
    const genresMap = {};
    allGenres.forEach(genre => {
      genresMap[genre.id] = genre.name;
    });

    setGenres(genresMap);
  };

  useEffect(() => {
    fetchGenres();
    fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=0d0f1379d0c8b95596f350605ec7f984')
      .then(res => res.json())
      .then(json => setHomeList(json.results));
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=0d0f1379d0c8b95596f350605ec7f984')
      .then(res => res.json())
      .then(json => setMpPList(json.results));
    fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=0d0f1379d0c8b95596f350605ec7f984')
      .then(res => res.json())
      .then(json => setMtrPList(json.results));
    fetch('https://api.themoviedb.org/3/tv/top_rated?api_key=0d0f1379d0c8b95596f350605ec7f984')
      .then(res => res.json())
      .then(json => setTvList(json.results));
    fetch('https://api.themoviedb.org/3/tv/popular?api_key=0d0f1379d0c8b95596f350605ec7f984')
      .then(res => res.json())
      .then(json => setTvPList(json.results));
    fetch('https://api.themoviedb.org/3/trending/tv/day?api_key=0d0f1379d0c8b95596f350605ec7f984')
      .then(res => res.json())
      .then(json => setTtrPList(json.results));
  }, []);

  const getGenreNames = (genreIds) => genreIds.map(id => genres[id]).join(', ');

  const reduceRecipes = (acc, cur, index) => {
    const itemsPerGroup = window.innerWidth < 768 ? 2 : 4; // Example: Change 768 to your desired breakpoint
    const groupIndex = Math.floor(index / itemsPerGroup);

    if (!acc[groupIndex]) {
      acc[groupIndex] = [];
    }
    acc[groupIndex].push(cur);
    return acc;
  };

  const renderCarousel = (items, type) => (
    <Carousel>
      {items.reduce(reduceRecipes, []).map((group, index) => (
        <Carousel.Item key={index}>
          <div className="d-flex justify-content-center">
            {group.map((item, idx) => (
              <Card key={idx} className="movie-card">
                <Link to={`/${type}/${item.id}`}>
                  <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} />
                  <div className="hover-details">
                    <h5>{item.title || item.name}</h5>
                    <p>{getGenreNames(item.genre_ids)}</p>
                    <p>{item.release_date || item.first_air_date}</p>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );

  return (
    <div className="all-container">
      <Container>
        <h3 className="text-center my-4 section-title">Top Rated Movies</h3>
        {renderCarousel(HomeList, 'movie')}
      </Container>

      <Container>
        <h3 className="text-center my-4 section-title">Popular Movies</h3>
        {renderCarousel(MpPList, 'movie')}
      </Container>

      <Container>
        <h3 className="text-center my-4 section-title">Trending Movies</h3>
        {renderCarousel(MtrPList, 'movie')}
      </Container>

      <Container>
        <h3 className="text-center my-4 section-title">Popular on TV</h3>
        {renderCarousel(tvPList, 'tv')}
      </Container>

      <Container>
        <h3 className="text-center my-4 section-title">Top Rated on TV</h3>
        {renderCarousel(tvList, 'tv')}
      </Container>

      <Container>
        <h3 className="text-center my-4 section-title">Trending on TV</h3>
        {renderCarousel(TtrPList, 'tv')}
      </Container>
    </div>
  );
}

export default All;
