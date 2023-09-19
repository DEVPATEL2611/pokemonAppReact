import React, { useEffect, useState } from "react";
import { fetchPokemonDetails, fetchPokemonList } from "../utils";

const PokemonContainer = () => {
  const [list, setList] = useState([]);
  const [url, setUrl] = useState(
    "https://content.newtonschool.co/v1/pr/64ccef982071a9ad01d36ff6/pokemonspages1"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [selectedPokemonData, setSelectedPokemonData] = useState(null);
  async function getList() {
    if (isLoading === false) {
      setIsLoading(true);
      const pokemons = await fetchPokemonList(url);
      console.log(pokemons);
      setList([...list, ...pokemons[0].results]);
      setUrl(pokemons[0].next);
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getList();
  }, []);
  useEffect(() => {
    async function getPokemon() {
      if (isLoading === false && selectedPokemon !== null) {
        setIsLoading(true);
        const pokemon = await fetchPokemonDetails(selectedPokemon);
        console.log(pokemon);
        setSelectedPokemonData(pokemon[0]);
        setIsLoading(false);
      }
    }
    getPokemon();
  }, [selectedPokemon]);
  return (
    <div className="App">
      {isLoading ? (<div>Loading...</div>) :
      list.map((pokemon) => (
        <div onClick={() => setSelectedPokemon(pokemon.url)}>
          {pokemon.name}
        </div>
      ))}
      <button onClick={getList}> Load More</button>

      {selectedPokemonData && (
        <div className="expaned-pokemon">
          <h1>{selectedPokemonData.name}</h1>
          <img
            className="pokemon-img"
            src={selectedPokemonData.image}
            alt="pokemon-img"
          />
          <p>{selectedPokemonData.id}</p>
        </div>
      )}
    </div>
  );
};

export default PokemonContainer;
