import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

function Anime() {

    const [HomeList, setHomeList] = useState([])

    const getHome = () => {
        fetch('https://api.jikan.moe/v4/top/anime')
            .then(res => res.json())
            .then(json => setHomeList(json.data))
    }
    useEffect(() => { getHome() }, [])
    // console.log(HomeList)



    // async function logMovies() {
    //     const response = await fetch('https://api.jikan.moe/v4/top/anime')
    //     const data1 = await response.json();
    //     const data = data1.data
    //     console.log(data);
    // }

    // logMovies()


    const reduceRecipes = (acc, cur, index) => {
        const groupIndex = Math.floor(index / 5);
        if (!acc[groupIndex]) acc[groupIndex] = [];
        acc[groupIndex].push(cur);
        console.log(acc);
        return acc;
    };
    return (
        <div>
            <h1>Anime</h1>
            <p>This is a page about anime.</p>
            <Container>
                <h3>Top rated movies</h3>
                <Carousel>
                    {HomeList.reduce(reduceRecipes, []).map((item, index) => (
                        <Carousel.Item key={index}>
                            <div className="d-flex justify-content-center">
                                {item.map((item, index) => {
                                    return (
                                        <Card key={index} style={{ width: "18rem" }}>
                                            <Link to={`/ac/${item.mal_id}`}>
                                                <Card.Img variant="top" src={item.images.jpg.image_url} />
                                            </Link>

                                            <Card.Body>
                                                <Card.Title>{item.title}</Card.Title>
                                            </Card.Body>
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

export default Anime
