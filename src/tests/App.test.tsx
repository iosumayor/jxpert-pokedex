import { render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom'
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
    { base_stat: 0, stat: { name: "hp" } },
    { base_stat: 49, stat: { name: "attack" } },
    { base_stat: 50, stat: { name: "defense" } },
    { base_stat: 65, stat: { name: "special-attack" } },
    { base_stat: 66, stat: { name: "special-defense" } },
    { base_stat: 45, stat: { name: "speed" } },
  ],
};

describe("App Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("deberia renderizar el nombre del pokemon cuando se cargan los datos", async () => {
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

    const name = await screen.findByText("bulbasaur");

    expect(name).toBeInTheDocument();
  });

  test("deberia renderizar el attack del pokemon cuando se cargan los datos", async () => {
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
    const hpPokemon = await screen.findByText('0');
    

    expect(hpPokemon).toBeInTheDocument();
  });
  test("deberia renderizar el attack del pokemon cuando se cargan los datos", async () => {
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
    const attackPokemon = await screen.findByText('49');
    

    expect(attackPokemon).toBeInTheDocument();
  });
  test("deberia renderizar la defensa del pokemon cuando se cargan los datos", async () => {
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
    const defensePokemon = await screen.findByText('50');
    

    expect(defensePokemon).toBeInTheDocument();
  });
  test("deberia renderizar el ataque especial del pokemon cuando se cargan los datos", async () => {
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
    const specialAttackPokemon = await screen.findByText('65');
    

    expect(specialAttackPokemon).toBeInTheDocument();
  });
  test("deberia renderizar la defensa especial del pokemon cuando se cargan los datos", async () => {
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
    const specialDefensePokemon = await screen.findByText('66');
    

    expect(specialDefensePokemon).toBeInTheDocument();
  });
  test("deberia renderizar la imagen del pokemon cuando se cargan los datos", async () => {
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
    const image = await screen.findByAltText('bulbasaur artwork');
    console.log(screen.debug())
    

    expect(image).toHaveAttribute('src','https://example.com/bulbasaur.png');
  });
});
