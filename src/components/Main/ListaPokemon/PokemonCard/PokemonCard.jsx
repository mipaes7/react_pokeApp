import React from "react";

const PokemonCard = ({
  pokemon: {name, id},
  pokemonImg: {front_default}
}) => {

  const normalizeName = (str) => {
    if (str.length === 0) return str;
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
};

  return <article>
  <img src={front_default} alt={normalizeName(name)} />
  <h3>#{id} {normalizeName(name)}</h3>
</article>;
};

export default PokemonCard;
