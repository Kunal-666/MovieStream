import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import './movie.css';
import Card from 'react-bootstrap/Card';

// const ReadMore = ({ text, maxWords }) => {
//     const words = String(text).split(' ');
//     const truncatedText = words.slice(0, maxWords).join(' ');
//     const remainingText = words.slice(maxWords).join(' ');
//     const [showMore, setShowMore] = useState(false);

//     const toggleReadMore = () => {
//         setShowMore(!showMore);
//     };

//     return (
//         <div className="read-more">
//             {showMore ? (
//                 <div>
//                     {truncatedText} {remainingText}
//                     <button className="read-more-button" onClick={toggleReadMore}>
//                         Read less
//                     </button>
//                 </div>
//             ) : (
//                 <div>
//                     {truncatedText}
//                     {remainingText && (
//                         <button className="read-more-button" onClick={toggleReadMore}>
//                             Read More
//                         </button>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

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
        fetchGenres();
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
    const [genres, setGenres] = useState({});

    const fetchGenres = async () => {
        const responses = await Promise.all([
            fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=0d0f1379d0c8b95596f350605ec7f984').then(res => res.json()),
            fetch('https://api.themoviedb.org/3/genre/tv/list?api_key=0d0f1379d0c8b95596f350605ec7f984').then(res => res.json())
        ]);

        const allGenres = [...responses[0].genres, ...responses[1].genres];
        const genresMap = {};
        allGenres.forEach(genre => {
            genresMap[genre.id] = genre.name;
        });

        setGenres(genresMap);
    };
    const getGenreNames = (genreIds) => genreIds.map(id => genres[id]).join(', ');



    return (
        <div>
            <h1 className="title">Most Popular Movies</h1>
            <FilterBar filters={filters} handleChange={handleChange} handleSubmit={handleSubmit} />
            <div className="cards">
                {movieList.map((movie) => (
                    <Card key={movie.id} className="movie-card">
                        <Link to={`/movie/${movie.id}`}>
                            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                            <div className="hover-details">
                                <h5>{movie.title || movie.name}</h5>
                                <p>{getGenreNames(movie.genre_ids)}</p>
                                <p>{movie.release_date || movie.first_air_date}</p>
                            </div>
                        </Link>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default Movie;
