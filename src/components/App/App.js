import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from '../Navigation/Navigation';
import Searchbar from '../Searchbar/Searchbar';
import Pokedex from '../Header/header'
import { getPokemons } from '../../utils/api';


function App() {
  
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const result = await getPokemons();
      setPokemons(result);
      setLoading(false);
    } catch (error) {
      console.log("fetchPokemonsError: ", error);
      
    }
    
  }
  useEffect(() => {
    console.log("carregou");
     fetchPokemons();
  }, [])
  
  return (
    <div>
        <Navbar />
        <Searchbar />
        <Pokedex pokemons={pokemons.results} loading={loading} />
     </div>
  );
 }

export default App;
