import React, { useRef, useState } from 'react';
import { Container, Nav, Navbar, Dropdown, Form, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const BasicExample = (props) => {
    const { currentUser, logIn, signUp, logOut } = useAuth();
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const emailRef = useRef();
    const passwordRef = useRef();

    const handleShowLoginModal = () => {
        setShowLogin(true);
        setShowSignup(false);
    };
    const handleShowSignupModal = () => {
        setShowSignup(true);
        setShowLogin(false);
    };
    const handleCloseModal = () => {
        setShowLogin(false);
        setShowSignup(false);
        setError('');
        setLoading(false);
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            await logIn(emailRef.current.value, passwordRef.current.value);
            handleCloseModal(); // Close the modal on successful login
        } catch {
            setError('Failed to log in');
        } finally {
            setLoading(false);
        }
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            await signUp(emailRef.current.value, passwordRef.current.value);
            handleCloseModal(); // Close the modal on successful sign up
        } catch {
            setError('Failed to create an account');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Navbar expand="lg" className={`bg-body-${props.mode} navbar-${props.mode} bg-${props.mode}`}>
            <Container>
                <Link to="/index" className="brand">
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
                        {/* <Link className='nav-link' to="/Contact">
                            <i className="fas fa-envelope"></i> Contact Us
                        </Link> */}
                        <Link className='nav-link' to="/Auth">
                            <i className="fas fa-envelope"></i> Recommended
                        </Link>
                        {/* <Dropdown alignRight> */}
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {currentUser ? <i className="fas fa-user"></i> : <i className="fas fa-sign-in-alt"></i>}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {currentUser ? (
                                    <>
                                        <Dropdown.Item as={Link} to="/user">
                                            Profile
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={logOut}>Logout</Dropdown.Item>
                                    </>
                                ) : (
                                    <>
                                        <Dropdown.Item onClick={handleShowLoginModal}>Login</Dropdown.Item>
                                        <Dropdown.Item onClick={handleShowSignupModal}>Signup</Dropdown.Item>
                                    </>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
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

            {/* Login Modal */}
            <Modal show={showLogin} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleLoginSubmit} className="auth-form">
                        <label>Email:</label>
                        <input type="email" ref={emailRef} required className="auth-input" placeholder="Email" />
                        <label>Password:</label>
                        <input type="password" ref={passwordRef} required className="auth-input" placeholder="Password" />
                        <Button type="submit" disabled={loading} className="auth-button">Log In</Button>
                    </form>
                    <p>Don't have an account? <Link to="/" className="modal-link" onClick={handleShowSignupModal}>Sign Up</Link></p>
                </Modal.Body>
            </Modal>

            {/* Signup Modal */}
            <Modal show={showSignup} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleSignupSubmit} className="auth-form">
                        <label>Email:</label>
                        <input type="email" ref={emailRef} required className="auth-input" placeholder="Email" />
                        <label>Password:</label>
                        <input type="password" ref={passwordRef} required className="auth-input" placeholder="Password" />
                        <Button type="submit" disabled={loading} className="auth-button">Sign Up</Button>
                    </form>
                    <p>Already have an account? <Link to="/" className="modal-link" onClick={handleShowLoginModal}>Log In</Link></p>
                </Modal.Body>
            </Modal>
        </Navbar>
    );
}

export default BasicExample;
