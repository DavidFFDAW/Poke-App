const endpoint = 'https://pokeapi.co/api/v2';

export const getFirstPokemons = async _ => {
    const pokemonOrder = 'pokemon?limit=50&offset=0';
    const pokemons = await fetch(`${endpoint}/${pokemonOrder}`);
    return pokemons.json();
}

export const getEvolutionChain = async httpUrl => {
    const evolutions = await fetch(httpUrl); 
    const pokeEvolutionChain = await evolutions.json();
    const evolutionsArray = pokeEvolutionChain.chain.evolves_to;
    const newEvolvesTo = [{evolution_details: [], species: pokeEvolutionChain.chain.species },...evolutionsArray];
    pokeEvolutionChain.chain.evolves_to = newEvolvesTo;
/* 
    pokeEvolutionChain.chain.evolves_to.forEach(async evolution => {
        const poke = await fetch(`${endpoint}/pokemon/${evolution.species.name}`);
        const pokemon = await poke.json();
        return evolution.pokemonData = pokemon;
    }) */
    return await pokeEvolutionChain;
}

export const getPokemonDetails = async pokemonName => {
    const pokemonDetails = await fetch(`${endpoint}/pokemon/${pokemonName}`);
    const details = await pokemonDetails.json();

    const areaEncountersFetch = await fetch(`${details.location_area_encounters}`);
    const areaEncounters = await areaEncountersFetch.json();
    
    const speciesInfoFetch = await fetch(`${details.species.url}`);
    const speciesInfo = await speciesInfoFetch.json();

    const pokemonEvolutionChain = await getEvolutionChain(speciesInfo.evolution_chain.url)
    
    details.area_encounters = areaEncounters;
    details.specieInfo = speciesInfo;
    details.evolutions = pokemonEvolutionChain;
    
    return details;
};

export const getPokeTextWithNotSameURL = (pokeTextArray) => {
    const pokeTextWithNotSameURL = [];

    console.log(pokeTextArray);

    return pokeTextArray.reduce((prev, current) => {
        console.log(prev);
        if (prev.version) {
            if (prev.version.url !== current.version.url) {
                pokeTextWithNotSameURL.push(current);
            }
        }
        return pokeTextWithNotSameURL;
    }, []);
}

export const getAllPokemons = async () => {
    const pokemons = await fetch(`${endpoint}/pokemon?limit=1118`);
    return pokemons.json();
}

export const getFilteredPokemonsByName = async name => {
    const pokemonArray = JSON.parse(localStorage.getItem('pokeArray'));
    const filtered = pokemonArray.filter(poke => poke.name.includes(name));
    
    await filtered.forEach(poke => {
        fetch(`${endpoint}/pokemon/${poke.name}`).then(poke => poke.json())
            .then(pkm => poke.data = pkm.data);
    });

    return filtered;
}