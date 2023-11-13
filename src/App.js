import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import About from './Pages/About';
import BasicExample from './components/nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchA from './components/Anime';
import Home from './Pages/Home';
import Tv from './Pages/Tv';
import Sr from './components/Sr';
import CardDetails from './components/CardDetails';
import CardDetails1 from './components/Anmtv';
import AMovie from './components/Anlatest';
import Movies from './Pages/Movies';
import Contact from './Pages/Contact';
import All from './components/All';
import India from './Pages/India';
import { useState } from "react";

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
    <div className="App">
      <BrowserRouter >
        <BasicExample mode={mode} toggleMode={toggleMode} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/index" element={<Home />} />
          <Route path="/Tv" element={<Tv />} />
          <Route path="/Movies" element={<Movies />} />
          <Route path="/India" element={<India />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/About" element={<About />} />
          <Route path="/SearchA" element={<SearchA />} />
          <Route path="/Sr" element={<Sr />} />
          <Route path="/card/:id" element={<CardDetails />} />
          <Route path="/ac/:id" element={<CardDetails1 />} />
          <Route exact path="/AM" element={<AMovie />} />
          <Route exact path="/All" element={<All />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}


export default App;
