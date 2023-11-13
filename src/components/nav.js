import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import React from 'react';
function BasicExample(props) {

    return (
        <><Navbar expand="lg" className={`bg-body-${props.mode} navbar-${props.mode} bg-${props.mode}`}>
            <Container>
                <Navbar.Brand href="/index">MovieStream</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/index">Home</Nav.Link>
                        <Nav.Link href="/Movies">Movies</Nav.Link>
                        <Nav.Link href="/Tv">Tv</Nav.Link>
                        <Nav.Link href="/India">India</Nav.Link>
                        <Nav.Link href="/About">About</Nav.Link>
                        <Nav.Link href="/Contact">ContactUs</Nav.Link>


                    </Nav>
                </Navbar.Collapse >
                <Form >
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Check this switch"
                        onClick={props.toggleMode}

                    />
                </Form>
            </Container >

        </Navbar >

        </>


    );
}

export default BasicExample;