import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import './movie.css';

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
            <select name="genre" value={filters.genre} onChange={handleChange}>
                <option value="">All Genres</option>
                <option value="28">Action</option>
                <option value="12">Adventure</option>
                <option value="16">Animation</option>
                <option value="35">Comedy</option>
                <option value="80">Crime</option>
                <option value="99">Documentary</option>
                <option value="18">Drama</option>
                <option value="10751">Family</option>
                <option value="14">Fantasy</option>
                <option value="36">History</option>
                <option value="27">Horror</option>
                <option value="10402">Music</option>
                <option value="9648">Mystery</option>
                <option value="10749">Romance</option>
                <option value="878">Science Fiction</option>
                <option value="10770">TV Movie</option>
                <option value="53">Thriller</option>
                <option value="10752">War</option>
                <option value="37">Western</option>
                <option value="16">Anime</option>
                {/* Add more genres as needed */}
            </select>
            <select name="year" value={filters.year} onChange={handleChange}>
                <option value="">All Years</option>
                {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
            <select name="language" value={filters.language} onChange={handleChange}>
                <option value="">All Languages</option>
                <option value="hi">Hindi</option>
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                {/* Add more languages as needed */}
            </select>
            {/* <select name="country" value={filters.country} onChange={handleChange}>
                <option value="">All Countries</option>
                <option value="US">United States</option>
                <option value="IN">India</option>
                <option value="FR">France</option>
            </select> */}
            <select name="sort" value={filters.sort} onChange={handleChange}>
                <option value="">Sort By</option>
                <option value="popularity.desc">Most Popular</option>
                <option value="release_date.desc">Newest First</option>
                <option value="release_date.asc">Oldest First</option>
            </select>
            <button type="submit">Apply Filters</button>
        </form>
    );
};

function Movie() {
    const [movieList, setMovieList] = useState([]);
    const [filters, setFilters] = useState({
        genre: '',
        year: '',
        language: '',
        country: '',
        sort: ''
    });

    const getMovies = () => {
        const { genre, year, language, country, sort } = filters;
        const query = [
            genre && `with_genres=${genre}`,
            year && `primary_release_year=${year}`,
            language && `with_original_language=${language}`,
            country && `region=${country}`,
            sort && `sort_by=${sort}`
        ].filter(Boolean).join('&');

        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=0d0f1379d0c8b95596f350605ec7f984&${query}`)
            .then(res => res.json())
            .then(json => setMovieList(json.results));
    };

    useEffect(() => {
        getMovies();
    }, [filters]);

    function handleChange(e) {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        getMovies();
    };

    return (
        <div>
            <h1 className="title">Most Popular Movies</h1>
            <FilterBar filters={filters} handleChange={handleChange} handleSubmit={handleSubmit} />
            <div className="cards">
                {movieList.map((movie) => (
                    <article className="card" key={movie.id}>
                        <img alt='poster' className='poster' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                        <div className="card-content">
                            <div className="content-title">
                                <h2>{movie.original_title}</h2>
                            </div>
                            <div className="content-info">
                                <p>Release Date: {movie.release_date}</p>
                                <ReadMore text={movie.overview} maxWords={20} />
                            </div>
                        </div>
                        <footer className="card-footer">
                            <p>Rating: {movie.vote_average}</p>
                            <Link to={`/movie/${movie.id}`} className="watch-link">Watch</Link>
                        </footer>
                    </article>
                ))}
            </div>
        </div>
    );
}

export default Movie;
