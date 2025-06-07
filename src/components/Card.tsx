import { icons, STAT_NAMES } from "../App";

export const Card = ({ pokemon }: { pokemon: any }) => {
  const customStyles: any = {
    "--color-type": `var(--color-${pokemon.types[0].type.name}`,
  };

  return (
    <article className="card" style={customStyles}>
      <header className="card__head">
        <div className="card__tag">
          <p>#{pokemon.id.toString().padStart(3, "0")}</p>
        </div>
        <div className="card__tag">
          <img
            src={icons[pokemon.types[0].type.name]}
            className="card__type"
            alt={`${pokemon.types[0].type.name} primary type`}
          />
          {pokemon.types[1] && (
            <img
              src={icons[pokemon.types[1].type.name]}
              className="card__type"
              alt={`${pokemon.types[1].type.name} secondary type`}
            />
          )}
        </div>
      </header>
      <img
        className="card__avatar"
        src={pokemon.sprites.other["official-artwork"].front_default}
        loading="lazy"
        alt={`${pokemon.name} artwork`}
      />
      <section className="card__content">
        <h3 className="card__title">{pokemon.name}</h3>
        <ul aria-description="Stats resume">
          {STAT_NAMES.map((key, index) => (
            <>
              <li className="card__stat" aria-label="Health points">
                <div className="stat__value">
                  <p className="stat__name" aria-hidden="true">
                    {key}
                  </p>
                  <p>{pokemon.stats[index].base_stat}</p>
                </div>
                <progress
                  value={pokemon.stats[index].base_stat}
                  max="255"
                ></progress>
              </li>
            </>
          ))}
        </ul>
      </section>
    </article>
  );
};
