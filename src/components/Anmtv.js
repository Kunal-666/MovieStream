// CardDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CardDetails1 = () => {
    const { id } = useParams();

    const [Season, setSeason] = useState(localStorage.getItem('seas') || '');
    const [Episode, setEpisode] = useState(localStorage.getItem('epis') || '');
    const [movieList, setMovieList] = useState({});
    const [EpisodeList, setEpisodeList] = useState({});
    const [selectedSeason, setSelectedSeason] = useState(Season);
    const [selectedEpisode, setSelectedEpisode] = useState(Episode);

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
    };

    const handleEpisodeChange = (event) => {
        const newEpisode = event.target.value;
        setEpisode(newEpisode);
        localStorage.setItem('epis', newEpisode);
    };

    const handleSubmit = () => {
        setSelectedSeason(Season);
        setSelectedEpisode(Episode);
    };

    const episodeOptions = EpisodeList.episodes ? EpisodeList.episodes.map((ep) => (
        <option key={ep.episode_number} value={ep.episode_number}>{ep.episode_number}</option>
    )) : [];

    const seasonOptions = [];
    for (let i = 1; i <= (movieList.number_of_seasons || 1); i++) {
        seasonOptions.push(<option key={i} value={i}>{i}</option>);
    }

    return (
        <Container>
            <Row>
                <h3>{movieList.name}</h3>
                <iframe
                    src={`https://vidsrc.to/embed/tv/${id}/${selectedSeason}/${selectedEpisode}`}
                    style={{ padding: 10 }}
                    width="100%"
                    height="360"
                    title="Video"
                    allowFullScreen
                />
            </Row>
            <br />
            <Row>
                <Col>
                    <label htmlFor="season">Choose a Season:</label>
                    <select id='s' value={Season} onChange={handleSeasonChange}>
                        <option value="">Select a Season</option>
                        {seasonOptions}
                    </select>
                </Col>
                <Col>
                    <label htmlFor="episode">Choose an Episode:</label>
                    <select id='e' value={Episode} onChange={handleEpisodeChange}>
                        <option value="">Select an Episode</option>
                        {episodeOptions}
                    </select>
                </Col>
                <Col>
                    <button onClick={handleSubmit}>Submit</button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Row>
                        <Col>
                            <img alt='poster' style={{ width: 200, height: 300 }} src={`https://image.tmdb.org/t/p/w500${movieList.poster_path}`} />
                        </Col>
                        <Col>
                            <h3>Genres</h3>
                            <div>{movieList.genres && movieList.genres.map(g => g.name).join(', ')}</div>
                            <h3>Tagline</h3>
                            <p>{movieList.tagline}</p>
                        </Col>
                        <Col>
                            <h3>Total Seasons</h3>
                            <p>{movieList.number_of_seasons}</p>
                            <h3>Total Episodes in Season {selectedSeason}</h3>
                            <p>{EpisodeList.episodes ? EpisodeList.episodes.length : 0}</p>
                        </Col>
                    </Row>
                    <Row>
                        <h3>Overview</h3>
                        <p>{movieList.overview}</p>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default CardDetails1;
