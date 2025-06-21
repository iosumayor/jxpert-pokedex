import { PokemonRepository } from "../domain/PokemonRepository";
import { FavouritePokemonRepository } from "../domain/FavouritePokemonRepository";
import { Pokemon } from "../domain/Pokemon";

export class PokemonService {
  constructor(private pokemonsRepository: PokemonRepository, private favouritePokemonsRepository: FavouritePokemonRepository ) {}

  getPokemonData(start: number, end: number) {
    const allPokemons = this.pokemonsRepository.listByRegion(start, end);
    return allPokemons;
  }

  listFavouritePokemons() {
    const favouritePokemons = this.favouritePokemonsRepository.listFavourites()
    return favouritePokemons
  }

  addFavourite(pokemon: Pokemon) {
    this.favouritePokemonsRepository.addFavourite(pokemon)
  }

  deleteFavourite(pokemon: Pokemon) {
    this.favouritePokemonsRepository.deleteFavourite(pokemon)
  }
}
