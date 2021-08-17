const endpoint = 'https://pokeapi.co/api/v2';

export const getFirstPokemons = async _ => {
    const pokemonOrder = 'pokemon?limit=50&offset=0';
    const pokemons = await fetch(`${endpoint}/${pokemonOrder}`);
    return pokemons.json();
}

export const getEvolutionChain = async httpUrl => {
    const evolutions = await fetch(httpUrl); 
    const pokeEvolutionChain = await evolutions.json();
    let evoData = pokeEvolutionChain.chain;
    const finalArray = [];
    
    do{
        let evDetail = evoData.evolution_details[0];

        finalArray.push({
            name: evoData.species.name,
            min_level: !evDetail ? 1 : evDetail.min_level,
            trigger_name: !evDetail ? null : evDetail.trigger.name,
            item: !evDetail ? null : evDetail.item,
        });
        evoData = evoData.evolves_to[0];

    } while (!!evoData && evoData.hasOwnProperty('evolves_to'));

    return finalArray;
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

export const getMoveInfo = async moveName => {
    const moveInfo = await fetch(`${endpoint}/move/${moveName}`);
    return await moveInfo.json();    
}