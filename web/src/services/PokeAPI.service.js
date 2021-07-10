const endpoint = 'https://pokeapi.co/api/v2';

const getFirstPokemons = async _ => {
    const pokemonOrder = 'pokemon?limit=50&offset=0';
    const pokemons = await fetch(`${endpoint}/${pokemonOrder}`);
    return pokemons.json();
}

const getEvolutionChain = async id => {
    const evolutionChainEndpoint = `evolution-chain/${id}`;
    const pokeEvolutionChain = await fetch(`${endpoint}/${evolutionChainEndpoint}`); 
    return pokeEvolutionChain.json();
}

const getPokemonDetails = async pokemonName => {
    const pokemonDetails = await fetch(`${endpoint}/pokemon/${pokemonName}`);
    return pokemonDetails.json();
};

const getAllPokemons = async () => {
    const pokemons = await fetch(`${endpoint}/pokemon?limit=1118`);
    return pokemons.json();
}

const getFilteredPokemonsByName = async name => {
    const pokemonArray = JSON.parse(localStorage.getItem('pokeArray'));
    const filtered = pokemonArray.filter(poke => poke.name.includes(name));
    
    await filtered.forEach(poke => {
        fetch(`${endpoint}/pokemon/${poke.name}`).then(poke => poke.json())
            .then(pkm => poke.data = pkm.data);
    });

    return filtered;
}

module.exports = {
    getFirstPokemons,
    getPokeEvolutions: getEvolutionChain,
    getPokemonDetails,
    getAllPokemons,
    getFilteredPokemonsByName
}