import { PokemonRepository } from "../domain/PokemonRepository";

export const ApiPokemonRepository: PokemonRepository = {
  getPokemonData: async (start: number, end: number) => {
    const { results }: any = await getAllPokemons(start, end);
    const pokemonsData = await getPokemonDetail(results);
    return pokemonsData;
  },
};

const getAllPokemons = async (start: number, end: number) => {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${start}&limit=${end}`,
  ).then((apiPokemonList) => apiPokemonList.json());

  if (res === undefined) {
    throw new Error("No han cargado los pokemons");
  }

  return res;
};
const getPokemonDetail = async (allPokemons) => {
  const res = await Promise.all(
    allPokemons.map(
      async ({ url }) =>
        await fetch(url).then((apiPokemonDetail) => apiPokemonDetail.json()),
    ),
  );

  if (res === undefined) {
    throw new Error("No se ha cargado el detalle de los pokemons");
  }

  return res;
};
