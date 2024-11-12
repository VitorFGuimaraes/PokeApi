import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from '../Navigation/Navigation';
import Searchbar from '../Searchbar/Searchbar';
import Pokedex from '../Header/header';
import { getPokemonData, getPokemons } from '../../utils/api';
import '../Pagination/pagination.css';
import { FavoriteProvider } from '../contexts/favoritesContext';


function App() {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const itensPerPage = 50

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const data = await getPokemons(itensPerPage, itensPerPage * page);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });

      const results = await Promise.all(promises);
      setPokemons(results);
      setLoading(false);
      setTotalPages(Math.ceil(data.count / itensPerPage))
    } catch (error) {
      console.log("fetchPokemonsError: ", error);
    }
  };
  useEffect(() => {
    fetchPokemons();
  }, [page]);

  const updateFavoritePokemons = (name) => {
    const updateFavorites = [...favorites]
    const favoriteIndex = favorites.indexOf(name)
    if(favoriteIndex >= 0) {
      updateFavorites.splice(favoriteIndex, 1);
    } else {
      updateFavorites.push(name);
    }
    setFavorites(updateFavorites);
  }

  return (
    <FavoriteProvider
          value={{favoritePokemons: favorites,  updateFavoritePokemons: updateFavoritePokemons
          }}
        >
      <div>
        <Navbar />
        <Searchbar />
        <Pokedex
          pokemons={pokemons}
          loading={loading}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      </div>
    </FavoriteProvider>
  );
}

export default App;
