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
                    <button onClick={toggleReadMore}>
                        Read Less
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

function SearchA() {
    const [SearchAList, setSearchAList] = useState([])
    const getSearchA = () => {
        var query = document.getElementById('qr').value
        console.log('value is:', query);
        fetch(`https://api.themoviedb.org/3/search/tv?query=${query}&api_key=0d0f1379d0c8b95596f350605ec7f984`)
            .then(res => res.json())
            .then(json => setSearchAList(json.results))
    }
    useEffect(() => { getSearchA() }, [])

    console.log(SearchAList)

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
                            <Button variant="outline-secondary" id='search' onClick={SearchA}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </Button>
                        </InputGroup>
                    </Col>
                </Row>
            </Container>
            <div class="cards">

                {SearchAList.map((SearchA) => (

                    <article class="card">

                        <> <img id='poster' alt='poster' src={`https://image.tmdb.org/t/p/w500${SearchA.poster_path}`} />
                            <div class="content1 content">
                                <h2 key={SearchA.id}>{SearchA.original_title}</h2>
                            </div>
                            <div class="content2 content">
                                <p key={SearchA.id}>{SearchA.release_date}</p>

                            </div>

                            <div class="content3 content">
                                <ReadMore
                                    text={SearchA.overview} maxWords={20} />
                            </div>
                            <footer>
                                <p key={SearchA.id}>{SearchA.vote_average}</p>
                                <Link to={`/ac/${SearchA.id}`} key={SearchA.id}>
                                    watch
                                </Link><br></br>
                                <Link to={`/card/${SearchA.id}`} key={SearchA.id}>
                                    watch2
                                </Link>
                            </footer>
                        </>

                    </article>
                ))}
            </div></>
    )
}

export default SearchA
