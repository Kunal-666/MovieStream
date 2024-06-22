import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import './tv.css';

const CardDetails1 = () => {
    const { id } = useParams();

    const [Season, setSeason] = useState(localStorage.getItem('seas') || '');
    const [Episode, setEpisode] = useState(localStorage.getItem('epis') || '');
    const [movieList, setMovieList] = useState(null);
    const [EpisodeList, setEpisodeList] = useState(null);

    const apiKey = '0d0f1379d0c8b95596f350605ec7f984'; // Replace with your TMDB API key

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`)
            .then(res => res.json())
            .then(json => setMovieList(json));
    }, [id, apiKey]);

    useEffect(() => {
        if (Season) {
            fetch(`https://api.themoviedb.org/3/tv/${id}/season/${Season}?api_key=${apiKey}&language=en-US`)
                .then(res => res.json())
                .then(json => setEpisodeList(json));
        }
    }, [id, Season, apiKey]);

    const handleSeasonChange = (event) => {
        const newSeason = event.target.value;
        setSeason(newSeason);
        localStorage.setItem('seas', newSeason);
        setEpisode(''); // Reset episode selection when season changes
        setEpisodeList(null); // Clear episode list when season changes
    };

    const handleEpisodeChange = (event) => {
        const newEpisode = event.target.value;
        setEpisode(newEpisode);
        localStorage.setItem('epis', newEpisode);
    };

    const episodeOptions = EpisodeList?.episodes ? EpisodeList.episodes.map((ep) => (
        <option key={ep.episode_number} value={ep.episode_number}>{ep.episode_number}</option>
    )) : [];

    const seasonOptions = [];
    for (let i = 1; i <= (movieList?.number_of_seasons || 1); i++) {
        seasonOptions.push(<option key={i} value={i}>{i}</option>);
    }

    return (
        <Container className="mt-4">
            {movieList ? (
                <>
                    <Row className="mb-4">
                        <Col>
                            <h3 className="text-center text-primary">{movieList.name}</h3>
                            <div className="video-wrapper mb-4">
                                <iframe
                                    src={`https://vidsrc.to/embed/tv/${id}/${Season}/${Episode}`}
                                    width="100%"
                                    height="360"
                                    title="Video"
                                    allowFullScreen
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row className="mb-4 align-items-end">
                        <Col md={5}>
                            <Form.Group controlId="seasonSelect">
                                <Form.Label className="font-weight-bold">Choose a Season:</Form.Label>
                                <Form.Control as="select" value={Season} onChange={handleSeasonChange}>
                                    <option value="">Select a Season</option>
                                    {seasonOptions}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={5}>
                            <Form.Group controlId="episodeSelect">
                                <Form.Label className="font-weight-bold">Choose an Episode:</Form.Label>
                                <Form.Control as="select" value={Episode} onChange={handleEpisodeChange} disabled={!EpisodeList}>
                                    <option value="">Select an Episode</option>
                                    {episodeOptions}
                                </Form.Control>
                            </Form.Group>
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
                                    <Card.Title>Tagline</Card.Title>
                                    <Card.Text>{movieList.tagline}</Card.Text>
                                    <Card.Title>Total Seasons</Card.Title>
                                    <Card.Text>{movieList.number_of_seasons}</Card.Text>
                                    <Card.Title>Total Episodes in Season {Season}</Card.Title>
                                    <Card.Text>{EpisodeList?.episodes ? EpisodeList.episodes.length : 0}</Card.Text>
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
    );
};

export default CardDetails1;
