import { PokemonRepository } from "../domain/PokemonRepository";
import { Region } from "../domain/Region";
import { regionRanges } from "../../constants/region";

export const ApiPokemonRepository: PokemonRepository = {
  listByRegion: async (region: Region) => {
    const { results }: any = await getAllPokemons(region);
    const pokemonsData = await getPokemonDetail(results);
    const mappedPokemon = pokemonsData.map((pokemonsData) => {
      const types = pokemonsData.types.map((type) => {
        return type.type.name;
      });
      return {
        name: pokemonsData.name,
        id: pokemonsData.id,
        stats: {
          hp: pokemonsData.stats[0].base_stat,
          attack: pokemonsData.stats[1].base_stat,
          defense: pokemonsData.stats[2].base_stat,
          specialAttack: pokemonsData.stats[3].base_stat,
          specialDefense: pokemonsData.stats[4].base_stat,
          speed: pokemonsData.stats[5].base_stat,
        },
        types: types,
        image: pokemonsData.sprites.other["official-artwork"].front_default,
      };
    });
    return mappedPokemon;
  },
};

const getAllPokemons = async (region: Region) => {
  const limits = getLimitsByRegion(region);
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${limits.start}&limit=${limits.end}`,
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

const getLimitsByRegion = (region) => {
  return regionRanges[region];
};
