// CardDetails.js
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Popup from 'reactjs-popup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const CardDetails = () => {
    const { id } = useParams();
    console.log(id)

    const [movieList, setMovieList] = useState("")

    const getMovie = () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=0d0f1379d0c8b95596f350605ec7f984`)
            .then(res => res.json())
            .then(json => setMovieList(json))
    }
    useEffect(() => { getMovie() }, [])

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

                    <Col xs>
                        <Popup trigger=
                            {<a href="#">

                                <img id='poster' src={`https://image.tmdb.org/t/p/w500${movieList.poster_path}`} alt="cover" />
                            </a>}
                            modal nested>
                            {
                                close => (
                                    <div className='modal1'>
                                        <div className='conten1t'>
                                            <iframe ref={iframeRef} src={`https://vidsrc.me/embed/movie?tmdb=${id}`} width="100%" height="360" title="Video" allowFullScreen />
                                        </div>
                                        <div>
                                            <button onClick=
                                                {() => close()}>
                                                Close modal
                                            </button>
                                        </div>
                                    </div>
                                )
                            }
                        </Popup>
                        <h3>{movieList.title}</h3>


                    </Col>
                    <Col xs>
                        <p>{movieList.overview}</p>
                    </Col>

                </Row>

            </Container>
            {/* <div class="cards">


                <article class="card">

                    <>
                        <div class="content1 content">
                            <h2></h2>
                        </div>
                        <div class="column1">
                            {g.map((movie) => (
                                <span class="tag">{movie}</span>

                            ))}
                        </div>
                        <div class="content2 content">
                            <p >{movieList.tagline}</p>

                        </div>

                        <div class="content3 content">
                            <p>{movieList.overview}</p>

                        </div>
                        <footer>
                            <p >
                                {movieList.vote_count}
                            </p><br></br>
                        </footer>
                    </>

                </article>
            </div> */}

            {/* <div class="movie-card"> */}
            {/* <div class="container">

               
                <div class="hero" >
                    <div class="details">

                        <div class="title1">{movieList.title}<span>PG-13</span></div>

                        <div class="title2"></div>

                        <fieldset class="rating">
                            <input type="radio" id="star5" name="rating" value="5" /><label class="full" for="star5" title="Awesome - 5 stars"></label>
                            <input type="radio" id="star4half" name="rating" value="4 and a half" /><label class="half" for="star4half" title="Pretty good - 4.5 stars"></label>
                            <input type="radio" id="star4" name="rating" value="4" checked /><label class="full" for="star4" title="Pretty good - 4 stars"></label>
                            <input type="radio" id="star3half" name="rating" value="3 and a half" /><label class="half" for="star3half" title="Meh - 3.5 stars"></label>
                            <input type="radio" id="star3" name="rating" value="3" /><label class="full" for="star3" title="Meh - 3 stars"></label>
                            <input type="radio" id="star2half" name="rating" value="2 and a half" /><label class="half" for="star2half" title="Kinda bad - 2.5 stars"></label>
                            <input type="radio" id="star2" name="rating" value="2" /><label class="full" for="star2" title="Kinda bad - 2 stars"></label>
                            <input type="radio" id="star1half" name="rating" value="1 and a half" /><label class="half" for="star1half" title="Meh - 1.5 stars"></label>
                            <input type="radio" id="star1" name="rating" value="1" /><label class="full" for="star1" title="Sucks big time - 1 star"></label>
                            <input type="radio" id="starhalf" name="rating" value="half" /><label class="half" for="starhalf" title="Sucks big time - 0.5 stars"></label>
                        </fieldset>

                        <span class="likes"></span>

                    </div>
                </div>

                <div class="description">

                    


                    <div class="column2">

                        




                    </div>
                </div>


            </div> */}
            {/* </div> */}
        </div >
    );
};

export default CardDetails;
