import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import React from 'react';
import { Link } from 'react-router-dom';

function BasicExample(props) {
    return (
        <Navbar expand="lg" className={`bg-body-${props.mode} navbar-${props.mode} bg-${props.mode}`}>
            <Container>
                <Link to="/index" className="brand">
                    {/* <img src="/path/to/logo.png" alt="Logo" className="brand-logo" /> */}
                    <b className="lo">Movie<span className="st">Stream</span></b>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link className='nav-link' to="/">
                            <i className="fas fa-home"></i> Home
                        </Link>
                        <Link className='nav-link' to="/Movies">
                            <i className="fas fa-film"></i> Movies
                        </Link>
                        <Link className='nav-link' to="/Tv">
                            <i className="fas fa-tv"></i> TV
                        </Link>
                        <Link className='nav-link' to="/Anime">
                            <i className="fas fa-play"></i> Anime
                        </Link>
                        <Link className='nav-link' to="/India">
                            <i className="fas fa-globe"></i> India
                        </Link>
                        <Link className='nav-link' to="/About">
                            <i className="fas fa-info-circle"></i> About
                        </Link>
                        <Link className='nav-link' to="/Contact">
                            <i className="fas fa-envelope"></i> Contact Us
                        </Link>
                    </Nav>
                </Navbar.Collapse>
                <Form>
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label={props.mode === 'light' ? 'Dark Mode' : 'Light Mode'}
                        onClick={props.toggleMode}
                    />
                </Form>
            </Container>
        </Navbar>
    );
}

export default BasicExample;
