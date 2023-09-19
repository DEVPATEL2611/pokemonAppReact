import axios from "axios";

export async function fetchPokemonList(url) {
  const response = await axios.get(url);
  return response.data;
}

export async function fetchPokemonDetails(url) {
  const response = await axios.get(url);
  return response.data;
}
