import { PokemonRepository } from "../domain/PokemonRepository";

interface Pokemon {
  name: string;
  url: string;
}

export type PokemonList = Pokemon[];

export class PokemonService {
  constructor(private pokemonsRepository: PokemonRepository) {}
  getPokemonData(start: number, end: number) {
    const allPokemons = this.pokemonsRepository.getPokemonData(start, end);
    return allPokemons;
  }
}
