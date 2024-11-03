import React from 'react';
import '../Header/header.css'
import Pokemon from '../Main/Main';

const Pokedex = (props) => {
    const {pokemons, loading} = props;
    return (
        <div className='pokedex-header'>
            <div >
            <h1>Pokedex</h1>         
            </div>
            <div>Paginação:</div>
            {loading ? (<div>Carregando...</div>) : (
            <div className='pokedex-grid'>
                {pokemons && pokemons.map((pokemon, index) => {
                    return (
                   <Pokemon key={index} pokemon={pokemon} />
                    );
                })}
            </div>
            )}
        </div>
    )
}

export default Pokedex;