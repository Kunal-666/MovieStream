// CardDetails.js
import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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


    const iframeRef = useRef(null);


    return (
        <div>
            <Container>
                <Row>
                    <h3>{movieList.title}</h3>
                    <p>
                        {movieList.release_date}
                    </p>
                    <iframe ref={iframeRef} src={`https://vidsrc.me/embed/movie?tmdb=${id}`} width="100%" height="360" title="Video" allowFullScreen />

                    <Col xs>
                        <Row>
                            <h3>
                                Genres
                            </h3>
                            <div className="column32">

                                {g.map((movie) => (
                                    <span className="tag1">{movie + ', '}</span>

                                ))}
                            </div>
                            <h3>
                                Tagline
                            </h3>
                            <p style={{ textAlign: 'justify' }}>{movieList.tagline}</p>
                            <h3>
                                Runtime
                            </h3>
                            <p>{movieList.runtime + " min"}</p>
                        </Row>
                    </Col>
                    <Col xs>
                        <Row>

                            <h3>
                                Budget
                            </h3>
                            <p>{movieList.budget + "$"}</p>
                            <h3>
                                Revenue
                            </h3>
                            <p>{movieList.revenue + "$"}</p>

                        </Row>

                    </Col>
                    <Col xs>
                        <Row>
                            <h3>
                                Overview
                            </h3>
                            <p style={{ textAlign: 'justify' }}>{movieList.overview}</p>
                        </Row>
                    </Col>
                </Row><Row>
                </Row>
            </Container >
        </div >
    );
};

export default CardDetails;
