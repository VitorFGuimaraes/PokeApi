import React, { useContext } from 'react';
import '../Navigation/navigation.css';
import { FavoriteContext } from '../contexts/favoritesContext';


const Navbar = () => {
    const { favoritePokemons, updateFavoritePokemons, clearAllFavorites } = useContext(FavoriteContext); 
    const logoImg = 'https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png';

    const handleClearFavorites = () => {
        clearAllFavorites();
    };

    return (
        <nav className='navbar'>
            <div>
                <img 
                    alt='pokeapi-logo'
                    src={logoImg}
                    className='navbar__img'
                />
            </div>
            <div className='navbar__favorites'>
                {favoritePokemons.length} 💖
            </div>
            <div>
                <button 
                    className='navbar__clear-favorites-btn' 
                    onClick={handleClearFavorites}
                >
                    Limpar Favoritos
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
