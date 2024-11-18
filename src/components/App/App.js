import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import './App.css';
import Navbar from '../Navigation/Navigation';
import Searchbar from '../Searchbar/Searchbar';
import Pokedex from '../Header/header';
import { fetchPokemons, searchPokemon } from '../../utils/api'; 
import { FavoriteProvider } from '../contexts/favoritesContext';

function App() {
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [pokemons, setPokemons] = useState([]);
    const itensPerPage = 50;

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
        <FavoriteProvider>
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
                                    isFavoritesOnly={false}
                                />
                            )
                        } />
                        <Route path='/favorites' element={ 
                            <Pokedex
                                pokemons={pokemons}  
                                loading={loading}
                                page={page}
                                setPage={setPage}
                                totalPages={totalPages}
                                notFound={notFound}
                                isFavoritesOnly={true} 
                            />
                        } />
                    </Routes>
                </div>
            </Router>
        </FavoriteProvider>
    );
}

export default App;
