import React from 'react';
import '../Header/header.css';
import Pokemon from '../Main/main';
import Pagination from '../Pagination/Pagination'

const Pokedex = (props) => {
    const { pokemons, loading, page, totalPages } = props;
    const onLeftClick = () => {
        
    }
    const onRightClick = () => {

    }
    return (
        <div>
            <div className='pokedex-header'>
                <h1>Pokedex</h1>
                <Pagination 
                    page={page+1}
                    totalPages={totalPages}
                    onLeftClick={onLeftClick}
                    onRightClick={onRightClick}
                />
            </div>
            {loading ? (
                <div>Carregando...</div>
            ) : (
                <div className='pokedex-grid'>
                    {pokemons && pokemons.map((pokemon, index) => {
                        return (
                            <Pokemon key={index} pokemon={pokemon} />
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Pokedex;