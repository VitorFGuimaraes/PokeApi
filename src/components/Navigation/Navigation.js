import React, { useContext } from 'react';
import '../Navigation/navigation.css';
import FavoriteContext from '../contexts/favoritesContext';

const Navbar = () => {
    const { favoritePokemons } = useContext(FavoriteContext);
    const logoImg = 'https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png';

    return (
        <nav className="navbar">
            <div className="navbar__logo-container">
                <img 
                    alt="pokeapi-logo" 
                    src={logoImg}
                    className="navbar__logo-img"
                />
            </div>
            <div className="navbar__favorites">
                {favoritePokemons.length}💖
            </div>
        </nav>
    );
}

export default Navbar;
