import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import React from 'react';
function BasicExample() {

    return (
        <><Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/index">MovieStream</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/index">Home</Nav.Link>
                        <Nav.Link href="/Movies">Movies</Nav.Link>
                        <Nav.Link href="/Tv">Tv</Nav.Link>
                        <Nav.Link href="/India">India</Nav.Link>
                        <Nav.Link href="/Anime">Anime</Nav.Link>
                        <Nav.Link href="/About">About</Nav.Link>
                        <Nav.Link href="/Contact">ContactUs</Nav.Link>
                    </Nav>
                </Navbar.Collapse>

            </Container>

        </Navbar>

        </>


    );
}

export default BasicExample;