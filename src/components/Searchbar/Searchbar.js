import React, { useState } from 'react';
import { searchPokemon } from '../../utils/api';

const Searchbar = () => {
    const [search, setSearch] = useState('')
    const [pokemon, setPokemon] = useState()
    const onChangeHandler = (e) => {
       setSearch(e.target.value)
    }
   
    const onButtonClickHandler = () => {
        onSearchHandler(search)
    }

    const onSearchHandler = async (pokemon) => {
        const result = await searchPokemon(pokemon)
        setPokemon(result)        
    }    

    return (
        <div className='searchbar-container'>
            <div className='searchbar'>
                <input placeholder='Buscar Pokemon' onChange={onChangeHandler}/>
            </div>
            <div className='searchbar-btn'>
                <button onClick={onButtonClickHandler} >Buscar</button>
            </div>
            {pokemon ? (
                <div>
                    <div>Nome: {pokemon.name}</div>
                    <div>Tipo: {pokemon.types.map(t => t.type.name).join(',')}</div>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                </div>
            ) : null}
        </div>
    )
}

export default Searchbar;