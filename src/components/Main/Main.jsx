import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './Home';
import NewPokemon from './NewPokemon';
import PokemonDetails from './PokemonDetails/PokemonDetails';


const Main = () => {

  return <div>
    <h1>PokeApp</h1>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/new' element={<NewPokemon />} />
      <Route path='/pokemon/:id' element={<PokemonDetails />} />
      <Route path='/*' element={<Navigate to={'/'} />} />
    </Routes>
  </div>;
};

export default Main;
