import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

function Tes() {
    // Top rated movie
    const [HomeList, setHomeList] = useState([])
    const getHome = () => {
        fetch('http://www.omdbapi.com/?apikey=de2c29eb&s=movie&type=movie&r=json&plot=short&page=1')
            .then(res => res.json())
            .then(json => setHomeList(json.Search))
    }
    useEffect(() => { getHome() }, [])
    // console.log(HomeList)

    const reduceRecipes = (acc, cur, index) => {
        const groupIndex = Math.floor(index / 4);
        if (!acc[groupIndex]) acc[groupIndex] = [];
        acc[groupIndex].push(cur);
        console.log(acc);
        return acc;
    };
    return (
        <div>
            <Container>
                <h3>Top rated movies</h3>
                <Carousel>
                    {HomeList.reduce(reduceRecipes, []).map((item, index) => (
                        <Carousel.Item key={index}>
                            <div className="d-flex justify-content-center">
                                {item.map((item, index) => {
                                    return (
                                        <Card key={index} style={{ width: "18rem" }}>
                                            <Link to={`/card/${item.imdbID}`} >
                                                <Card.Img variant="top" src={item.Poster} />
                                            </Link>

                                        </Card>
                                    );
                                })}
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Container>
        </div>
    )
}

export default Tes
