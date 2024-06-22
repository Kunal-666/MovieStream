import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import About from './Pages/About';
import BasicExample from './components/nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Pages/Home';
import Tv from './Pages/Tv';
import CardDetails from './components/CardDetails';
import CardDetails1 from './components/Anmtv';
import Movies from './Pages/Movies';
import Contact from './Pages/Contact';
import India from './Pages/India';
import { useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import Anime from "./Pages/Anime";
function App() {
  const [mode, setmode] = useState('light')
  const toggleMode = () => {
    if (mode === 'light') {
      setmode('dark');
      document.body.style.backgroundColor = '#000'
      document.body.style.color = "#fff"
      var r = document.querySelector(':root');
      r.style.setProperty('--blue', 'black');
      r.style.setProperty('--text', 'white');
    }
    else {
      setmode('light');
      document.body.style.backgroundColor = '#fff'
      document.body.style.color = "#000"
      var t = document.querySelector(':root');
      t.style.setProperty('--blue', 'white');
      t.style.setProperty('--text', 'black');
    }
  }
  return (
    <><div className="App">
      <BrowserRouter>
        <BasicExample mode={mode} toggleMode={toggleMode} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/index" element={<Home />} />
          <Route path="/Tv" element={<Tv />} />
          <Route path="/Movies" element={<Movies />} />
          <Route path="/India" element={<India />} />
          <Route path="/Anime" element={<Anime />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/About" element={<About />} />
          <Route path="/movie/:id" element={<CardDetails />} />
          <Route path="/tv/:id" element={<CardDetails1 />} />
        </Routes>
      </BrowserRouter>
      <footer className="footer mt-4">
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={12}>
              <p className="mb-0">Design & Developed by
                <a href="https://kunal-666.github.io/Profile/" target="_blank" rel="noopener noreferrer" className="footer-link"> Kunal Gupta</a>
                &copy; 2021
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
    </>
  );
}


export default App;
