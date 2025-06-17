export interface PokemonRepository {
  getPokemonData: (start: number, end: number) => Promise<any[]>;
}
