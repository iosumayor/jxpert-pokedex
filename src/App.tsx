import { useState } from "react";
import { Card } from "./components/Card";
import pokeball from "./assets/pokeball.svg";
import { usePokemons } from "./hooks/usePokemons";
import { SearchBar } from "./components/SearchBar";

export const App = () => {
  const [showRegions, setShowRegions] = useState<boolean>(false);
  const [showSort, setShowSort] = useState<boolean>(false);

  const {
    loading,
    filter,
    filteredPokemons,
    region,
    setRegion,
    setSort,
    sort,
    setSearch,
    search,
  } = usePokemons();

  return (
    <div className="layout">
      <header className="header">
        <img src={pokeball} alt="" className="header__logo" />
        <p className="header__title">Pokédex</p>
      </header>

      {/* Searcher */}
      <main className="container">
        <SearchBar
          search={search}
          setSearch={setSearch}
          showRegions={showRegions}
          setShowRegions={setShowRegions}
          showSort={showSort}
          setShowSort={setShowSort}
          region={region}
          setRegion={setRegion}
          sort={sort}
          setSort={setSort}
        />

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
