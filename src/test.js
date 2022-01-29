// const fetch = require('node-fetch');

// const number = 1;
// const url = `https://pokeapi.co/api/v2/evolution-chain/${ number }`;


// const addToObject = (object,key,element) => {
//     object[key] = element;
//     return object;
// }

// const getEvolutions = async () => {
//     let finalArray = [];
//     let evoData = null;

//     const response = await(await fetch(url)).json();
//     console.log(response.chain);
//     evoData = response.chain;
    
//     do{
//         let evDetail = evoData.evolution_details[0];

//         finalArray.push({
//             name: evoData.species.name,
//             min_level: !evDetail ? 1 : evDetail.min_level,
//             trigger_name: !evDetail ? null : evDetail.trigger_name,
//             item: !evDetail ? null : evDetail.item,
//         });
//         evoData = evoData.evolves_to[0];

//     } while (!!evoData && evoData.hasOwnProperty('evolves_to'));

//     return finalArray;
// }


// getEvolutions().then(console.log);

// const gr = 'linear-gradient( #FAE078,#F8D030 )';
// console.log('#' + gr.split('#')[1].replace(',',''));
// console.log(gr.split(',')[1].replace(')',''));

const arr = [ 'arr', 'arr2' ];

function addRecentSearch (item = {}) {
    if (arr.length >= 6) {
        arr.shift();
    }
    arr.push(item);
}

addRecentSearch({ name: 'test1' });
addRecentSearch({ name: 'test2' });
addRecentSearch({ name: 'test3' });
addRecentSearch({ name: 'test4' });
addRecentSearch({ name: 'test5' });

console.log(arr);