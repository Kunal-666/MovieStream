import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
                        Read Less
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

function SearchA() {

    const [SearchAList, setSearchAList] = useState([])
    const getSearch = () => {
        var query = document.getElementById('qr').value

        console.log('value is:', query);
        fetch(`https://api.themoviedb.org/3/search/tv?query=${query}&api_key=0d0f1379d0c8b95596f350605ec7f984`)
            .then(res => res.json())
            .then(json => setSearchAList(json.results))
    }
    useEffect(() => { getSearch() }, [])

    return (
        <>
            <Container>
                <Row>
                    <Col xs></Col>
                    <Col xs> </Col>
                    <Col xs>
                        <InputGroup  >
                            <Form.Control
                                id='qr'
                                placeholder="Search"
                                aria-label="Search"
                                aria-describedby="basic-addon2"
                            />
                            <Button variant="outline-secondary" id='search' onClick={getSearch}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </Button>
                        </InputGroup>
                    </Col>
                </Row>
            </Container>
            <div class="search-container">


            </div>

            <div class="cards">

                {SearchAList.map((Search) => (

                    <article className="card" key={Search.id}>
                        <img alt='poster' className='poster' src={`https://image.tmdb.org/t/p/w500${Search.poster_path}`} />
                        <div className="card-content">
                            <div className="content-title">
                                <h2>{Search.name}</h2>
                            </div>
                            <div className="content-info">
                                <p>First Air Date: {Search.first_air_date}</p>
                                <ReadMore text={Search.overview} maxWords={20} />
                            </div>
                        </div>
                        <footer className="card-footer">
                            <p>Rating: {Search.vote_average}</p>
                            <Link to={`/tv/${Search.id}`} className="watch-link">Watch</Link>
                        </footer>
                    </article>
                ))}
            </div>
        </>
    )
}

export default SearchA