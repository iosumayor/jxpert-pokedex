interface Pokemon {
  name: string;
  url: string;
}

type PokemonList = Pokemon[];

const getAllPokemons = async (
  start: number,
  end: number,
): Promise<PokemonList> => {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${start}&limit=${end}`,
  ).then((apiPokemonList) => apiPokemonList.json());

  if (res === undefined) {
    throw new Error("No han cargado los pokemons");
  }

  return res;
};

const getPokemonDetail = async (allPokemons): Promise<any> => {
  const res = await Promise.all(
    allPokemons.map(
      async ({ url }) =>
        await fetch(url).then((apiPokemonDetail) => apiPokemonDetail.json()),
    ),
  );

  if (res === undefined) {
    throw new Error("No se ha cargado el detalle de los pokemons");
  }

  return res;
};

export const pokemonService = {
  getAllPokemons,
  getPokemonDetail,
};
