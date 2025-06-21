import { Pokemon } from "./Pokemon";

export interface FavouritePokemonRepository {
  listFavourites: () => Pokemon[];
  addFavourite: (pokemon: Pokemon) => void;
  deleteFavourite: (pokemon: Pokemon) => void;
}