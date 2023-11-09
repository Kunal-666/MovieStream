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
import Anime from './Pages/Anime';

function App() {

  return (
    <div className="App">
      <BrowserRouter basename="/stream">
        <BasicExample />
        <p>home</p>
        <Home />
        <Routes>
          <Route exact path="/stream" element={<Home />} />
          <Route path="/stream/index" element={<Home />} />
          <Route path="/Tv" element={<Tv />} />
          <Route path="/Movies" element={<Movies />} />
          <Route path="/stream/India" element={<India />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/About" element={<About />} />
          <Route path="/SearchA" element={<SearchA />} />
          <Route path="/Sr" element={<Sr />} />
          <Route path="/stream/card/:id" element={<CardDetails />} />
          <Route path="/stream/ac/:id" element={<CardDetails1 />} />
          <Route exact path="/AM" element={<AMovie />} />
          <Route exact path="/All" element={<All />} />
          <Route exact path="/Anime" element={<Anime />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}


export default App;
