export const mockOnePokemonListResponse = {
  results: [
    {
      name: "bulbasaur",
      url: "https://pokeapi.co/api/v2/pokemon/1/",
    },
  ],
};

export const mockKantoPokemonListResponse = {
  results: [
    {
      name: "bulbasaur",
      url: "https://pokeapi.co/api/v2/pokemon/1/",
    },
    {
      name: "charmander",
      url: "https://pokeapi.co/api/v2/pokemon/4/",
    },
  ],
};
export const mockJohtoPokemonListResponse = {
  results: [
    {
      name: "chikorita",
      url: "https://pokeapi.co/api/v2/pokemon/152/",
    },
    {
      name: "totodile",
      url: "https://pokeapi.co/api/v2/pokemon/158/",
    },
  ],
};
export const mockHoennPokemonListResponse = {
  results: [
    {
      name: "groudon",
      url: "https://pokeapi.co/api/v2/pokemon/383/",
    },
  ],
};

// Respuesta del detalle
export const mockPokemonDetailBulbasaurResponse = {
  id: 1,
  name: "bulbasaur",
  types: [
    {
      type: {
        name: "grass",
      },
    },
  ],
  sprites: {
    other: {
      "official-artwork": {
        front_default: "https://example.com/bulbasaur.png",
      },
    },
  },
  stats: [
    { base_stat: 0, stat: { name: "hp" } },
    { base_stat: 49, stat: { name: "attack" } },
    { base_stat: 50, stat: { name: "defense" } },
    { base_stat: 65, stat: { name: "special-attack" } },
    { base_stat: 66, stat: { name: "special-defense" } },
    { base_stat: 45, stat: { name: "speed" } },
  ],
};
export const mockPokemonDetailCharmanderResponse = {
  id: 4,
  name: "charmander",
  types: [
    {
      type: {
        name: "fire",
      },
    },
  ],
  sprites: {
    other: {
      "official-artwork": {
        front_default: "https://example.com/charmander.png",
      },
    },
  },
  stats: [
    { base_stat: 100, stat: { name: "hp" } },
    { base_stat: 60, stat: { name: "attack" } },
    { base_stat: 20, stat: { name: "defense" } },
    { base_stat: 67, stat: { name: "special-attack" } },
    { base_stat: 80, stat: { name: "special-defense" } },
    { base_stat: 55, stat: { name: "speed" } },
  ],
};
export const mockPokemonDetailChikoritaResponse = {
  id: 152,
  name: "chikorita",
  types: [
    {
      type: {
        name: "grass",
      },
    },
  ],
  sprites: {
    other: {
      "official-artwork": {
        front_default: "https://example.com/chikorita.png",
      },
    },
  },
  stats: [
    { base_stat: 100, stat: { name: "hp" } },
    { base_stat: 60, stat: { name: "attack" } },
    { base_stat: 20, stat: { name: "defense" } },
    { base_stat: 67, stat: { name: "special-attack" } },
    { base_stat: 80, stat: { name: "special-defense" } },
    { base_stat: 55, stat: { name: "speed" } },
  ],
};
export const mockPokemonDetailTotodileResponse = {
  id: 158,
  name: "totodile",
  types: [
    {
      type: {
        name: "water",
      },
    },
  ],
  sprites: {
    other: {
      "official-artwork": {
        front_default: "https://example.com/totodile.png",
      },
    },
  },
  stats: [
    { base_stat: 100, stat: { name: "hp" } },
    { base_stat: 60, stat: { name: "attack" } },
    { base_stat: 20, stat: { name: "defense" } },
    { base_stat: 67, stat: { name: "special-attack" } },
    { base_stat: 80, stat: { name: "special-defense" } },
    { base_stat: 55, stat: { name: "speed" } },
  ],
};
export const mockPokemonDetailGroudonResponse = {
  id: 383,
  name: "groudon",
  types: [
    {
      type: {
        name: "ground",
      },
    },
  ],
  sprites: {
    other: {
      "official-artwork": {
        front_default: "https://example.com/groudon.png",
      },
    },
  },
  stats: [
    { base_stat: 100, stat: { name: "hp" } },
    { base_stat: 90, stat: { name: "attack" } },
    { base_stat: 70, stat: { name: "defense" } },
    { base_stat: 67, stat: { name: "special-attack" } },
    { base_stat: 87, stat: { name: "special-defense" } },
    { base_stat: 55, stat: { name: "speed" } },
  ],
};