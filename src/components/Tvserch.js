import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './index.css';

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
                    <button className="read-more-button" onClick={toggleReadMore}>
                        Read less
                    </button>
                </div>
            ) : (
                <div>
                    {truncatedText}
                    {remainingText && (
                        <button className="read-more-button" onClick={toggleReadMore}>
                            Read More
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

const FilterBar = ({ filters, handleChange, handleSubmit }) => {
    return (
        <form className="filter-bar" onSubmit={handleSubmit}>
            {/* <select name="type" value={filters.type} onChange={handleChange}>
                <option value="movie">Movie</option>
                <option value="tv">TV Show</option>
            </select> */}
            {/* <select name="genre" value={filters.genre} onChange={handleChange}>
                <option value="">All Genres</option>
                <option value="28">Action</option>
                <option value="35">Comedy</option>
                <option value="18">Drama</option>
            </select> */}
            <select name="year" value={filters.year} onChange={handleChange}>
                <option value="">All Years</option>
                {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
            {/* <select name="sort" value={filters.sort} onChange={handleChange}>
                <option value="">Sort By</option>
                <option value="popularity.desc">Most Popular</option>
                <option value="release_date.desc">Newest First</option>
                <option value="release_date.asc">Oldest First</option>
            </select> */}
            <button type="submit">Apply Filters</button>
        </form>
    );
};

function Sr() {
    const [searchList, setSearchList] = useState([]);
    const [filters, setFilters] = useState({
        type: 'tv',
        genre: '',
        year: '',
        sort: ''
    });
    const [query, setQuery] = useState('');

    const getSearch = (query) => {
        const genreFilter = filters.genre ? `&with_genres=${filters.genre}` : '';
        const yearFilter = filters.year ? `&year=${filters.year}` : '';
        const sortFilter = filters.sort ? `&sort_by=${filters.sort}` : '';

        fetch(`https://api.themoviedb.org/3/search/${filters.type}?query=${query}&api_key=0d0f1379d0c8b95596f350605ec7f984${genreFilter}${yearFilter}${sortFilter}`)
            .then(res => res.json())
            .then(json => setSearchList(json.results));
    };

    useEffect(() => {
        if (query.length > 2) {
            getSearch(query);
        } else {
            setSearchList([]);
        }
    }, [query, filters]);

    const handleChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const handleQueryChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        getSearch(query);
    };

    return (
        <div className="center-container">
            <Container className='home1'>
                {/* <Row>
                    <Col sm={12} md={12} lg={12} xl={12} xx={12}>
                        <h1 className="logo">Movie<span className="stream">Stream</span></h1>
                    </Col>
                </Row> */}
                <Row>
                    <Col xs={12}>
                        <div className="input-group">
                            <Form.Control
                                id='qr'
                                placeholder="Search"
                                aria-label="Search"
                                aria-describedby="basic-addon2"
                                value={query}
                                onChange={handleQueryChange}
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <FilterBar filters={filters} handleChange={handleChange} handleSubmit={handleSubmit} />
                    </Col>
                </Row>
            </Container>
            <div className="cards">
                {searchList.map((search) => (
                    <article className="card" key={search.id}>
                        <img alt='poster' className='poster' src={`https://image.tmdb.org/t/p/w500${search.poster_path}`} />
                        <div className="card-content">
                            <div className="content-title">
                                <h2>{search.original_title}</h2>
                            </div>
                            <div className="content-info">
                                <p>Release Date: {search.release_date}</p>
                                <ReadMore text={search.overview} maxWords={20} />
                            </div>
                        </div>
                        <footer className="card-footer">
                            <p>Rating: {search.vote_average}</p>
                            <Link to={`/tv/${search.id}`} className="watch-link">Watch</Link>
                        </footer>
                    </article>
                ))}
            </div>
        </div>
    );
}

export default Sr;
