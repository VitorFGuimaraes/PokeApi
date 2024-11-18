import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import './App.css';
import Navbar from '../Navigation/Navigation';
import Searchbar from '../Searchbar/Searchbar';
import Pokedex from '../Header/header';
import { fetchPokemons, searchPokemon } from '../../utils/api'; // Importa apenas funções
import { FavoriteProvider } from '../contexts/favoritesContext';
import { FavoriteContext } from '../contexts/favoritesContext';

function App() {
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [pokemons, setPokemons] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const itensPerPage = 50;
    const favoritePokemons = useContext(FavoriteContext);

    const loadPokemons = async () => {
        try {
            setLoading(true);
            setNotFound(false);
            const data = await fetchPokemons(itensPerPage, page);
            setPokemons(data.results);
            setTotalPages(Math.ceil(data.count / itensPerPage));
        } catch (error) {
            console.log('Erro ao carregar Pokémons:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPokemons();
    }, [page]);

    const loadFavoritePokemons = () => {
        const pokemons = JSON.parse(window.localStorage.getItem('f')) || [];
        setFavorites(pokemons);
    };

    useEffect(() => {
        loadFavoritePokemons();
    }, []);

    const updateFavoritePokemons = (name) => {
        const updateFavorites = [...favorites];
        const favoriteIndex = favorites.indexOf(name);
        if (favoriteIndex >= 0) {
            updateFavorites.splice(favoriteIndex, 1);
        } else {
            updateFavorites.push(name);
        }
        window.localStorage.setItem('f', JSON.stringify(updateFavorites));
        setFavorites(updateFavorites);
    };

    const onSearchHandler = async (pokemon) => {
        if (!pokemon) {
            return loadPokemons();
        }

        setLoading(true);
        setNotFound(false);
        const result = await searchPokemon(pokemon);
        if (!result) { 
            setNotFound(true); 
            setPokemons([]); 
        } else {
            setPokemons([result]);
            setPage(0);
            setTotalPages(1);
        }
        setLoading(false);
    };

    return (
        <FavoriteProvider
            value={{
                favoritePokemons: favorites,
                updateFavoritePokemons: updateFavoritePokemons
            }}
        >
            <Router>
                <div className='app'>
                    <Navbar />
                    <Searchbar onSearch={onSearchHandler} />
                    <Routes>
                        <Route exact path='/' element={
                            notFound ? (
                                <div className='app__not-found-text'>Esse Pokémon não existe!</div>
                            ) : (
                                <Pokedex
                                    pokemons={pokemons}
                                    loading={loading}
                                    page={page}
                                    setPage={setPage}
                                    totalPages={totalPages}
                                    notFound={notFound}
                                />
                            )
                        } />
                        <Route path='/favorites' element={
                            favorites.length > 0 ? (
                                <Pokedex
                                    pokemons={pokemons.filter(pokemon => favorites.includes(pokemon.name))}
                                    loading={loading}
                                    page={page}
                                    setPage={setPage}
                                    totalPages={totalPages}
                                    notFound={notFound}
                                />
                            ) : (
                                <div className='app__not-found-text'>Nenhum Pokémon favoritado ainda!</div>
                            )
                        } />
                    </Routes>
                </div>
            </Router>
        </FavoriteProvider>
    );
}

export default App;
