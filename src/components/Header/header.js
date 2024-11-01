import React from 'react';
import '../Header/header.css'

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
                    <div>
                        <div> Nome: {pokemon.name}</div>
                        <img alt={pokemon.name} src={pokemon.url}  />
                    </div>
                    );
                })}
            </div>
            )}
        </div>
    )
}

export default Pokedex;