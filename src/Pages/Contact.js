import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
function Contact() {

    return (
        <div>
            <Container>
                <h4 style={{ textAlign: 'center' }}>Contact</h4>
                <Row>
                    <Col xs>
                        <div className='location'>
                            <div class="contact-item">
                                <div class="icon">
                                    <i class="fas fa-map-marker-alt"></i>
                                    <span>Location</span>
                                </div>
                                <p>
                                </p>
                            </div>
                            <div class="contact-item">
                                <div class="icon">
                                    <i class="fas fa-envelope"></i>
                                    <span>Email</span>
                                </div>
                                <p>
                                </p>
                            </div>
                        </div>
                    </Col>
                    <Col xs>
                        <div className='location'>
                            <div class="contact-item">
                                <div class="icon">
                                    <i class="fas fa-user-graduate"></i>
                                    <span>Mobile Number</span>
                                </div>
                                <p>
                                </p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <div class="contact-container">

                <div class="contact-content-con">
                    <div class="left-contact">


                        <div class="contact-info">


                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Contact
