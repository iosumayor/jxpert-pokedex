import { Pokemon } from "./Pokemon";
import { Region } from "./Region";
export interface PokemonRepository {
  listByRegion: (region: Region) => Promise<Pokemon[]>;
}
