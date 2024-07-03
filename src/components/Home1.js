import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
// import './home1.css'; // Ensure you create and import this CSS file

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
            <select name="type" value={filters.type} onChange={handleChange}>
                <option value="movie">Movie</option>
                <option value="tv">TV Show</option>
            </select>
            <select name="genre" value={filters.genre} onChange={handleChange}>
                <option value="">All Genres</option>
                <option value="28">Action</option>
                <option value="35">Comedy</option>
                <option value="18">Drama</option>
                {/* Add more genres as needed */}
            </select>
            <select name="year" value={filters.year} onChange={handleChange}>
                <option value="">All Years</option>
                {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
            {/* <select name="language" value={filters.language} onChange={handleChange}>
                <option value="">All Languages</option>
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="es">Spanish</option>
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

function Home1() {
    const [list, setList] = useState([]);
    const [filters, setFilters] = useState({
        type: 'movie',
        genre: '',
        year: '',
        language: 'hi',
        sort: ''
    });

    const getItems = () => {
        const { type, genre, year, language, sort } = filters;
        const query = [
            genre && `with_genres=${genre}`,
            year && `primary_release_year=${year}`,
            language && `with_original_language=${language}`,
            sort && `sort_by=${sort}`
        ].filter(Boolean).join('&');

        fetch(`https://api.themoviedb.org/3/discover/${type}?api_key=0d0f1379d0c8b95596f350605ec7f984&${query}`)
            .then(res => res.json())
            .then(json => setList(json.results));
    };

    useEffect(() => {
        fetchGenres();
        getItems();
    }, [filters]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        getItems();
    };

    // const reduceRecipes = (acc, cur, index) => {
    //     const groupIndex = Math.floor(index / 4);
    //     if (!acc[groupIndex]) acc[groupIndex] = [];
    //     acc[groupIndex].push(cur);
    //     return acc;
    // };
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
            <h1 className="title">Indian Movies and TV Shows</h1>
            <FilterBar filters={filters} handleChange={handleChange} handleSubmit={handleSubmit} />
            <Container>
                <h3 style={{ textTransform: 'uppercase', textAlign: 'center' }} >{filters.type}</h3>

            </Container>
            <div className="cards">
                {list.map((item) => (
                    <Card key={item.id} className="movie-card">
                        <Link to={`/${filters.type}/${item.id}`}>
                            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} />
                            <div className="hover-details">
                                <h5>{item.title || item.name}</h5>
                                <p>{getGenreNames(item.genre_ids)}</p>
                                <p>{item.release_date || item.first_air_date}</p>
                            </div>
                        </Link>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default Home1;
