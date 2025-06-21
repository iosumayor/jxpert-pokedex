import { FavouritePokemonRepository } from "../domain/FavouritePokemonRepository";
import { Pokemon } from "../domain/Pokemon";

export const LocalStoragePokemonRepository: FavouritePokemonRepository = {
  listFavourites: () => {
    const favouritePokemons = localStorage.getItem("favouritePokemons");

    if (!favouritePokemons) {
      return [];
    }

    return JSON.parse(favouritePokemons);
  },

  addFavourite: (pokemon: Pokemon) => {
    let favouritePokemons = localStorage.getItem("favouritePokemons");
    if (favouritePokemons === null) {
      favouritePokemons = "[]";
    }
    const favouritePokemonsParsed: Pokemon[] = JSON.parse(favouritePokemons);

    if (favouritePokemonsParsed?.some((pok) => pok.id === pokemon.id)) {
      return;
    }

    favouritePokemonsParsed.push(pokemon);
    localStorage.setItem(
      "favouritePokemons",
      JSON.stringify(favouritePokemonsParsed),
    );
  },

  deleteFavourite: (pokemon: Pokemon) => {
    let favouritePokemons = localStorage.getItem("favouritePokemons");
    if (favouritePokemons === null) {
      return;
    }
    const favouritePokemonsParsed: Pokemon[] = JSON.parse(favouritePokemons);

    const updatedPokemons = favouritePokemonsParsed?.filter(
      (pkmn) => pkmn.id !== pokemon.id,
    );

    localStorage.setItem("favouritePokemons", JSON.stringify(updatedPokemons));
  },
};
