import { FavouritePokemonRepository } from "../domain/FavouritePokemonRepository";
import { Pokemon } from "../domain/Pokemon";

export const LocalStoragePokemonRepository: FavouritePokemonRepository = {
    listFavourites: () => {
        let favouritePokemons = localStorage.getItem("favouritePokemons")
        if (favouritePokemons === null) {
            favouritePokemons = '[]'
        }
        return JSON.parse(favouritePokemons);
    },

    addFavourite: (pokemon: Pokemon) => {
        let favouritePokemons = localStorage.getItem("favouritePokemons")
        if (favouritePokemons === null) {
            favouritePokemons = '[]'
        }
        const favouritePokemonsParsed: Pokemon[] = JSON.parse(favouritePokemons);
        if(!favouritePokemonsParsed?.some((pok) => pok.id === pokemon.id)){
            favouritePokemonsParsed.push(pokemon)
            localStorage.setItem("favouritePokemons", JSON.stringify(favouritePokemonsParsed));
        }
    },
    
    deleteFavourite: (pokemon: Pokemon) => {
        let favouritePokemons = localStorage.getItem("favouritePokemons")
        if (favouritePokemons === null) {
            return
        }
        const favouritePokemonsParsed: Pokemon[] = JSON.parse(favouritePokemons);
        if(favouritePokemonsParsed?.some((pok) => pok.id === pokemon.id)){
            const index = favouritePokemonsParsed.indexOf(pokemon)
            if (index > -1) { 
                favouritePokemonsParsed.splice(index, 1); 
            }
            localStorage.setItem("favouritePokemons", JSON.stringify(favouritePokemonsParsed));
        }
    }
}