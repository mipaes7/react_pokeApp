import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PokemonCard = ({
  pokemon: { name, id, weight, height },
  pokemonImg: { front_default },
  pokemonPrimaryType,
  pokemonSecondaryType,
  pokemonAbilities,
  pokemonStats
}) => {

  const [type, setType] = useState('');

  const formatId = (pokeId) => {
    pokeId = pokeId.toString();
    while (pokeId.length < 3) pokeId = '0' + pokeId;
    return '#' + pokeId;
  };

  const normalizeName = (str) => {
    if (str.length === 0) return str;
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
  };

  const pokemonQuery = {
    name: name,
    id: id,
    image: front_default,
    type1: pokemonPrimaryType,
    type2: pokemonSecondaryType ? pokemonSecondaryType : '',
    abilities: JSON.stringify(pokemonAbilities.map(a => a.ability.name)),
    stats: JSON.stringify(pokemonStats.map(s => ({ stat: s.stat.name, base_stat: s.base_stat }))),
    weight: weight,
    height: height
  };

  const queryString = new URLSearchParams(pokemonQuery).toString();
  const pokemonUrl = `/pokemon/${id}?${queryString}`;

  useEffect(() => { setType(pokemonPrimaryType) }, [type]);

  return <article className={`pokemonCard ${type}`}>
    <Link to={pokemonUrl}>
      <div className="pokemonLink">
        <img src={front_default} alt={normalizeName(name)} />
        <h2 className="pokemonId">
          <span>{formatId(id)}</span>
          <span>{normalizeName(name)}</span>
        </h2>
      </div>
    </Link>
    <div className="typesContainer">
      <span className={`typeOne ${type}`}><p>{normalizeName(type)}</p></span>
      {pokemonSecondaryType !== '' ? <span className={`typeTwo ${pokemonSecondaryType}`}><p>{normalizeName(pokemonSecondaryType)}</p></span> : ''}
    </div>
  </article>;
};

export default PokemonCard;
