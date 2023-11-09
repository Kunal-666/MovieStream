import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Sr from './Sr';


function All() {

  // Top rated movie
  const [HomeList, setHomeList] = useState([])
  const getHome = () => {
    fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=0d0f1379d0c8b95596f350605ec7f984')
      .then(res => res.json())
      .then(json => setHomeList(json.results))
  }
  useEffect(() => { getHome() }, [])
  console.log(HomeList)

  // Popular movies
  const [MpPList, setMpPList] = useState([])
  const getMp = () => {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=0d0f1379d0c8b95596f350605ec7f984')
      .then(res => res.json())
      .then(json => setMpPList(json.results))
  }
  useEffect(() => { getMp() }, [])
  console.log(MpPList)

  // Trending Movie
  const [MtrPList, setMtrPList] = useState([])
  const getMtr = () => {
    fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=0d0f1379d0c8b95596f350605ec7f984')
      .then(res => res.json())
      .then(json => setMtrPList(json.results))
  }
  useEffect(() => { getMtr() }, [])
  console.log(MtrPList)

  // top rated tv
  const [tvList, setTvList] = useState([])
  const gettv = () => {
    fetch('https://api.themoviedb.org/3/tv/top_rated?api_key=0d0f1379d0c8b95596f350605ec7f984')
      .then(res => res.json())
      .then(json => setTvList(json.results))
  }
  useEffect(() => { gettv() }, [])
  console.log(tvList)
  // Tv popular
  const [tvPList, setTvPList] = useState([])
  const getPtv = () => {
    fetch('https://api.themoviedb.org/3/tv/popular?api_key=0d0f1379d0c8b95596f350605ec7f984')
      .then(res => res.json())
      .then(json => setTvPList(json.results))
  }
  useEffect(() => { getPtv() }, [])
  console.log(tvPList)
  //Trendig on tv
  const [TtrPList, setTtrPList] = useState([])
  const getTtr = () => {
    fetch('https://api.themoviedb.org/3/trending/tv/day?api_key=0d0f1379d0c8b95596f350605ec7f984')
      .then(res => res.json())
      .then(json => setTtrPList(json.results))
  }
  useEffect(() => { getTtr() }, [])
  console.log(TtrPList)
  const reduceRecipes = (acc, cur, index) => {
    const groupIndex = Math.floor(index / 5);
    if (!acc[groupIndex]) acc[groupIndex] = [];
    acc[groupIndex].push(cur);
    console.log(acc);
    return acc;
  };
  return (
    <div>
      <Sr />
      <Container>
        <h3>Top rated movies1</h3>
        <Carousel>
          {HomeList.reduce(reduceRecipes, []).map((item, index) => (
            <Carousel.Item key={index}>
              <div className="d-flex justify-content-center">
                {item.map((item, index) => {
                  return (
                    <Card key={index} style={{ width: "18rem" }}>
                      <Link to={`/card/${item.id}`} >
                        <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} />
                      </Link>

                      <Card.Body>
                        <Card.Title>{item.title}</Card.Title>
                      </Card.Body>
                    </Card>
                  );
                })}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
      <Container>
        <h3>Popular movies</h3>
        <Carousel>
          {MpPList.reduce(reduceRecipes, []).map((item, index) => (
            <Carousel.Item key={index}>
              <div className="d-flex justify-content-center">
                {item.map((item, index) => {
                  return (
                    <Card key={index} style={{ width: "18rem" }}>
                      <Link to={`/card/${item.id}`} >
                        <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} />
                      </Link>

                      <Card.Body>
                        <Card.Title>{item.title}</Card.Title>
                      </Card.Body>
                    </Card>
                  );
                })}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
      <Container>
        <h3>Trending movies</h3>
        <Carousel>
          {MtrPList.reduce(reduceRecipes, []).map((item, index) => (
            <Carousel.Item key={index}>
              <div className="d-flex justify-content-center">
                {item.map((item, index) => {
                  return (
                    <Card key={index} style={{ width: "18rem" }}>
                      <Link to={`/card/${item.id}`} >
                        <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} />
                      </Link>

                      <Card.Body>
                        <Card.Title>{item.title}</Card.Title>
                      </Card.Body>
                    </Card>
                  );
                })}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
      <Container>
        <h3>Popular on tv</h3>
        <Carousel>
          {tvPList.reduce(reduceRecipes, []).map((item, index) => (
            <Carousel.Item key={index}>
              <div className="d-flex justify-content-center">
                {item.map((item, index) => {
                  return (
                    <Card key={index} style={{ width: "18rem" }}>
                      <Link to={`/ac/${item.id}`} >
                        <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} />
                      </Link>

                      <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                      </Card.Body>
                    </Card>
                  );
                })}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
      <Container>
        <h3>Top rated on tv</h3>
        <Carousel>
          {tvList.reduce(reduceRecipes, []).map((item, index) => (
            <Carousel.Item key={index}>
              <div className="d-flex justify-content-center">
                {item.map((item, index) => {
                  return (
                    <Card key={index} style={{ width: "18rem" }}>
                      <Link to={`/ac/${item.id}`} >
                        <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} />
                      </Link>

                      <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                      </Card.Body>
                    </Card>
                  );
                })}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
      <Container>
        <h3>Trending on tv</h3>
        <Carousel>
          {TtrPList.reduce(reduceRecipes, []).map((item, index) => (
            <Carousel.Item key={index}>
              <div className="d-flex justify-content-center">
                {item.map((item, index) => {
                  return (
                    <Card key={index} style={{ width: "18rem" }}>
                      <Link to={`/ac/${item.id}`} >
                        <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} />
                      </Link>

                      <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                      </Card.Body>
                    </Card>
                  );
                })}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </div>
  )
}

export default All
