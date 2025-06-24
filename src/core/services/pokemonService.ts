import { PokemonRepository } from "../domain/PokemonRepository";
import { FavouritePokemonRepository } from "../domain/FavouritePokemonRepository";
import { Pokemon } from "../domain/Pokemon";
import { Region } from "../domain/Region";

export class PokemonService {
  constructor(
    private pokemonsRepository: PokemonRepository,
    private favouritePokemonsRepository: FavouritePokemonRepository,
  ) {}

  getPokemonData(region: Region) {
    const allPokemons = this.pokemonsRepository.listByRegion(region);
    return allPokemons;
  }

  listFavouritePokemons() {
    const favouritePokemons = this.favouritePokemonsRepository.listFavourites();
    return favouritePokemons;
  }

  addFavourite(pokemon: Pokemon) {
    this.favouritePokemonsRepository.addFavourite(pokemon);
  }

  deleteFavourite(pokemon: Pokemon) {
    this.favouritePokemonsRepository.deleteFavourite(pokemon);
  }
}
