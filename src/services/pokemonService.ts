const getAllPokemons = async (start: number, end: number): Promise<any> => {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${start}&limit=${end}`,
  ).then((apiPokemonList) => apiPokemonList.json());

  if (res === undefined) {
    throw new Error("No han cargado los pokemons");
  }

  return res;
};

export const pokemonService = {
  getAllPokemons,
};
