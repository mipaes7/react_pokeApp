import { useEffect, useState } from "react";
import { json, useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const PokemonDetails = () => {

  const [description, setDescription] = useState('');

  const normalizeName = (str) => {
    if (str.length === 0) return str;
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
  };

  const formatId = (pokeId) => {
    pokeId = pokeId.toString();
    while (pokeId.length < 3) pokeId = '0' + pokeId;
    return '#' + pokeId;
  };

  const formatMeasurements = (num) => {
    return num / 10;
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const pokemonName = queryParams.get('name');
  const pokemonId = queryParams.get('id');
  const pokemonSprite = queryParams.get('image');
  const pokemonType1 = queryParams.get('type1');
  const pokemonType2 = queryParams.get('type2');
  const pokemonAbilities = JSON.parse(queryParams.get('abilities'));
  const pokemonStats = JSON.parse(queryParams.get('stats'));
  const pokemonWeight = queryParams.get('weight');
  const pokemonHeight = queryParams.get('height');


  async function getPokemonDescription() {
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
      const json = res.data;
      setDescription(json.flavor_text_entries[8].flavor_text);
    } catch (error) {
      console.log(error);
    }
  };

  getPokemonDescription();

  return <section className={`detailsCard ${pokemonType1}`}>
    <article className={`detailCardHeader ${pokemonType1}`}>
      <div className="nameContainer">
        <h2>{normalizeName(pokemonName)}</h2>
      </div>
      <div className="idContainer">
        <h2>{formatId(pokemonId)}</h2>
      </div>
    </article>
    <article className={`detailCardBody ${pokemonType1}`}>
      <div className="imgContainer">
        <img src={pokemonSprite} alt={pokemonName} />
      </div>
      <div className="detailsTypesContainer">
        <span className={`${pokemonType1}`}><h3>{normalizeName(pokemonType1)}</h3></span>
        {pokemonType2 !=='' ? <span className={`${pokemonType2}`}><h3>{normalizeName(pokemonType2)}</h3></span> : ''}
      </div>
    </article>
    <article className="detailCardAbout">
      <div className="weightContainer">Weight {formatMeasurements(pokemonWeight)} Kg</div>
      <div className="heightContainer">Height {formatMeasurements(pokemonHeight)} m</div>
      <div className="abilitiesContainer">
        <p>Abilities:</p>
        <span>
        {
          pokemonAbilities.map((element) => (
            <div>
              <p>{normalizeName(element)}</p>
            </div>
          ))
        }
        </span>
      </div>
    </article>
    <article className="descriptionContainer">
      {description}
    </article>
    <article className="detailCardStats">
      {pokemonStats.map((element, index) => (
        <div key={uuidv4()} >
            <p>{normalizeName(element.stat)}: {element.base_stat}</p>
          <progress className={`progressBar ${pokemonType1}`} value={element.base_stat} max={255}>
            <p>{element.base_stat}</p>
          </progress>
        </div>
      ))}
    </article>
  </section>;
};

export default PokemonDetails;
