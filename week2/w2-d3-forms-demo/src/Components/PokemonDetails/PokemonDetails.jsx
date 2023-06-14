import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PokemonDetails = () => {
  const { name } = useParams(); //bulbasaur
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((response) => {
        setPokemonDetails(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [name]);

  if (!pokemonDetails) {
    return <div>Loading.....</div>;
  }

  const { height, weight, sprites } = pokemonDetails;

  return (
    <div>
      <h1>Pokémon Details</h1>
      <p>Name: {name}</p>
      <p>Height: {height}</p>
      <p> Weight: {weight}</p>
      <img src={sprites.front_default} />
    </div>
  );
};

export default PokemonDetails;
