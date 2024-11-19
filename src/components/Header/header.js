import React, { useContext } from 'react';
import '../Header/header.css';
import Pokemon from '../Main/main';
import Pagination from '../Pagination/Pagination';
import { FavoriteContext } from '../contexts/favoritesContext';

const Pokedex = (props) => {
    const { pokemons = [], loading, page, setPage, totalPages, isFavoritesOnly, notFound } = props;
    const { favoritePokemons } = useContext(FavoriteContext);  

    const displayedPokemons = isFavoritesOnly
        ? pokemons.filter(pokemon => favoritePokemons.includes(pokemon.name))
        : pokemons;

    const onLeftClick = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    const onRightClick = () => {
        if (page + 1 !== totalPages) {
            setPage(page + 1);
        }
    };

    return (
        <div className="pokedex">
            <div className="pokedex__header">
                <h1>{isFavoritesOnly ? 'Favoritos' : 'Pokedex'}</h1>
                <Pagination
                    page={page + 1}
                    totalPages={totalPages}
                    onLeftClick={onLeftClick}
                    onRightClick={onRightClick}
                />
            </div>
            {loading ? (
                <div className="pokedex__loading">Carregando...</div>
            ) : notFound ? (
                <div className="pokedex__not-found">Esse Pokémon não existe!</div>
            ) : (
                <div className="pokedex__grid">
                    {displayedPokemons.length > 0 ? (
                        displayedPokemons.map((pokemon, index) => (
                            <Pokemon key={index} pokemon={pokemon} />
                        ))
                    ) : (
                        <div className="pokedex__not-found">Nenhum Pokémon favoritado ainda!</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Pokedex;
