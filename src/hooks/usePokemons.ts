import { Region, REGIONS, regionRanges } from "../constants/region";
import { useEffect, useState } from "react";

export const usePokemons = () => {
  const [pokemons, setPokemons] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<boolean>(false);
  const [filteredPokemons, setFilteredPokemons] = useState<any>([]);
  const [region, setRegion] = useState<Region>("kanto");
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setFilter(true);

      const pokemonsData = await getPokemonsData(region);

      setPokemons(pokemonsData);
      setFilteredPokemons(pokemonsData);
      setLoading(false);
    };

    fetchData();
  }, [region]);
  return {
    pokemons,
    loading,
    filter,
    filteredPokemons,
    region,
    setRegion,
    setFilter,
    setFilteredPokemons,
  };
};
