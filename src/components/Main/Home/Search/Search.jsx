import React, { useState, useRef, useEffect, useContext } from 'react';
import axios from 'axios';

const Search = ({ setPokemons }) => {
  const [inputValue, setInputValue] = useState('');
  const [searchedPokemons, setSearchedPokemons] = useState([]);
  const formRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    async function fetchData() {

      const foundPokemon = searchedPokemons.find(poke => poke.name === inputValue || poke.id === Number(inputValue));


      if (!inputValue) return;
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${inputValue.toLowerCase()}`);
        const json = res.data;
        if (!foundPokemon) {
          setSearchedPokemons([json, ...searchedPokemons]);
          setPokemons([json, ...searchedPokemons]);
        }
      } catch (e) {
        console.error(e);
        setPokemons([]);
      }
    }

    fetchData();
  }, [inputValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const pokemonName = e.target.pokeName.value.trim().toLowerCase();
    if (pokemonName) {
      setInputValue(pokemonName);
    }
    formRef.current.reset();
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setInputValue(value);
      formRef.current.reset();
    }, 5000);
  };

  return (
    <section>
      <form onSubmit={handleSubmit} className="form" ref={formRef}>
        <div>
          <label htmlFor="pokeName">Título</label>
          <input type="text" name="pokeName" onChange={handleChange}/>
          <button type="submit">Search</button>
        </div>
      </form>
    </section>
  );
};

export default Search;
