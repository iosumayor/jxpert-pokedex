import { Region, REGIONS, regionRanges } from "../constants/region";

export const usePokemons = () => {
  const getCurrentRegion = (region: Region) => {
    if (REGIONS.includes(region)) {
      return regionRanges[region];
    }

    return regionRanges.kanto;
  };

  const getPokemonsData = async (region: Region) => {
    const { start, end } = getCurrentRegion(region);
    const { results }: any = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${start}&limit=${end}`,
    ).then((apiPokemonList) => apiPokemonList.json());
    const pokemonsData = await Promise.all(
      results.map(
        async ({ url }) =>
          await fetch(url).then((apiPokemonDetail) => apiPokemonDetail.json()),
      ),
    );
    return pokemonsData;
  };
  return {
    getPokemonsData,
  };
};
