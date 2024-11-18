import React from 'react';
import '../Header/header.css';
import Pokemon from '../Main/main';
import Pagination from '../Pagination/Pagination';

const Pokedex = (props) => {
    const { pokemons, loading, page, setPage, totalPages } = props;

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
                <h1>Pokedex</h1>
                <Pagination
                    page={page + 1}
                    totalPages={totalPages}
                    onLeftClick={onLeftClick}
                    onRightClick={onRightClick}
                />
            </div>
            {loading ? (
                <div className="pokedex__loading">Carregando...</div>
            ) : (
                <div className="pokedex__grid">
                    {pokemons &&
                        pokemons.map((pokemon, index) => {
                            return <Pokemon key={index} pokemon={pokemon} />;
                        })}
                </div>
            )}
        </div>
    );
};

export default Pokedex;
