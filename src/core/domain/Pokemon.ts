export interface Pokemon {
  id: number;
  name: string;
  stats: Stats;
  types: Type[];
  image: string;
}

interface Stats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}
interface Type {
  bug;
  dark;
  dragon;
  electric;
  fairy;
  fighting;
  fire;
  flying;
  ghost;
  grass;
  ground;
  ice;
  normal;
  poison;
  psychic;
  rock;
  steel;
  water;
}
