import { useEffect, useState } from "react";
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

const KANTO_REGION: string = "kanto";
const JOHTO_REGION: string = "johto";
const HOENN_REGION: string = "hoenn";
const SINNOH_REGION: string = "sinnoh";
const UNOVA_REGION: string = "unova";
const KALOS_REGION: string = "kalos";
const ALOLA_REGION: string = "alola";
const GALAR_REGION: string = "galar";
const PALDEA_REGION: string = "paldea";

const pokemonProperties = {
  hp: "hp",
  attack: "attack",
  defense: "defense",
  specialAttack: "special-attack",
  specialDefense: "special-defense",
  speed: "speed",
};

type Icons = {
  [key: string]: string;
};
const icons: Icons = {
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

const regions: string[] = [
  KANTO_REGION,
  JOHTO_REGION,
  HOENN_REGION,
  SINNOH_REGION,
  UNOVA_REGION,
  KALOS_REGION,
  ALOLA_REGION,
  GALAR_REGION,
  PALDEA_REGION,
];

const SORT_DEFAULT: string = "default";

const regionRanges = {
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
};

export const App = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<boolean>(false);
  const [result, setResult] = useState<any>([]);
  const [finalResult, setFinalResult] = useState<any>([]);
  const [search, setSearch] = useState<string>("");
  const [region, setRegion] = useState<string>(KANTO_REGION);
  const [showRegs, setShowregs] = useState<boolean>(false);
  const [showSort, setShowSort] = useState<boolean>(false);
  const [sort, setSort] = useState<string>(SORT_DEFAULT);

  useEffect(() => {
    /**
     *  Pokemon data loading and loading state management
     */
    const getData = async () => {
      setLoading(true);
      setFilter(true);

      let regionStart: number;
      let regionEnd: number;
      if (!regions.includes(region)) {
        regionStart = 0;
        regionEnd = 151;
      } else {
        regionStart = regionRanges[region].start;
        regionEnd = regionRanges[region].end;
      }
      const { results }: any = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${regionStart}&limit=${regionEnd}`,
      ).then((apiPokemonList) => apiPokemonList.json());
      const result = await Promise.all(
        results.map(
          async ({ url }) =>
            await fetch(url).then((apiPokemonDetail) =>
              apiPokemonDetail.json(),
            ),
        ),
      );
      setResult(result);
      setFinalResult(result);
      setLoading(false);
    };
    getData();
  }, [region]);
  /**
   * Filters results based on input query term.
   */
  useEffect(() => {
    setFinalResult(
      result.filter(
        (res) =>
          res.name.includes(search.toLowerCase()) ||
          !!res.types.find((type) =>
            type.type.name.startsWith(search.toLowerCase()),
          ),
      ),
    );
    setFilter(false);
  }, [result[0]?.id, search]);
  /**
   * Sorts results based on selected sorting criteria.
   */
  useEffect(() => {
    if (sort !== SORT_DEFAULT) {
      if (sort === pokemonProperties.hp) {
        setFinalResult((prev) =>
          [...prev].sort((a, b) => {
            const aStat = a.stats.find(
              (stat) => stat.stat.name === pokemonProperties.hp,
            );
            const bStat = b.stats.find(
              (stat) => stat.stat.name === pokemonProperties.hp,
            );
            return bStat.base_stat - aStat.base_stat;
          }),
        );
      }
      if (sort === pokemonProperties.attack) {
        setFinalResult((prev) =>
          [...prev].sort((a, b) => {
            const aStat = a.stats.find(
              (stat) => stat.stat.name === pokemonProperties.attack,
            );
            const bStat = b.stats.find(
              (stat) => stat.stat.name === pokemonProperties.attack,
            );
            return bStat.base_stat - aStat.base_stat;
          }),
        );
      }
      if (sort === pokemonProperties.defense) {
        setFinalResult((prev) =>
          [...prev].sort((a, b) => {
            const aStat = a.stats.find(
              (stat) => stat.stat.name === pokemonProperties.defense,
            );
            const bStat = b.stats.find(
              (stat) => stat.stat.name === pokemonProperties.defense,
            );
            return bStat.base_stat - aStat.base_stat;
          }),
        );
      }
      if (sort === "specialAttack") {
        setFinalResult((prev) =>
          [...prev].sort((a, b) => {
            const aStat = a.stats.find(
              (stat) => stat.stat.name === pokemonProperties.specialAttack,
            );
            const bStat = b.stats.find(
              (stat) => stat.stat.name === pokemonProperties.specialAttack,
            );
            return bStat.base_stat - aStat.base_stat;
          }),
        );
      }
      if (sort === "specialDefense") {
        setFinalResult((prev) =>
          [...prev].sort((a, b) => {
            const aStat = a.stats.find(
              (stat) => stat.stat.name === pokemonProperties.specialDefense,
            );
            const bStat = b.stats.find(
              (stat) => stat.stat.name === pokemonProperties.specialDefense,
            );
            return bStat.base_stat - aStat.base_stat;
          }),
        );
      }
      if (sort === pokemonProperties.speed) {
        setFinalResult((prev) =>
          [...prev].sort((a, b) => {
            const aStat = a.stats.find(
              (stat) => stat.stat.name === pokemonProperties.speed,
            );
            const bStat = b.stats.find(
              (stat) => stat.stat.name === pokemonProperties.speed,
            );
            return bStat.base_stat - aStat.base_stat;
          }),
        );
      }
    }
    if (sort === SORT_DEFAULT) {
      setFinalResult((prev) =>
        [...prev].sort((a, b) => {
          return a.id - b.id;
        }),
      );
    }
  }, [finalResult[0]?.id, sort]);

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
              aria-expanded={showRegs}
              className={`dropdown__button ${showRegs ? "active" : ""}`}
              onClick={() =>
                setShowregs((prev) => {
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
              hidden={!showRegs}
              className={`dropdown__list ${!showRegs ? "hide" : ""}`}
            >
              {regions.map((key) => (
                <li
                  key={key}
                  role="radio"
                  aria-checked={region === key}
                  tabIndex={0}
                  className={region === key ? "active" : ""}
                  onClick={() => {
                    setRegion(key);
                    setShowregs(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setRegion(key);
                      setShowregs(false);
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
                if (showRegs) setShowregs(false);
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
                <span
                  role="radio"
                  aria-label="Default"
                  tabIndex={0}
                  className={`sort__pill ${sort === SORT_DEFAULT ? "active" : ""}`}
                  aria-checked={sort === SORT_DEFAULT}
                  onClick={() => {
                    setSort(SORT_DEFAULT);
                    setShowSort(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSort(SORT_DEFAULT);
                      setShowSort(false);
                    }
                  }}
                >
                  {" "}
                  Default
                </span>
                <span
                  role="radio"
                  aria-label="Health points"
                  tabIndex={0}
                  className={`sort__pill ${sort === "hp" ? "active" : ""}`}
                  aria-checked={sort === "hp"}
                  onClick={() => {
                    setSort("hp");
                    setShowSort(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSort("hp");
                      setShowSort(false);
                    }
                  }}
                >
                  {" "}
                  Hp
                </span>
                <span
                  role="radio"
                  aria-label="Attack"
                  tabIndex={0}
                  className={`sort__pill ${sort === "attack" ? "active" : ""}`}
                  aria-checked={sort === "attack"}
                  onClick={() => {
                    setSort("attack");
                    setShowSort(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSort("attack");
                      setShowSort(false);
                    }
                  }}
                >
                  {" "}
                  At
                </span>
                <span
                  role="radio"
                  aria-label="Defense"
                  tabIndex={0}
                  className={`sort__pill ${sort === "defense" ? "active" : ""}`}
                  aria-checked={sort === "defense"}
                  onClick={() => {
                    setSort("defense");
                    setShowSort(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSort("defense");
                      setShowSort(false);
                    }
                  }}
                >
                  Df
                </span>
                <span
                  role="radio"
                  aria-label="Special attack"
                  tabIndex={0}
                  className={`sort__pill ${
                    sort === "specialAttack" ? "active" : ""
                  }`}
                  aria-checked={sort === "specialAttack"}
                  onClick={() => {
                    setSort("specialAttack");
                    setShowSort(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSort("specialAttack");
                      setShowSort(false);
                    }
                  }}
                >
                  {" "}
                  SpA
                </span>
                <span
                  role="radio"
                  aria-label="Special defense"
                  tabIndex={0}
                  className={`sort__pill ${
                    sort === "specialDefense" ? "active" : ""
                  }`}
                  aria-checked={sort === "specialDefense"}
                  onClick={() => {
                    setSort("specialDefense");
                    setShowSort(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSort("specialDefense");
                      setShowSort(false);
                    }
                  }}
                >
                  SpD
                </span>
                <span
                  role="radio"
                  aria-label="Speed"
                  tabIndex={0}
                  className={`sort__pill ${sort === "speed" ? "active" : ""}`}
                  aria-checked={sort === "speed"}
                  onClick={() => {
                    setSort("speed");
                    setShowSort(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSort("speed");
                      setShowSort(false);
                    }
                  }}
                >
                  {" "}
                  Spd
                </span>
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
          {!filter && !loading && finalResult.length > 0 && (
            <ul className="grid" data-testid="grid">
              {finalResult.map((res) => {
                const customStyles: any = {
                  "--color-type": `var(--color-${res.types[0].type.name}`,
                };

                return (
                  <li key={`pokemon-card-${res.id}`}>
                    <article className="card" style={customStyles}>
                      <header className="card__head">
                        <div className="card__tag">
                          <p>#{res.id.toString().padStart(3, "0")}</p>
                        </div>
                        <div className="card__tag">
                          <img
                            src={icons[res.types[0].type.name]}
                            className="card__type"
                            alt={`${res.types[0].type.name} primary type`}
                          />
                          {res.types[1] && (
                            <img
                              src={icons[res.types[1].type.name]}
                              className="card__type"
                              alt={`${res.types[1].type.name} secondary type`}
                            />
                          )}
                        </div>
                      </header>
                      <img
                        className="card__avatar"
                        src={
                          res.sprites.other["official-artwork"].front_default
                        }
                        loading="lazy"
                        alt={`${res.name} artwork`}
                      />
                      <section className="card__content">
                        <h3 className="card__title">{res.name}</h3>
                        <ul aria-description="Stats resume">
                          <li className="card__stat" aria-label="Health points">
                            <div className="stat__value">
                              <p className="stat__name" aria-hidden="true">
                                Hp
                              </p>
                              <p>{res.stats[0].base_stat}</p>
                            </div>
                            <progress
                              value={res.stats[0].base_stat}
                              max="255"
                            ></progress>
                          </li>
                          <li className="card__stat" aria-label="Attack">
                            <div className="stat__value">
                              <p className="stat__name" aria-hidden="true">
                                At
                              </p>
                              <p>{res.stats[1].base_stat}</p>
                            </div>
                            <progress
                              value={res.stats[1].base_stat}
                              max="255"
                            ></progress>
                          </li>
                          <li className="card__stat" aria-label="Defense">
                            <div className="stat__value">
                              <p className="stat__name" aria-hidden="true">
                                Df
                              </p>
                              <p>{res.stats[2].base_stat}</p>
                            </div>
                            <progress
                              value={res.stats[2].base_stat}
                              max="255"
                            ></progress>
                          </li>
                          <li
                            className="card__stat"
                            aria-label="Special attack"
                          >
                            <div className="stat__value">
                              <p className="stat__name" aria-hidden="true">
                                SpA
                              </p>
                              <p>{res.stats[3].base_stat}</p>
                            </div>
                            <progress
                              value={res.stats[3].base_stat}
                              max="255"
                            ></progress>
                          </li>
                          <li
                            className="card__stat"
                            aria-label="Special defense"
                          >
                            <div className="stat__value">
                              <p className="stat__name" aria-hidden="true">
                                SpD
                              </p>
                              <p>{res.stats[4].base_stat}</p>
                            </div>
                            <progress
                              value={res.stats[4].base_stat}
                              max="255"
                            ></progress>
                          </li>
                          <li className="card__stat" aria-label="Speed">
                            <div className="stat__value">
                              <p className="stat__name" aria-hidden="true">
                                Spd
                              </p>
                              <p>{res.stats[5].base_stat}</p>
                            </div>
                            <progress
                              value={res.stats[5].base_stat}
                              max="255"
                            ></progress>
                          </li>
                        </ul>
                      </section>
                    </article>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
        {!loading && finalResult.length === 0 && (
          <p className="noresults">No results for "{search}"</p>
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
