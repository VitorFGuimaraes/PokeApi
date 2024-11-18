import React, { createContext, useState } from 'react';

const FavoriteContext = createContext();

const FavoriteProvider = ({ children }) => {
    const [favoritePokemons, setFavoritePokemons] = useState(
        JSON.parse(localStorage.getItem('f')) || []
    );

    const updateFavoritePokemons = (pokemonName) => {
        const updatedFavorites = [...favoritePokemons];
        const index = updatedFavorites.indexOf(pokemonName);

        if (index >= 0) {
            updatedFavorites.splice(index, 1);
        } else {
            updatedFavorites.push(pokemonName); 
        }

        localStorage.setItem('f', JSON.stringify(updatedFavorites));
        setFavoritePokemons(updatedFavorites);
    };

    const clearAllFavorites = () => {
        localStorage.removeItem('f');
        setFavoritePokemons([]);
    };

    return (
        <FavoriteContext.Provider
            value={{
                favoritePokemons,
                updateFavoritePokemons,
                clearAllFavorites,
            }}
        >
            {children}
        </FavoriteContext.Provider>
    );
};

export { FavoriteContext, FavoriteProvider };
