import React from 'react';

function About() {
    return (

        <div>

            <div className="about-section">
                <div className='row'>
                    <div >
                        <h1 className="logo1">Movie<span className="stream1">Stream</span></h1>
                    </div>
                </div>
                <h2>About</h2>
                <p>MovieStream is your go-to platform for discovering movies and TV shows from around the world. Our goal is to provide an easy-to-use interface where users can search for their favorite movies, explore new genres, and stay updated with the latest releases.</p>
            </div>
            <div className="features-section">
                <h2>Features</h2>
                <ul>
                    <li><strong>Dynamic Search:</strong> Find movies and TV shows quickly with our dynamic search feature that provides results as you type.</li>
                    <li><strong>Filter Options:</strong> Customize your search with filters for genre, year, and sorting options to find exactly what you're looking for.</li>
                    <li><strong>Detailed Information:</strong> Get detailed information about each movie or TV show, including release date, overview, and ratings.</li>
                    <li><strong>Read More:</strong> Enjoy a snippet of the movie overview with an option to read more if you are interested.</li>
                    <li><strong>Watch Links:</strong> Navigate to the watch page of each movie or TV show directly from our platform.</li>
                </ul>
            </div>
            <div className="team-section">
                <h2>Our Team</h2>
                <p>MovieStream is developed by a passionate team of movie enthusiasts and developers who are dedicated to providing the best user experience. We constantly work on improving the platform and adding new features to meet our users' needs.</p>
            </div>
            <div className="contact-section">
                <h2>Contact Us</h2>
                <p>If you have any questions, feedback, or suggestions, feel free to reach out to us at <a href="mailto:support@moviestream.com">support@moviestream.com</a>. We would love to hear from you!</p>
            </div>
        </div>
    );
}

export default About;
