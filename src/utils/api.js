const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export const searchPokemon = async (pokemon) => {
    try {
        const url = `${BASE_URL}/${pokemon.toLowerCase()}`; 
        const response = await fetch(url);

        if (!response.ok) {
            console.log('Pokémon não encontrado');
            return null;
        }

        return await response.json();
    } catch (error) {
        console.log('Erro na busca do Pokémon: ', error);
        return null; 
    }
};

export const fetchPokemons = async (limit = 50, page = 0) => {
    try {
        const offset = limit * page;
        const url = `${BASE_URL}?limit=${limit}&offset=${offset}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Erro ao obter lista de Pokémons');
        }

        const data = await response.json();
        
    
        const promises = data.results.map(async (pokemon) => {
            return await getPokemonData(pokemon.url);
        });

        const results = await Promise.all(promises);

        return {
            count: data.count,
            results,
        };
    } catch (error) {
        console.log('Erro ao obter Pokémons: ', error);
        throw error;
    }
};

export const getPokemonData = async (url) => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Erro ao obter dados do Pokémon');
        }

        return await response.json();
    } catch (error) {
        console.log('Erro ao obter dados do Pokémon: ', error);
        throw error;
    }
};
