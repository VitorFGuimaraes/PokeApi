const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';


export const searchPokemon = async (pokemon) => {
    try {
        const url = `${BASE_URL}/${pokemon}`; 
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Pokémon não encontrado');
        }

        return await response.json();
    } catch (error) {
        console.log('Erro na busca do Pokémon: ', error);
        throw error; 
    }
};

export const getPokemons = async (limit = 50, offset = 0) => {
    try {
        const url = `${BASE_URL}?limit=${limit}&offset=${offset}`;
        const response = await fetch(url);


        if (!response.ok) {
            throw new Error('Erro ao obter lista de Pokémons');
        }

        return await response.json();
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
