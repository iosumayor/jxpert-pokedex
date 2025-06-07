import React, { Dispatch, SetStateAction } from "react";
import { Region, REGIONS } from "../constants/region";
import { SORT_ITEMS, Stats } from "../constants/sortProperties";

interface Props {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  showRegions: boolean;
  setShowRegions: Dispatch<SetStateAction<boolean>>;
  showSort: boolean;
  setShowSort: React.Dispatch<React.SetStateAction<boolean>>;
  region: Region;
  setRegion: React.Dispatch<React.SetStateAction<Region>>;
  sort: Stats;
  setSort: React.Dispatch<React.SetStateAction<Stats>>;
}

export const SearchBar: React.FC<Props> = ({
  search,
  setSearch,
  showRegions,
  setShowRegions,
  showSort,
  setShowSort,
  region,
  setRegion,
  sort,
  setSort,
}) => {
  return (
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
          stroke={showSort ? "var(--color-accent)" : "var(--color-neutral-700)"}
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
  );
};
