import React, { useContext } from 'react';
import '../Navigation/navigation.css';
import { FavoriteContext } from '../contexts/favoritesContext';
import { Link, useNavigate } from 'react-router-dom';


const Navbar = () => {
    const { favoritePokemons, updateFavoritePokemons, clearAllFavorites } = useContext(FavoriteContext); 
    const logoImg = 'https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png';
    const navigate = useNavigate();

    const handleClearFavorites = () => {
        clearAllFavorites();
    };

    const handleFavoriteLink = () => {
        navigate('/favorites');
    };

    const handleHomeLink = () => {
        navigate('/');
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
            <div className='navbar__buttons-container'>
                <div>
                    
                    <button className='navbar__favorite-btn' onClick={handleFavoriteLink}
                    >
                        Favoritos
                    </button>
                </div>
                <div>
                    <Link to='/favorites'>
                        <button 
                            className='navbar__clear-favorites-btn' 
                            onClick={handleClearFavorites}
                        >
                            Limpar Favoritos
                        </button>
                    </Link>
                </div>
                <div>
                    <button 
                        className='navbar__home-btn' 
                        onClick={handleHomeLink}
                    >
                        Home
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
