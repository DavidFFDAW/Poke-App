const endpoint = 'https://pokeapi.co/api/v2';

const getFirstFiftyPokemons = async _ => {
    const pokemonOrder = 'pokemon?limit=50&offset=0';
    const pokemons = await fetch(`${endpoint}/${pokemonOrder}`);
    return pokemons.json();
}

module.exports = {
    getFirstPokemons: getFirstFiftyPokemons,
}