import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { PokemonContext } from "./context/pokemonContext";

import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';

function App() {

  const [pokemons, setPokemons] = useState([]);
  
  return (
    <>
      <PokemonContext.Provider value={{ pokemons, setPokemons }}>
        <BrowserRouter >
          <Header />
          <Main />
        </BrowserRouter>
      </PokemonContext.Provider>
      <Footer />
    </>
  )
}

export default App;
