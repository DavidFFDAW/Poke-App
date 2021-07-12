const array = [
    { url: 1 },
    { url: 2 },
    { url: 3 },
    { url: 1 },
    { url: 2 },
];

console.log(array);

function test(array){
    return new Set(array.url);
}

console.log(test(array));
