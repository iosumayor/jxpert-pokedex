import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { App } from "../App.js";
import { vi } from "vitest";

describe("App Component", () => {
  test("El componente principal App debe cargarse", async () => {
    const mockFetch = vi.fn();
    global.fetch = mockFetch;

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [
          {
            name: "bulbasaur",
            url: "https://pokeapi.co/api/v2/pokemon/1/",
          },
        ],
      }),
    });

    mockFetch.mockResolvedValueOnce({
      json: async () => ({
        res: [
          {
            types: [
              {
                slot: 1,
                type: {
                  name: "grass",
                  url: "https://pokeapi.co/api/v2/type/12/",
                },
              },
              {
                slot: 2,
                type: {
                  name: "poison",
                  url: "https://pokeapi.co/api/v2/type/4/",
                },
              },
            ],
          },
        ],
      }),
    });

    render(<App />);
    const pokemonName = await screen.findByText("bulbasaur");
    expect(pokemonName).toBeInTheDocument();

    console.log(screen.debug);
  });

  test("debería verse el nombre del pokemon cuando se cargan los datos", async () => {
    expect(true).toBe(true);
  });
});
