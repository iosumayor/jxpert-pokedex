import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { App } from "../App";

// Respuesta de la lista
const mockPokemonListResponse = {
  results: [
    {
      name: "bulbasaur",
      url: "https://pokeapi.co/api/v2/pokemon/1/",
    },
  ],
};

// Respuesta del detalle
const mockPokemonDetailResponse = {
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
    { base_stat: 45, stat: { name: "hp" } },
    { base_stat: 49, stat: { name: "attack" } },
    { base_stat: 49, stat: { name: "defense" } },
    { base_stat: 65, stat: { name: "special-attack" } },
    { base_stat: 65, stat: { name: "special-defense" } },
    { base_stat: 45, stat: { name: "speed" } },
  ],
};

describe("App Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("deberÃa renderizar el nombre del pokemon cuando se cargan los datos", async () => {
    const mockFetch = vi.fn();
    global.fetch = mockFetch;

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockPokemonListResponse,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockPokemonDetailResponse,
      });

    render(<App />);

    const name = await screen.findByText("bulbasaurdsfsdsd");

    expect(name).toBeInTheDocument();
  });
});
