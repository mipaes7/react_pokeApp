import React, { useState, useContext } from 'react';
import ListaPokemon from "./ListaPokemon";
import Search from "./Search";
import { PokemonContext } from "../../../context/pokemonContext";

const Home = () => {
  const { pokemons, setPokemons } = useContext(PokemonContext);

  return (
    <section>
      <article>
        <Search setPokemons={setPokemons} />
      </article>
      <article>
        <ListaPokemon pokemons={pokemons} setPokemons={setPokemons} />
      </article>
    </section>
  );
};

export default Home;
