import React, { useEffect } from 'react';
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';
import PokemonCard from './PokemonCard';

const ListaPokemon = ({ pokemons, setPokemons }) => {
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=50`);
        const json = res.data.results;
        const pokeArr = await Promise.all(
          json.map(async (pokemon) => {
            const res = await axios.get(`${pokemon.url}`);
            return res.data;
          })
        );
        setPokemons(pokeArr);
      } catch (e) {
        setPokemons([]); // No pintes nada 
      }
    }

    fetchData();
  }, [setPokemons]); // componentDidUpdate

  const renderPokemonCard = () => {
    return pokemons.map((pokemon) => (
      <PokemonCard 
        key={uuidv4()} 
        pokemon={pokemon} 
        pokemonImg={pokemon.sprites.other["official-artwork"]}
        pokemonPrimaryType={pokemon.types[0].type.name}
        pokemonSecondaryType={pokemon.types[1] ? pokemon.types[1].type.name : ""}
        pokemonAbilities={pokemon.abilities}
        pokemonStats={pokemon.stats}
      />
    ));
  };

  return (
    <section className='pokemonCardsContainer'>
      {pokemons.length !== 0 ? renderPokemonCard() : <p>Loading...</p>}
    </section>
  );
};

export default ListaPokemon;
