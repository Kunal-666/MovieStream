import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
// import { NavLink } from "react-bootstrap";
import React from 'react';
import { Link } from 'react-router-dom';


function BasicExample(props) {
    return (
        <><Navbar expand="lg" className={`bg-body-${props.mode} navbar-${props.mode} bg-${props.mode}`}>
            <Container >
                <Navbar.Brand href="/">MovieStream</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link style={{ color: 'grey', margin: '5px', textDecoration: 'none' }} className='Link' to="/Movies">Movies</Link>
                        <Link style={{ color: 'grey', margin: '5px', textDecoration: 'none' }} className='Link' to="/Tv">Tv</Link>
                        <Link style={{ color: 'grey', margin: '5px', textDecoration: 'none' }} className='Link' to="/India">India</Link>
                        <Link style={{ color: 'grey', margin: '5px', textDecoration: 'none' }} className='Link' to="/About">About</Link>
                        <Link style={{ color: 'grey', margin: '5px', textDecoration: 'none' }} className='Link' to="/Contact">ContactUs</Link>
                        {/* <Link style={{ color: 'grey', margin: '5px', textDecoration: 'none' }} className='Link' to="/Tes">Test</Link> */}
                    </Nav>
                </Navbar.Collapse >
                <Form >
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label={props.mode}
                        onClick={props.toggleMode}
                    />
                </Form>
            </Container >
        </Navbar >
        </>
    );
}

export default BasicExample;