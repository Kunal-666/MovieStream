// CardDetails.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import './tv.css';

const CardDetails = () => {
    const { id } = useParams();
    console.log(id)

    const [movieList, setMovieList] = useState("")

    const getMovie = () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=0d0f1379d0c8b95596f350605ec7f984`)
            .then(res => res.json())
            .then(json => setMovieList(json))
    }
    getMovie();

    console.log(movieList)
    const t = movieList.title
    console.log(t)

    const g = [];

    if (movieList.genres && Array.isArray(movieList.genres)) {
        for (let i = 0; i < movieList.genres.length; i++) {
            let a = movieList.genres[i].name;
            g.push(a);
        }
    } else {
        console.log("movieList.genres is undefined or not an array.");
    }


    // const iframeRef = useRef(null);


    return (
        <div>
            <Container className="mt-4">
                {movieList ? (
                    <>
                        <Row className="mb-4">
                            <Col>
                                <h3 className="text-center text-primary">{movieList.title}</h3>
                                <div className="video-wrapper mb-4">
                                    <iframe
                                        src={`https://vidsrc.me/embed/movie?tmdb=${id}`}
                                        width="100%"
                                        height="360"
                                        title="Video"
                                        allowFullScreen
                                    />
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={4}>
                                <Card className="shadow-sm mb-4">
                                    <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${movieList.poster_path}`} alt='poster' />
                                    <Card.Body>
                                        <Card.Title>Genres</Card.Title>
                                        <Card.Text>{movieList.genres && movieList.genres.map(g => g.name).join(', ')}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={8}>
                                <Card className="shadow-sm mb-4">
                                    <Card.Body>
                                        <Row>
                                            <Col md={6}>
                                                <Card.Title>Tagline</Card.Title>
                                                <Card.Text>{movieList.tagline}</Card.Text>
                                                <Card.Title>Released Date</Card.Title>
                                                <Card.Text>{movieList.release_date}</Card.Text>
                                                <Card.Title>Length</Card.Title>
                                                <Card.Text>{movieList.runtime + " min"}</Card.Text>
                                            </Col>
                                            <Col md={6}>
                                                <Card.Title>Budget</Card.Title>
                                                <Card.Text>{movieList.budget + "$"}</Card.Text>
                                                <Card.Title>Revenue</Card.Title>
                                                <Card.Text>{movieList.revenue + "$"}</Card.Text>
                                            </Col>
                                        </Row>


                                    </Card.Body>
                                </Card>

                                <Card className="shadow-sm">
                                    <Card.Body>
                                        <Card.Title>Overview</Card.Title>
                                        <Card.Text>{movieList.overview}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </>
                ) : (
                    <Row className="justify-content-center">
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </Row>
                )}
            </Container>

        </div >
    );
};

export default CardDetails;
