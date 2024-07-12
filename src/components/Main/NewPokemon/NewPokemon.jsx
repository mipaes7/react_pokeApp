import {useState, useContext} from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { PokemonContext } from "../../../context/pokemonContext";


const NewPokemon = () => {

  const { pokemons, setPokemons } = useContext(PokemonContext);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {

    const idAlreadyExists = pokemons.some((pokemon) => pokemon.id === data.id);

    if (idAlreadyExists) {
    } else {
      const newPokemon = {
        id: data.id,
        name: data.name,
        sprites: {
          other: {
            "official-artwork": {
              front_default: data.img,
            },
          },
        },
        types: [
          { type: { name: data.typeOne } },
          ...(data.typeTwo ? [{ type: { name: data.typeTwo } }] : []),
        ],
      };

      setPokemons([newPokemon, ...pokemons]);
    }
  };

  const onError = (errors) => {
    if (errors.id) {
      if (errors.id.type === "required") {
      } else if (errors.id.type === "min") {
      }
    }

    if (errors.name) {
      if (errors.name.type === "required") {
      } else if (errors.name.type === "minLength") {
      }
    }

    if (errors.img) {
      if (errors.img.type === "required") {
      }
    }

    if (errors.typeOne) {
      if (errors.typeOne.type === "required") {
      }
    }
  };

  return (
    <>
      <div id="create-title-banner">
        <div id="create-title">
          <h1>PokeLab</h1>
        </div>
        <h5>Create a new Pokemon.</h5>
      </div>
      <form id="create-form" onSubmit={handleSubmit(onSubmit, onError)}>
        <input
          placeholder="Pokedex ID (minimum 1293)"
          id="id"
          {...register("id", { required: true, min: 1293 })}
          type="number"
          max={9999}
        />

        <input
          placeholder="Name"
          id="name"
          {...register("name", { required: true, minLength: 3 })}
          type="text"
          maxLength={12}
        />

        <input
          placeholder="Image URL"
          id="img"
          {...register("img", { required: true })}
          type="text"
        />
        <div id="create-types">
          <select id="typeOne" {...register("typeOne", { required: true })}>
            <option value="">Type one</option>
            <option value="bug">Bug</option>
            <option value="dark">Dark</option>
            <option value="dragon">Dragon</option>
            <option value="electric">Electric</option>
            <option value="fairy">Fairy</option>
            <option value="fighting">Fighting</option>
            <option value="fire">Fire</option>
            <option value="flying">Flying</option>
            <option value="ghost">Ghost</option>
            <option value="grass">Grass</option>
            <option value="ground">Ground</option>
            <option value="ice">Ice</option>
            <option value="normal">Normal</option>
            <option value="poison">Poison</option>
            <option value="psychic">Psychic</option>
            <option value="rock">Rock</option>
            <option value="steel">Steel</option>
            <option value="water">Water</option>
          </select>

          <select id="typeTwo" {...register("typeTwo")}>
            <option value="">Type 2 (optional)</option>
            <option value="bug">Bug</option>
            <option value="dark">Dark</option>
            <option value="dragon">Dragon</option>
            <option value="electric">Electric</option>
            <option value="fairy">Fairy</option>
            <option value="fighting">Fighting</option>
            <option value="fire">Fire</option>
            <option value="flying">Flying</option>
            <option value="ghost">Ghost</option>
            <option value="grass">Grass</option>
            <option value="ground">Ground</option>
            <option value="ice">Ice</option>
            <option value="normal">Normal</option>
            <option value="poison">Poison</option>
            <option value="psychic">Psychic</option>
            <option value="rock">Rock</option>
            <option value="steel">Steel</option>
            <option value="water">Water</option>
          </select>
        </div>
        <input id="create-submit" type="submit" value="Create Pokemon" />
      </form>
    </>
  );
};


export default NewPokemon;
