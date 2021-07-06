const typesColors = {
    fire: 'type fire-type',
    water: 'type water-type',
    grass: 'type grass-type',
    ground: 'type ground-type',
    rock: 'type rock-type',
    normal: 'type normal-type',
    psychic: 'type psych-type',
    poison: 'type poison-type',
    ghost: 'type ghost-type',
    dragon: 'type dragon-type',
    electric: 'type electric-type',
    steel: 'type steel-type',
    fairy: 'type fairy-type',
    fighting: 'type fighting-type',
    bug: 'type bug-type',
    ice: 'type ice-type',
    dark: 'type dark-type',
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