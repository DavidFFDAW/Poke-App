const fetch = require('node-fetch');

const number = 1;
const url = `https://pokeapi.co/api/v2/evolution-chain/${ number }`;


const addToObject = (object,key,element) => {
    object[key] = element;
    return object;
}

const getEvolutions = async () => {
    const finalArray = {};

    const response = await(await fetch(url)).json();
    console.log(response.chain.evolves_to);
    addToObject(finalArray,'first',response.chain.species.name);
    console.log(finalArray);

}


getEvolutions();