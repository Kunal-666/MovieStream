// CardDetails.js
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Popup from 'reactjs-popup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const CardDetails1 = () => {
    const { id } = useParams();
    console.log(id)

    const [movieList, setMovieList] = useState("")

    const getMovie = () => {
        fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=0d0f1379d0c8b95596f350605ec7f984`)
            .then(res => res.json())
            .then(json => setMovieList(json))
    }
    getMovie();

    console.log(movieList)
    const t = movieList.imdb_id
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

    const handleFullScreenClick = () => {
        const iframe = iframeRef.current;

        if (iframe) {
            if (iframe.requestFullscreen) {
                iframe.requestFullscreen();
            } else if (iframe.mozRequestFullScreen) {
                iframe.mozRequestFullScreen();
            } else if (iframe.webkitRequestFullscreen) {
                iframe.webkitRequestFullscreen();
            }
        }
    }

    return (
        <div>
            <Container>
                <Row>
                    <h3>{movieList.name}</h3>

                    <Col xs>
                        <Row>
                            <Popup trigger={
                                <img id='poster' src={`https://image.tmdb.org/t/p/w500${movieList.poster_path}`} alt="cover" />
                            }
                                modal nested>
                                {
                                    close => (
                                        <div className='modal1'>
                                            <div className='conten1t'>
                                                <iframe ref={iframeRef} src={`https://vidsrc.to/embed/tv/${id}`} width="100%" height="360" title="Video" allowFullScreen />
                                            </div>
                                            <div>
                                                <button onClick={() => close()}>
                                                    Close modal
                                                </button>
                                            </div>
                                        </div>
                                    )}
                            </Popup>
                        </Row>
                    </Col>
                    <Col xs>
                        <Row>
                            <h3>
                                Genres
                            </h3>
                            <div class="column32">

                                {g.map((movie) => (
                                    <span class="tag1">{movie + ', '}</span>

                                ))}
                            </div>
                            <h3>
                                Tagline
                            </h3>
                            <p style={{ textAlign: 'justify' }}>{movieList.tagline}</p>
                            <h3>
                                Total Seasons
                            </h3>
                            <p>{movieList.number_of_seasons}</p>
                            <h3>
                                Total Episodes
                            </h3>
                            <p>{movieList.number_of_episodes}</p>


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

export default CardDetails1;
