const typesColors = {
    fire: { bg: '#ffac38', font: '#000' },
    water: { bg: '#4cbefc', font: '#fff' },
    grass: { bg: '#24a65a', font: '#fff' },
    ground: { bg: '#24a65a', font: '#fff' },
    rock: { bg: '#24a65a', font: '#fff' },
    normal: { bg: '#c2b8ab', font: '#000' },
    psychic: { bg: '#24a65a', font: '#fff' },
    poison: { bg: '#24a65a', font: '#fff' },
    ghost: { bg: '#24a65a', font: '#fff' },
    dragon: { bg: '#24a65a', font: '#fff' },
    electric: { bg: '#fff538', font: '#000' },
    steel: { bg: '#24a65a', font: '#fff' },
    fairy: { bg: '#24a65a', font: '#fff' },
    fighting: { bg: '#24a65a', font: '#fff' },
    bug: { bg: '#24a65a', font: '#fff' },
    ice: { bg: '#24a65a', font: '#fff' },
    dark: { bg: '#24a65a', font: '#fff' },
    flying: { bg: '#24a65a', font: '#fff'}
};

const typesWeakness = {
    fire: [],
    water: [],
    // ...
};


module.exports = {
    types: typesColors,
    weakness: typesWeakness,
}