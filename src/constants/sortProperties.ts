export const SORT_DEFAULT = "default";
export const SORT_ITEMS = {
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
export type SortItem = (typeof SORT_ITEMS)[number];
