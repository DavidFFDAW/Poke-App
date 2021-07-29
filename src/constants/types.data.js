export const types = {
    fire: { bg: '#ffac38', font: '#000', trad: 'Fuego' },
    water: { bg: '#4cbefc', font: '#fff', trad: 'Agua' },
    grass: { bg: '#24a65a', font: '#fff', trad: 'Planta' },
    ground: { bg: '#a37a53', font: '#fff', trad: 'Tierra' },
    rock: { bg: '#918477', font: '#fff', trad: 'Roca' },
    normal: { bg: '#c2b497', font: '#fff', trad: 'Normal' },
    psychic: { bg: 'radial-gradient( #ff1f1f, #311fff )', font: '#fff', trad: 'Psìquico' },
    poison: { bg: 'linear-gradient(90deg,#525cba,50px,#b852ba)', font: '#fff', trad: 'Veneno' },
    ghost: { bg: '#656b99', font: '#fff', trad: 'Fantasma' },
    dragon: { bg: '#a5ade8', font: '#fff', trad: 'Dragon' },
    electric: { bg: '#fff538', font: '#000', trad: 'Eléctrico' },
    steel: { bg: '#c4c4c4', font: '#000', trad: 'Acero' },
    fairy: { bg: '#efc7f2', font: '#000', trad: 'Hada' },
    fighting: { bg: '#850101', font: '#fff', trad: 'Lucha' },
    bug: { bg: '#abf5d3', font: '#000', trad: 'Bicho' },
    ice: { bg: '#95eaed', font: '#000', trad: 'Hielo' },
    dark: { bg: 'linear-gradient(#141414,#787878)', font: '#fff', trad: 'Siniestro' },
    flying: { bg: '#8bbbc9', font: '#fff', trad: 'Volador' },
};

export const typesStrenght = {
    normal: [ '' ],
    fighting: [ 'normal', 'rock', 'steel', 'ice', 'dark' ],
    flying: [ 'fighting', 'bug', 'grass' ],
    poison: [ 'grass', 'fairy' ],
    ground: [ 'poison', 'rock', 'steel', 'fire', 'electric' ],
    rock: [ 'flying', 'bug', 'fire', 'ice' ],
    bug: [ 'grass', 'psychic', 'dark' ],
    ghost: [ 'ghost', 'psychic' ],
    steel: [ 'rock', 'ice', 'fairy' ],
    fire: [ 'bug', 'steel', 'grass', 'ice' ],
    water: [ 'ground', 'rock', 'fire' ],
    grass: [ 'water', 'rock', 'ground' ],
    electric: [ 'flying', 'water' ],
    psychic: [ 'fighting', 'poison' ],
    ice: [ 'flying', 'ground', 'grass', 'dragon' ],
    dragon: [ 'dragon' ],
    fairy: [ 'fighting', 'dragon', 'dark' ],
    dark: [ 'ghost', 'psychic' ],
};

export const typesWeakness = {
    normal: [ 'fighting' ],
    fighting: [ 'flying', 'psychic', 'fairy' ],
    flying: [ 'rock', 'electric', 'ice' ],
    poison: [ 'ground', 'psychic' ],
    ground: [ 'water', 'grass', 'ice' ],
    rock: [ 'fighting', 'ground', 'steel', 'water', 'grass' ],
    bug: [ 'flying', 'rock', 'fire' ],
    ghost: [ 'dark', 'ghost' ],
    steel: [ 'fighting', 'ground', 'fire' ],
    fire: [ 'ground', 'rock', 'water' ],
    water: [ 'grass', 'electric' ],
    grass: [ 'poison', 'bug', 'flying', 'fire', 'ice' ],
    electric: [ 'ground' ],
    psychic: [ 'bug', 'ghost', 'dark' ],
    ice: [ 'fighting', 'rock', 'steel', 'fire' ],
    dragon: [ 'ice', 'dragon', 'fairy' ],
    fairy: [ 'poison', 'steel' ],
    dark: [ 'fighting', 'bug', 'fairy' ],
    // ...
};