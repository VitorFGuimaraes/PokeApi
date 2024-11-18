import React, { createContext, useState, useEffect } from 'react';

const FavoriteContext = createContext();

const FavoriteProvider = ({ children }) => {
    const [favoritePokemons, setFavoritePokemons] = useState(() => {
        const storedFavorites = localStorage.getItem('f');
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    });

    useEffect(() => {
        localStorage.setItem('f', JSON.stringify(favoritePokemons));
    }, [favoritePokemons]);  

    const updateFavoritePokemons = (pokemonName) => {
        setFavoritePokemons((prevFavorites) => {
            const updatedFavorites = [...prevFavorites];
            const index = updatedFavorites.indexOf(pokemonName);

            if (index >= 0) {
                updatedFavorites.splice(index, 1); 
            } else {
                updatedFavorites.push(pokemonName); 
            }

            return updatedFavorites;
        });
    };

    const clearAllFavorites = () => {
        setFavoritePokemons([]); 
    };

    return (
        <FavoriteContext.Provider value={{ favoritePokemons, updateFavoritePokemons, clearAllFavorites }}>
            {children}
        </FavoriteContext.Provider>
    );
};

export { FavoriteContext, FavoriteProvider };
