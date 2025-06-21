import { Pokemon } from "./Pokemon";

export interface FavouritePokemonRepository {
  listFavourites: () => Promise<Pokemon[]>;
  addFavourite: (pokemon: Pokemon) => void;
  deleteFavourite: (pokemon: Pokemon) => void;
}
