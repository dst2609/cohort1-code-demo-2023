import React, { Children, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon")
      .then((response) => {
        setPokemonList(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <div>Display Pokemon from the api link</div>
      <ul>
        {pokemonList.map((pokemon) => (
          <li key={pokemon.name}>
            {" "}
            <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
