const endpoint = 'https://pokeapi.co/api/v2';

const getFirstFiftyPokemons = async _ => {
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

module.exports = {
    getFirstPokemons: getFirstFiftyPokemons,
    getPokeEvolutions: getEvolutionChain,
    getPokemonDetails,
}