import { useEffect, useState } from "react";
import { Card } from "./components/Card";
import bug from "./assets/bug.svg";
import dark from "./assets/dark.svg";
import dragon from "./assets/dragon.svg";
import electric from "./assets/electric.svg";
import fairy from "./assets/fairy.svg";
import fighting from "./assets/fighting.svg";
import fire from "./assets/fire.svg";
import flying from "./assets/flying.svg";
import ghost from "./assets/ghost.svg";
import grass from "./assets/grass.svg";
import ground from "./assets/ground.svg";
import ice from "./assets/ice.svg";
import normal from "./assets/normal.svg";
import poison from "./assets/poison.svg";
import psychic from "./assets/psychic.svg";
import rock from "./assets/rock.svg";
import steel from "./assets/steel.svg";
import water from "./assets/water.svg";
import pokeball from "./assets/pokeball.svg";

const SORT_DEFAULT = "default";
const SORT_ITEMS = {
  default: {
    aria: "Default",
    text: "Default",
  },
  hp: {
    aria: "Health points",
    text: "Hp",
  },
  attack: {
    aria: "Attack",
    text: "At",
  },
  defense: {
    aria: "Defense",
    text: "Df",
  },
  "special-attack": {
    aria: "Special attack",
    text: "SpA",
  },
  "special-defense": {
    aria: "Special defense",
    text: "SpD",
  },
  speed: {
    aria: "Speed",
    text: "Spd",
  },
} as const;

export const STAT_NAMES = ["Hp", "At", "Df", "SpA", "SpD", "Spd"] as const;

// type Stat = (typeof STAT_NAMES)[number]

type SortItem = (typeof SORT_ITEMS)[number];

type Icons = {
  [key: string]: string;
};
export const icons: Icons = {
  bug,
  dark,
  dragon,
  electric,
  fairy,
  fighting,
  fire,
  flying,
  ghost,
  grass,
  ground,
  ice,
  normal,
  poison,
  psychic,
  rock,
  steel,
  water,
};

const REGIONS = [
  "kanto",
  "johto",
  "hoenn",
  "sinnoh",
  "unova",
  "kalos",
  "alola",
  "galar",
  "paldea",
] as const;

type Region = (typeof REGIONS)[number];

type RegionRangeItem = {
  start: number;
  end: number;
};

const regionRanges: Record<Region, RegionRangeItem> = {
  kanto: {
    start: 0,
    end: 151,
  },
  johto: {
    start: 151,
    end: 251,
  },
  hoenn: {
    start: 251,
    end: 386,
  },
  sinnoh: {
    start: 386,
    end: 494,
  },
  unova: {
    start: 494,
    end: 649,
  },
  kalos: {
    start: 649,
    end: 721,
  },
  alola: {
    start: 721,
    end: 809,
  },
  galar: {
    start: 809,
    end: 905,
  },
  paldea: {
    start: 905,
    end: 1025,
  },
} as const;

const getCurrentRegion = (region: Region) => {
  if (REGIONS.includes(region)) {
    return regionRanges[region];
  }

  return regionRanges.kanto;
};

const getPokemonsData = async (region: Region) => {
  const { start, end } = getCurrentRegion(region);
  const { results }: any = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${start}&limit=${end}`,
  ).then((apiPokemonList) => apiPokemonList.json());
  const pokemonsData = await Promise.all(
    results.map(
      async ({ url }) =>
        await fetch(url).then((apiPokemonDetail) => apiPokemonDetail.json()),
    ),
  );
  return pokemonsData;
};

export const App = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<boolean>(false);
  const [pokemons, setPokemons] = useState<any>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<any>([]);
  const [search, setSearch] = useState<string>("");
  const [region, setRegion] = useState<Region>("kanto");
  const [showRegions, setShowRegions] = useState<boolean>(false);
  const [showSort, setShowSort] = useState<boolean>(false);
  const [sort, setSort] = useState<SortItem>("default");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setFilter(true);

      const pokemonsData = await getPokemonsData(region);

      setPokemons(pokemonsData);
      setFilteredPokemons(pokemonsData);
      setLoading(false);
    };

    fetchData();
  }, [region]);

  /**
   * Filters results based on input query term.
   */
  const findByName = (pokemon) => {
    return pokemon.name.toLowerCase().includes(search.toLowerCase());
  };

  const findByType = (pokemon) => {
    return pokemon.types.find((type) =>
      type.type.name.startsWith(search.toLowerCase()),
    );
  };

  useEffect(() => {
    setFilteredPokemons(
      pokemons.filter(
        (pokemon) => findByName(pokemon) || !!findByType(pokemon),
      ),
    );
    setFilter(false);
  }, [pokemons[0]?.id, search]);
  /**
   * Sorts results based on selected sorting criteria.
   */
  const sortByProperty = (property: string) => {
    setFilteredPokemons((previous) =>
      [...previous].sort((pokemon1, pokemon2) => {
        const pokemon1Stat = pokemon1.stats.find(
          (stat) => stat.stat.name === property,
        );
        const pokemon2Stat = pokemon2.stats.find(
          (stat) => stat.stat.name === property,
        );
        return pokemon2Stat.base_stat - pokemon1Stat.base_stat;
      }),
    );
  };

  useEffect(() => {
    if (sort === SORT_DEFAULT) {
      setFilteredPokemons((previous) =>
        [...previous].sort((a, b) => {
          return a.id - b.id;
        }),
      );
      return;
    }
    sortByProperty(sort);
  }, [filteredPokemons[0]?.id, sort]);

  return (
    <div className="layout">
      <header className="header">
        <img src={pokeball} alt="" className="header__logo" />
        <p className="header__title">Pokédex</p>
      </header>

      {/* Searcher */}
      <main className="container">
        <section className="search">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="search__icon"
          >
            <path
              d="M3 10C3 10.9193 3.18106 11.8295 3.53284 12.6788C3.88463 13.5281 4.40024 14.2997 5.05025 14.9497C5.70026 15.5998 6.47194 16.1154 7.32122 16.4672C8.1705 16.8189 9.08075 17 10 17C10.9193 17 11.8295 16.8189 12.6788 16.4672C13.5281 16.1154 14.2997 15.5998 14.9497 14.9497C15.5998 14.2997 16.1154 13.5281 16.4672 12.6788C16.8189 11.8295 17 10.9193 17 10C17 9.08075 16.8189 8.1705 16.4672 7.32122C16.1154 6.47194 15.5998 5.70026 14.9497 5.05025C14.2997 4.40024 13.5281 3.88463 12.6788 3.53284C11.8295 3.18106 10.9193 3 10 3C9.08075 3 8.1705 3.18106 7.32122 3.53284C6.47194 3.88463 5.70026 4.40024 5.05025 5.05025C4.40024 5.70026 3.88463 6.47194 3.53284 7.32122C3.18106 8.1705 3 9.08075 3 10Z"
              stroke="var(--color-neutral-400)"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 21L15 15"
              stroke="var(--color-neutral-400)"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            type="text"
            placeholder="Search a Pokémon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {/* Shows regions */}
          <div className="dropdown">
            <button
              role="combobox"
              aria-haspopup="listbox"
              aria-controls="region-list"
              aria-label="Select region"
              aria-expanded={showRegions}
              className={`dropdown__button ${showRegions ? "active" : ""}`}
              onClick={() =>
                setShowRegions((prev) => {
                  if (showSort) {
                    setShowSort(false);
                  }
                  return !prev;
                })
              }
            >
              {region}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.33337 5.99999L8.00004 3.33333L10.6667 5.99999"
                  stroke="var(--color-neutral-600)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.6667 10L8.00004 12.6667L5.33337 10"
                  stroke="var(--color-neutral-600)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <ol
              role="listbox"
              id="region-list"
              hidden={!showRegions}
              className={`dropdown__list ${!showRegions ? "hide" : ""}`}
            >
              {REGIONS.map((key) => (
                <li
                  key={key}
                  role="radio"
                  aria-checked={region === key}
                  tabIndex={0}
                  className={region === key ? "active" : ""}
                  onClick={() => {
                    setRegion(key);
                    setShowRegions(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setRegion(key);
                      setShowRegions(false);
                    }
                  }}
                >
                  {key}
                </li>
              ))}
            </ol>
          </div>

          <button
            role="combobox"
            aria-haspopup="listbox"
            aria-controls="sort-list"
            aria-label="Sort by"
            aria-expanded={showSort}
            className="sort__button"
            onClick={() =>
              setShowSort((prev) => {
                if (showRegions) setShowRegions(false);
                return !prev;
              })
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke={
                showSort ? "var(--color-accent)" : "var(--color-neutral-700)"
              }
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 6l9 0" />
              <path d="M4 12l7 0" />
              <path d="M4 18l7 0" />
              <path d="M15 15l3 3l3 -3" />
              <path d="M18 6l0 12" />
            </svg>
          </button>

          {showSort && (
            <article className="sort__wrapper">
              <h3 className="sort__title">Sort by</h3>
              <div className="sort__items" role="listbox" id="sort-list">
                {Object.keys(SORT_ITEMS).map((key) => (
                  <span
                    key={key}
                    role="radio"
                    aria-label={SORT_ITEMS[key].aria}
                    tabIndex={0}
                    className={`sort__pill ${sort === key ? "active" : ""}`}
                    aria-checked={sort === key}
                    onClick={() => {
                      setSort(key);
                      setShowSort(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setSort(key);
                        setShowSort(false);
                      }
                    }}
                  >
                    {" "}
                    {SORT_ITEMS[key].text}
                  </span>
                ))}
              </div>
            </article>
          )}
        </section>

        {/* Shows loading cards */}
        <section>
          {(loading || filter) && (
            <div className="grid" data-testid="grid" aria-hidden="true">
              {Array.from({ length: 6 }, (_, index) => {
                return (
                  <article
                    key={`placeholder-card-${index}`}
                    className="card card-placeholder"
                    data-testid="card"
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M12,2C17.52,2 22,6.48 22,12C22,17.52 17.52,22 12,22C6.48,22 2,17.52 2,12C2,6.48 6.48,2 12,2M12,4C7.92,4 4.55,7.05 4.06,11H8.13C8.57,9.27 10.14,8 12,8C13.86,8 15.43,9.27 15.87,11H19.94C19.45,7.05 16.08,4 12,4M12,20C16.08,20 19.45,16.95 19.94,13H15.87C15.43,14.73 13.86,16 12,16C10.14,16 8.57,14.73 8.13,13H4.06C4.55,16.95 7.92,20 12,20M12,10C10.9,10 10,10.9 10,12C10,13.1 10.9,14 12,14C13.1,14 14,13.1 14,12C14,10.9 13.1,10 12,10Z" />
                    </svg>
                  </article>
                );
              })}
            </div>
          )}
          {/* Prints cards */}
          {!filter && !loading && filteredPokemons.length > 0 && (
            <ul className="grid" data-testid="grid">
              {filteredPokemons.map((res) => {
                return (
                  <li key={`pokemon-card-${res.id}`}>
                    <Card pokemon={res} />
                  </li>
                );
              })}
            </ul>
          )}
        </section>
        {!loading && filteredPokemons.length === 0 && (
          <p className="noresults">No results for “{search}“</p>
        )}
      </main>

      <footer className="footer">
        <p>
          ©{new Date().getFullYear()} Pokémon. ©1995 -{" "}
          {new Date().getFullYear()} Nintendo/Creatures Inc./GAME FREAK inc. TM,
          ®Nintendo.
        </p>
      </footer>
    </div>
  );
};
