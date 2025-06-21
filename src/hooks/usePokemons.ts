import { Region, REGIONS, regionRanges } from "../constants/region";
import { useEffect, useState } from "react";
import { SORT_DEFAULT, Stats } from "../constants/sortProperties";
import { PokemonService } from "../core/services/pokemonService";
import { ApiPokemonRepository } from "../core/infrastructure/ApiPokemonRepository";
import { LocalStoragePokemonRepository } from "../core/infrastructure/LocalStorageFavouritePokemonRepository";
import { Pokemon } from "../core/domain/Pokemon";

export const usePokemons = () => {
  const [search, setSearch] = useState<string>("");
  const [pokemons, setPokemons] = useState<any>([]);
  const [favouritePokemons, setFavouritePokemons] = useState<Pokemon[]>([]);
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
    const pokemonService = new PokemonService(
      ApiPokemonRepository,
      LocalStoragePokemonRepository,
    );
    const regionPokemons = await pokemonService.getPokemonData(start, end);
    const favPokemons = await pokemonService.listFavouritePokemons();
    return { region: regionPokemons, favourites: favPokemons };
  };

  const addFavourite = (pokemon: Pokemon) => {
    const newPokemonService = new PokemonService(
      ApiPokemonRepository,
      LocalStoragePokemonRepository,
    );
    newPokemonService.addFavourite(pokemon);
    const copiedFavouritePokemons = [...favouritePokemons];
    copiedFavouritePokemons.push(pokemon);
    setFavouritePokemons(copiedFavouritePokemons);
  };

  const deleteFavourite = (pokemon: Pokemon) => {
    const newPokemonService = new PokemonService(
      ApiPokemonRepository,
      LocalStoragePokemonRepository,
    );
    newPokemonService.deleteFavourite(pokemon);
    const copiedFavouritePokemons = [...favouritePokemons];
    const index = copiedFavouritePokemons.findIndex(
      (pokemonFav) => pokemonFav.id === pokemon.id,
    );
    setFavouritePokemons(copiedFavouritePokemons.splice(index, 1));
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setFilter(true);

      const pokemonsData = await getPokemons(region);

      setPokemons(pokemonsData.region);
      setFilteredPokemons(pokemonsData.region);
      setFavouritePokemons(pokemonsData.favourites);
      setLoading(false);
    };

    fetchData();
  }, [region]);

  const sortByProperty = (property: string) => {
    setFilteredPokemons((previous) =>
      [...previous].sort((pokemon1, pokemon2) => {
        if (property === "special-attack") {
          return (
            pokemon2.stats["specialAttack"] - pokemon1.stats["specialAttack"]
          );
        } else if (property === "special-defense") {
          return (
            pokemon2.stats["specialDefense"] - pokemon1.stats["specialDefense"]
          );
        }
        return pokemon2.stats[property] - pokemon1.stats[property];
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
    return pokemon.types.find((type) => type.startsWith(search.toLowerCase()));
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
    favouritePokemons,
    addFavourite,
    deleteFavourite,
  };
};
