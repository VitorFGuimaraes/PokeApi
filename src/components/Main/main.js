import React, { useContext } from 'react';
import '../Main/main.css';
import { FavoriteContext } from '../contexts/favoritesContext';


const Pokemon = (props) => {
    const { favoritePokemons, updateFavoritePokemons } = useContext(FavoriteContext);
    const { pokemon } = props;

    const onHeartClick = () => { 
        updateFavoritePokemons(pokemon.name);    
    };

    const heart = favoritePokemons.includes(pokemon.name) ? '💖' : '❤';

    return (
        <div className="pokemon-card">
            <div className="pokemon-card__image-container"> 
                <img alt={pokemon.name} src={pokemon.sprites.front_default} className="pokemon-card__image" />
            </div>
            <div className="pokemon-card__body">
                <div className="pokemon-card__top">
                    <h3>{pokemon.name}</h3> 
                    <div>#{pokemon.id}</div>
                </div>
                <div className="pokemon-card__bottom">
                    <div className="pokemon-card__type">
                        {pokemon.types.map((type, index) => (
                            <div key={index} className="pokemon-card__type-text">
                                {type.type.name}
                            </div>          
                        ))}
                    </div>
                    <button className="pokemon-card__heart-btn" onClick={onHeartClick}>
                        {heart}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Pokemon;
