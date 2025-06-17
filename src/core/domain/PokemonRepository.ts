export interface PokemonRepository {
  listByRegion: (start: number, end: number) => Promise<any[]>;
}
