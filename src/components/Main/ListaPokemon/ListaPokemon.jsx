import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';
import PokemonCard from './PokemonCard';

const ListaPokemon = () => {

  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try{
        // Petición HTTP
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151`);
        const json = res.data.results;
        const pokeArr = await Promise.all(
          json.map(async pokemon => {
          const res = await axios.get(`${pokemon.url}`);
          return res.data;
        })
      );
        setPokemons(pokeArr);
      }catch(e){
        setPokemons([]) // No pintes nada 
      }
    }

    fetchData();
  }, []); // componentDidUpdate

    const renderPokemonCard = () => {
      return pokemons.map((pokemon, index) => ( 
      <PokemonCard 
      key={uuidv4()} 
      pokemon = {pokemon}
      pokemonImg = {pokemon.sprites.other["official-artwork"]}
      />
      ));
    };

  return <section>
    {pokemons.length !== 0 ? renderPokemonCard() : <p>Loading...</p>}
  </section>;
};

export default ListaPokemon;
