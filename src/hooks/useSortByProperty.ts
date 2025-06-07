import { useEffect, useState } from "react";
import { SORT_DEFAULT, SortItem } from "../constants/sortProperties";

export const useSortByProperty = (setFilteredPokemons, filteredPokemons) => {
  const [sort, setSort] = useState<SortItem>("default");

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

  return { setSort, sort };
};
