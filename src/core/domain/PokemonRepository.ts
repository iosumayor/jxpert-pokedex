import { Pokemon } from "./Pokemon";
export interface PokemonRepository {
  listByRegion: (start: number, end: number) => Promise<Pokemon[]>;
}
