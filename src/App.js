import './App.css';
import { useState } from 'react';
import Nav from './Components/Nav/Nav';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Components/Pages/Home/Home';
import CardDetail from './Components/CardDetail/CardDetail';
import Favourite from './Components/Pages/Favourite/Favourite';

function App() {
  const [favCharacters, setFavCharacters] = useState([]);

  const addToFav = (id) => {
    setFavCharacters(prevState => [...prevState, id]);
  }

  const removeFromFav = id => {
    setFavCharacters(prevState => prevState.filter(el => el !== id))
  }

  return (
    <Router>
      <div className="App" style={{overflowX:"hidden"}}>
        <Nav favCharacters={favCharacters}/>
        <Routes>
          <Route path='/' element={<Home favCharacters={favCharacters} addToFav={addToFav} removeFromFav={removeFromFav} />} />
          <Route path='/:id' element={<CardDetail favCharacters={favCharacters} addToFav={addToFav} removeFromFav={removeFromFav} />} />

          <Route path='/favourite' element={<Favourite favCharacters={favCharacters} addToFav={addToFav} removeFromFav={removeFromFav} />} />
          <Route path='/favourite/:id' element={<CardDetail favCharacters={favCharacters} addToFav={addToFav} removeFromFav={removeFromFav}/>} />

        </Routes>
      </div>
    </Router>
  );
}



export default App;
