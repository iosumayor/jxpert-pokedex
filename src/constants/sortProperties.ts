type STATS = [
  "default",
  "hp",
  "attack",
  "defense",
  "special-attack",
  "special-defense",
  "speed",
];

export type Stats = STATS[number];

type StatsItem = {
  aria: string;
  text: string;
};

export const SORT_DEFAULT = "default";

export const SORT_ITEMS: Record<Stats, StatsItem> = {
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
