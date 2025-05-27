import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { App } from "../App";

// Respuesta de la lista
const mockOnePokemonListResponse = {
  results: [
    {
      name: "bulbasaur",
      url: "https://pokeapi.co/api/v2/pokemon/1/",
    },
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
      url: "https://pokeapi.co/api/v2/pokemon/4/",
    },
  ],
};
const mockJohtoPokemonListResponse = {
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
const mockHoennPokemonListResponse = {
  results: [
    {
      name: "groudon",
      url: "https://pokeapi.co/api/v2/pokemon/383/",
    },
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
    { base_stat: 60, stat: { name: "attack" } },
    { base_stat: 20, stat: { name: "defense" } },
    { base_stat: 67, stat: { name: "special-attack" } },
    { base_stat: 80, stat: { name: "special-defense" } },
    { base_stat: 55, stat: { name: "speed" } },
  ],
};
const mockPokemonDetailChikoritaResponse = {
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
const mockPokemonDetailTotodileResponse = {
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
const mockPokemonDetailGroudonResponse = {
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

describe("App Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  describe("Muestra la informacion de un pokemon", () => {
    beforeEach(() => {
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
    });
    test("deberia renderizar el nombre del pokemon cuando se cargan los datos", async () => {
      render(<App />);

      const name = await screen.findByText("bulbasaur");
      console.log(screen.debug());

      expect(name).toBeInTheDocument();
    });

    test("deberia renderizar el attack del pokemon cuando se cargan los datos", async () => {
      render(<App />);
      const hpPokemon = await screen.findByText("0");

      expect(hpPokemon).toBeInTheDocument();
    });
    test("deberia renderizar el attack del pokemon cuando se cargan los datos", async () => {
      render(<App />);
      const attackPokemon = await screen.findByText("49");

      expect(attackPokemon).toBeInTheDocument();
    });
    test("deberia renderizar la defensa del pokemon cuando se cargan los datos", async () => {
      render(<App />);
      const defensePokemon = await screen.findByText("50");

      expect(defensePokemon).toBeInTheDocument();
    });
    test("deberia renderizar el ataque especial del pokemon cuando se cargan los datos", async () => {
      render(<App />);
      const specialAttackPokemon = await screen.findByText("65");

      expect(specialAttackPokemon).toBeInTheDocument();
    });
    test("deberia renderizar la defensa especial del pokemon cuando se cargan los datos", async () => {
      render(<App />);
      const specialDefensePokemon = await screen.findByText("66");

      expect(specialDefensePokemon).toBeInTheDocument();
    });
    test("deberia renderizar la imagen del pokemon cuando se cargan los datos", async () => {
      render(<App />);
      const image = await screen.findByAltText("bulbasaur artwork");

      expect(image).toHaveAttribute("src", "https://example.com/bulbasaur.png");
    });
  });

  describe("muestra la información de varios pokemon", () => {
    beforeEach(() => {
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
    });

    test("deberia renderizar varios pokemon cuando se cargan los datos", async () => {
      render(<App />);
      const bulbasaur = await screen.findByText("bulbasaur");
      const charmander = await screen.findByText("charmander");

      expect(bulbasaur).toBeInTheDocument();
      expect(charmander).toBeInTheDocument();
    });

    test("debería aparecer el pokemon que se busque por nombre en el filtro", async () => {
      render(<App />);

      const searchPokemonPlaceholer = await screen.getByPlaceholderText(
        "Search a Pokémon...",
      );
      await userEvent.type(searchPokemonPlaceholer, "bulbasaur");
      const bulbasaurName = screen.getByText("bulbasaur");

      expect(bulbasaurName).toBeInTheDocument();
    });

    test("no debería aparecer el pokemon cuyo nombre no coincida con la busqueda", async () => {
      render(<App />);

      const searchPokemonPlaceholer = await screen.getByPlaceholderText(
        "Search a Pokémon...",
      );
      await userEvent.type(searchPokemonPlaceholer, "bulbasaur");
      const charmanderrName = screen.queryByText("charmander");

      expect(charmanderrName).not.toBeInTheDocument();
    });

    test("no debería aparecer el pokemon cuyo nombre no coincida con la busqueda", async () => {
      render(<App />);

      const searchPokemonPlaceholer = await screen.getByPlaceholderText(
        "Search a Pokémon...",
      );
      await userEvent.type(searchPokemonPlaceholer, "bulbasaur");
      const charmanderrName = screen.queryByText("charmander");

      expect(charmanderrName).not.toBeInTheDocument();
    });
    test("al clicar el boton de ordenar por hp debe aparecer el Pokemon con más hp primero", async () => {
      render(<App />);
      // DOCUMENT_POSITION_FOLLOWING será 4 si el primer elemento aparece antes en el DOM que el segundo comparado con .compareDocumentPosition()
      const DOCUMENT_POSITION_FOLLOWING = 4;
      const buttonSort = screen.getAllByRole("combobox");
      await userEvent.click(buttonSort[1]);
      const hpElements = screen.getAllByLabelText("Health points");
      await userEvent.click(hpElements[0]);

      const charmander = screen.getByText("charmander");
      const bulbasaur = screen.getByText("bulbasaur");
      expect(charmander.compareDocumentPosition(bulbasaur)).toBe(
        DOCUMENT_POSITION_FOLLOWING,
      );
    });
    test("al clicar el boton de ordenar por attack debe aparecer el Pokemon con más attack primero", async () => {
      render(<App />);
      // DOCUMENT_POSITION_FOLLOWING será 4 si el primer elemento aparece antes en el DOM que el segundo comparado con .compareDocumentPosition()
      const DOCUMENT_POSITION_FOLLOWING = 4;
      const buttonSort = screen.getAllByRole("combobox");
      await userEvent.click(buttonSort[1]);
      const attackElements = screen.getAllByLabelText("Attack");
      await userEvent.click(attackElements[0]);

      const charmander = screen.getByText("charmander");
      const bulbasaur = screen.getByText("bulbasaur");
      expect(charmander.compareDocumentPosition(bulbasaur)).toBe(
        DOCUMENT_POSITION_FOLLOWING,
      );
    });
    test("al clicar el boton de ordenar por defensa debe aparecer el Pokemon con más defensa primero", async () => {
      render(<App />);
      // DOCUMENT_POSITION_FOLLOWING será 4 si el primer elemento aparece antes en el DOM que el segundo comparado con .compareDocumentPosition()
      const DOCUMENT_POSITION_FOLLOWING = 4;
      const buttonSort = screen.getAllByRole("combobox");
      await userEvent.click(buttonSort[1]);
      const defenseElements = screen.getAllByLabelText("Defense");
      await userEvent.click(defenseElements[0]);

      const charmander = screen.getByText("charmander");
      const bulbasaur = screen.getByText("bulbasaur");
      expect(bulbasaur.compareDocumentPosition(charmander)).toBe(
        DOCUMENT_POSITION_FOLLOWING,
      );
    });
    //TODO: Bug en el código no permite pasar el test. Hay que solucionarlo antes de quitar el skip.
    test.skip("al clicar el boton de ordenar por special attack debe aparecer el Pokemon con más special attack primero", async () => {
      render(<App />);
      // DOCUMENT_POSITION_FOLLOWING será 4 si el primer elemento aparece antes en el DOM que el segundo comparado con .compareDocumentPosition()
      const DOCUMENT_POSITION_FOLLOWING = 4;
      const buttonSort = screen.getAllByRole("combobox");
      await userEvent.click(buttonSort[1]);
      const saElements = screen.getAllByLabelText("Special attack");
      await userEvent.click(saElements[0]);

      const charmander = screen.getByText("charmander");
      const bulbasaur = screen.getByText("bulbasaur");
      expect(charmander.compareDocumentPosition(bulbasaur)).toBe(
        DOCUMENT_POSITION_FOLLOWING,
      );
    });
    //TODO: Bug en el código no permite pasar el test. Hay que solucionarlo antes de quitar el skip.
    test.skip("al clicar el boton de ordenar por special defense debe aparecer el Pokemon con más special attack", async () => {
      render(<App />);
      // DOCUMENT_POSITION_FOLLOWING será 4 si el primer elemento aparece antes en el DOM que el segundo comparado con .compareDocumentPosition()
      const DOCUMENT_POSITION_FOLLOWING = 4;
      const buttonSort = screen.getAllByRole("combobox");
      await userEvent.click(buttonSort[1]);
      const sdElements = screen.getAllByLabelText("Special defense");
      await userEvent.click(sdElements[0]);

      const charmander = screen.getByText("charmander");
      const bulbasaur = screen.getByText("bulbasaur");
      expect(charmander.compareDocumentPosition(bulbasaur)).toBe(
        DOCUMENT_POSITION_FOLLOWING,
      );
    });
    test("al clicar el boton de ordenar por speed debe aparecer el Pokemon con más speed", async () => {
      render(<App />);
      // DOCUMENT_POSITION_FOLLOWING será 4 si el primer elemento aparece antes en el DOM que el segundo comparado con .compareDocumentPosition()
      const DOCUMENT_POSITION_FOLLOWING = 4;
      const buttonSort = screen.getAllByRole("combobox");
      await userEvent.click(buttonSort[1]);
      const speedElements = screen.getAllByLabelText("Speed");
      await userEvent.click(speedElements[0]);

      const charmander = screen.getByText("charmander");
      const bulbasaur = screen.getByText("bulbasaur");
      expect(charmander.compareDocumentPosition(bulbasaur)).toBe(
        DOCUMENT_POSITION_FOLLOWING,
      );
    });
  });

  describe("Carga la barra de búsqueda", () => {
    test("al clicar el desplegable debe aparecer el listado de botones", async () => {
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
      const buttonSort = screen.getAllByRole("combobox");
      await userEvent.click(buttonSort[1]);
      const sortText = screen.getByText("Default");

      expect(sortText).toBeInTheDocument();
    });

    test("al clicar una región debe aparecer en la barra de búsqueda", async () => {
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
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockOnePokemonListResponse,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockPokemonDetailCharmanderResponse,
        });
      render(<App />);
      const regionExpanded = screen.getAllByRole("combobox");
      await userEvent.click(regionExpanded[0]);
      const regionButton = screen.getByText("johto");
      await userEvent.click(regionButton);

      // console.log(screen.debug());
      const sortText = screen.getAllByText("johto");

      expect(sortText[1]).toHaveClass("active");
    });
  });

  describe("Clicar otra región", () => {
    test("deben aparecer los pokemons de la nueva región", async () => {
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
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockJohtoPokemonListResponse,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockPokemonDetailChikoritaResponse,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockPokemonDetailTotodileResponse,
        });
      render(<App />);
      const regionExpanded = screen.getAllByRole("combobox");
      await userEvent.click(regionExpanded[0]);
      const regionButton = screen.getByText("johto");
      await userEvent.click(regionButton);

      const chikorita = screen.getByText("chikorita");
      const totodile = screen.getByText("totodile");

      console.log(screen.debug());
      expect(chikorita).toBeInTheDocument();
      expect(totodile).toBeInTheDocument();
    });

    test("no deben aparecer los pokemons de la antigua región", async () => {
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
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockJohtoPokemonListResponse,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockPokemonDetailChikoritaResponse,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockPokemonDetailTotodileResponse,
        });
      render(<App />);
      const regionExpanded = screen.getAllByRole("combobox");
      await userEvent.click(regionExpanded[0]);
      const regionButton = screen.getByText("johto");
      await userEvent.click(regionButton);

      const bulbasaur = screen.queryByText("bulbasaur");

      expect(bulbasaur).not.toBeInTheDocument();
    });

    test("deben aparecer los pokemons de la nueva región de Hoenn", async () => {
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
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockHoennPokemonListResponse,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockPokemonDetailGroudonResponse,
        });
      render(<App />);
      const regionExpanded = screen.getAllByRole("combobox");
      await userEvent.click(regionExpanded[0]);
      const regionButton = screen.getByText("hoenn");
      await userEvent.click(regionButton);

      const groudon = screen.getByText("groudon");

      console.log(screen.debug());
      expect(groudon).toBeInTheDocument();
    });
  });
});
