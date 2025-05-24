import { render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom'
import userEvent, { UserEvent } from "@testing-library/user-event";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { App } from "../App";

// Respuesta de la lista
const mockOnePokemonListResponse = {
  results: [
    {
      name: "bulbasaur",
      url: "https://pokeapi.co/api/v2/pokemon/1/",
    }
  ],
};

const mockKantoPokemonListResponse = {
  results: [
    {
      name: "bulbasaur",
      url: "https://pokeapi.co/api/v2/pokemon/1/",
    },
    {
      name: "charmander",
      url: "https://pokeapi.co/api/v2/pokemon/4/"
    }
  ],
};

// Respuesta del detalle
const mockPokemonDetailBulbasaurResponse = {
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
const mockPokemonDetailCharmanderResponse = {
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
  describe("Muestra la informacion de un pokemon", () => {
    test("deberia renderizar el nombre del pokemon cuando se cargan los datos", async () => {
      const mockFetch = vi.fn();
      global.fetch = mockFetch;
  
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockOnePokemonListResponse,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockPokemonDetailBulbasaurResponse,
        });
  
      render(<App />);
  
      const name = await screen.findByText("bulbasaur");
      console.log(screen.debug())
  
      expect(name).toBeInTheDocument();
    });
  
    test("deberia renderizar el attack del pokemon cuando se cargan los datos", async () => {
      const mockFetch = vi.fn();
      global.fetch = mockFetch;
  
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockOnePokemonListResponse,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockPokemonDetailBulbasaurResponse,
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
          json: async () => mockOnePokemonListResponse,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockPokemonDetailBulbasaurResponse,
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
          json: async () => mockOnePokemonListResponse,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockPokemonDetailBulbasaurResponse,
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
          json: async () => mockOnePokemonListResponse,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockPokemonDetailBulbasaurResponse,
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
          json: async () => mockOnePokemonListResponse,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockPokemonDetailBulbasaurResponse,
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
          json: async () => mockOnePokemonListResponse,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockPokemonDetailBulbasaurResponse,
        });
  
      render(<App />);
      const image = await screen.findByAltText('bulbasaur artwork');
  
      
  
      expect(image).toHaveAttribute('src','https://example.com/bulbasaur.png');
    });

  })

 describe("muestra la información de varios pokemon",() => {

  test("deberia renderizar varios pokemon cuando se cargan los datos", async () => {
    const mockFetch = vi.fn();
    global.fetch = mockFetch;

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockKantoPokemonListResponse,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockPokemonDetailBulbasaurResponse,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockPokemonDetailCharmanderResponse,
      });

    render(<App />);
    const bulbasaur = await screen.findByText('bulbasaur');
    const charmander = await screen.findByText('charmander');

    

    expect(bulbasaur).toBeInTheDocument();
    expect(charmander).toBeInTheDocument();
  });

  test("debería aparecer el pokemon que se busque por nombre en el filtro", async () => {
    const mockFetch = vi.fn();
    global.fetch = mockFetch;

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockKantoPokemonListResponse,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockPokemonDetailBulbasaurResponse,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockPokemonDetailCharmanderResponse,
      });

    render(<App />);

    const searchPokemonPlaceholer = await screen.getByPlaceholderText('Search a Pokémon...')
    await userEvent.type(searchPokemonPlaceholer,"bulbasaur")
    const bulbasaurName = screen.getByText("bulbasaur");

    

    expect(bulbasaurName).toBeInTheDocument();
  });

  test("no debería aparecer el pokemon cuyo nombre no coincida con la busqueda", async () => {
    const mockFetch = vi.fn();
    global.fetch = mockFetch;

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockKantoPokemonListResponse,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockPokemonDetailBulbasaurResponse,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockPokemonDetailCharmanderResponse,
      });

    render(<App />);

    const searchPokemonPlaceholer = await screen.getByPlaceholderText('Search a Pokémon...')
    await userEvent.type(searchPokemonPlaceholer,"bulbasaur")
    const charmanderrName = screen.queryByText("charmander");

    

    expect(charmanderrName).not.toBeInTheDocument();
  });
 })
});
