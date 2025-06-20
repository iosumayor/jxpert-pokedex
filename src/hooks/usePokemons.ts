import { Region, REGIONS, regionRanges } from "../constants/region";
import { useEffect, useState } from "react";
import { SORT_DEFAULT, Stats } from "../constants/sortProperties";
import { PokemonService } from "../core/services/pokemonService";
import { ApiPokemonRepository } from "../core/infrastructure/ApiPokemonRepository";

export const usePokemons = () => {
  const [search, setSearch] = useState<string>("");
  const [pokemons, setPokemons] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<boolean>(false);
  const [filteredPokemons, setFilteredPokemons] = useState<any>([]);
  const [region, setRegion] = useState<Region>("kanto");
  const [sort, setSort] = useState<Stats>("default");

  const getCurrentRegion = (region: Region) => {
    if (REGIONS.includes(region)) {
      return regionRanges[region];
    }

    return regionRanges.kanto;
  };

  const getPokemons = async (region: Region) => {
    const { start, end } = getCurrentRegion(region);
    const newPokemonService = new PokemonService(ApiPokemonRepository);
    const pokemons = newPokemonService.getPokemonData(start, end);
    return pokemons;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setFilter(true);

      const pokemonsData = await getPokemons(region);

      setPokemons(pokemonsData);
      setFilteredPokemons(pokemonsData);
      setLoading(false);
    };

    fetchData();
  }, [region]);

  const sortByProperty = (property: string) => {
    setFilteredPokemons((previous) =>
      [...previous].sort((pokemon1, pokemon2) => {
        const pokemon1Stat = pokemon1.stats.find(
          (stat) => stat.stat.name === property,
        );
        const pokemon2Stat = pokemon2.stats.find(
          (stat) => stat.stat.name === property,
        );
        return pokemon2Stat.base_stat - pokemon1Stat.base_stat;
      }),
    );
  };

  useEffect(() => {
    if (sort === SORT_DEFAULT) {
      setFilteredPokemons((previous) =>
        [...previous].sort((a, b) => {
          return a.id - b.id;
        }),
      );
      return;
    }
    sortByProperty(sort);
  }, [filteredPokemons[0]?.id, sort]);

  const findByName = (pokemon) => {
    return pokemon.name.toLowerCase().includes(search.toLowerCase());
  };

  const findByType = (pokemon) => {
    return pokemon.types.find((type) =>
      type.type.name.startsWith(search.toLowerCase()),
    );
  };

  useEffect(() => {
    setFilteredPokemons(
      pokemons.filter(
        (pokemon) => findByName(pokemon) || !!findByType(pokemon),
      ),
    );
    setFilter(false);
  }, [pokemons[0]?.id, search]);

  return {
    pokemons,
    loading,
    filter,
    filteredPokemons,
    region,
    setRegion,
    setFilter,
    setFilteredPokemons,
    setSort,
    sort,
    setSearch,
    search,
  };
};
