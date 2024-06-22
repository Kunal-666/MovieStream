import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

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
                    <button onClick={toggleReadMore}>
                        Read less
                    </button>
                </div>
            ) : (
                <div>
                    {truncatedText}
                    {remainingText && (
                        <button onClick={toggleReadMore}>
                            Read More
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

function Movie() {

    const [movieList, setMovieList] = useState([])

    const getMovie = () => {
        fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=0d0f1379d0c8b95596f350605ec7f984')
            .then(res => res.json())
            .then(json => setMovieList(json.results))
    }
    useEffect(() => { getMovie() }, [])

    console.log(movieList)


    return (
        <><h1> Most Popular Movies</h1>
            <div className="cards">

                {movieList.map((movie) => (

                    <article className="card">

                        <>
                            <img alt='poster' id='poster' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                            <div>
                                <div className="content1 content">
                                    <h2 key={movie.id}>{movie.original_title}</h2>
                                </div>
                                <div className="content2 content">
                                    <p key={movie.id}>{movie.release_date}</p>

                                </div>

                                <div className="content3 content">
                                    <ReadMore
                                        text={movie.overview} maxWords={20} />
                                </div>
                            </div>
                            <footer>
                                <p key={movie.id}>{movie.vote_average}</p>
                                <Link to={`/card/${movie.id}`} key={movie.id}>
                                    watch
                                </Link>
                            </footer>
                        </>

                    </article>
                ))}
            </div ></>
    )
}

export default Movie
