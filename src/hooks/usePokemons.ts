import { Region, REGIONS } from "../constants/region";

type RegionRangeItem = {
  start: number;
  end: number;
};

const regionRanges: Record<Region, RegionRangeItem> = {
  kanto: {
    start: 0,
    end: 151,
  },
  johto: {
    start: 151,
    end: 251,
  },
  hoenn: {
    start: 251,
    end: 386,
  },
  sinnoh: {
    start: 386,
    end: 494,
  },
  unova: {
    start: 494,
    end: 649,
  },
  kalos: {
    start: 649,
    end: 721,
  },
  alola: {
    start: 721,
    end: 809,
  },
  galar: {
    start: 809,
    end: 905,
  },
  paldea: {
    start: 905,
    end: 1025,
  },
} as const;

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
