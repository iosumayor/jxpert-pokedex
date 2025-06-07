import { useState, useEffect } from "react";

export const useFilter = (setFilteredPokemons, setFilter, pokemons) => {
  const [search, setSearch] = useState<string>("");
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

  return { setSearch, search };
};
