import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

const ReadMore = ({ text, maxWords }) => {
    const words = String(text).split(' ');
    const truncatedText = words.slice(0, maxWords).join(' ');
    const remainingText = words.slice(maxWords).join(' ');
    const [showMore, setShowMore] = useState(false);

    const toggleReadMore = () => {
        setShowMore(!showMore);
    };

    return (
        <div className="read-more">
            {showMore ? (
                <div>
                    {truncatedText} {remainingText}
                    <button onClick={toggleReadMore}>
                        Read less
                    </button>
                </div>
            ) : (
                <div>
                    {truncatedText}
                    {remainingText && (
                        <button onClick={toggleReadMore}>
                            Read More
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

function Home1() {

    const [HomeList, setHomeList] = useState([])

    const getHome = () => {
        fetch('https://api.themoviedb.org/3/discover/movie/?api_key=0d0f1379d0c8b95596f350605ec7f984&sort_by=popularity.desc&with_original_language=hi|kn|ml|ta|te')
            .then(res => res.json())
            .then(json => setHomeList(json.results))
    }
    useEffect(() => { getHome() }, [])

    console.log(HomeList)
    //Trendig on tv
    const [TtrPList, setTtrPList] = useState([])
    const getTtr = () => {
        fetch('https://api.themoviedb.org/3/discover/tv?api_key=0d0f1379d0c8b95596f350605ec7f984&sort_by=primary_release_date.desc&with_original_language=hi|')
            // fetch('https://api.themoviedb.org/3/discover/tv/?api_key=0d0f1379d0c8b95596f350605ec7f984&sort_by=popularity.desc&with_original_language=hi|kn|ml|ta|te')
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
        <><Container>
            <h3>Top rated movies</h3>
            <Carousel>
                {HomeList.reduce(reduceRecipes, []).map((item, index) => (
                    <Carousel.Item key={index}>
                        <div className="d-flex justify-content-center">
                            {item.map((item, index) => {
                                return (
                                    <Card key={index} style={{ width: "18rem" }}>
                                        <Link to={`/card/${item.id}`}>
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
                <h3>Top rated movies</h3>
                <Carousel>
                    {TtrPList.reduce(reduceRecipes, []).map((item, index) => (
                        <Carousel.Item key={index}>
                            <div className="d-flex justify-content-center">
                                {item.map((item, index) => {
                                    return (
                                        <Card key={index} style={{ width: "18rem" }}>
                                            <Link to={`/ac/${item.id}`}>
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
            <><h1>Trending</h1><div class="cards">

                {HomeList.map((Home) => (

                    <article class="card">

                        <>
                            <img id='poster' src={`https://image.tmdb.org/t/p/w500${Home.poster_path}`} />
                            <div class="content1 content">
                                <h2 key={Home.id}>{Home.original_title}</h2>
                            </div>
                            <div class="content2 content">
                                <p key={Home.id}>{Home.release_date}</p>

                            </div>

                            <div class="content3 content">
                                <ReadMore
                                    text={Home.overview} maxWords={20} />
                            </div>
                            <footer>
                                <p key={Home.id}>{Home.vote_average}</p>
                                <Link to={`/ac/${Home.id}`} key={Home.id}>
                                    watch
                                </Link>
                                <br></br>
                                <Link to={`/card/${Home.id}`} key={Home.id}>
                                    watch2
                                </Link>
                            </footer>
                        </>

                    </article>
                ))}
            </div></></>
    )
}

export default Home1
