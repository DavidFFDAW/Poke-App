import React, { useState, useEffect } from 'react';
import { getPokemonDetails } from '../services/PokeAPI.service';
import PokeBallSpinner from '../components/PokeBallSpinner';

const PokemonData = (pokeData) => {
    const { data } = pokeData;

    return(
        <>
            <h3>Pokemon: { data.name }</h3>
        </>
    );
}

export default function PokemonDetail({ name }) {
    
    const [ pokeInfo, setPokeInfo ] = useState({});
    const [ isLoading, setLoading ] = useState(true);
    const [ pokeEvolutions, setPokeEvolutions ] = useState([]);

    useEffect(_ => {
        getPokemonDetails(name).then(details => {
            setPokeInfo(details)
            setLoading(false);
        });
    },[ name ]);
    
    return (
        <div className="flex center">
            {
                isLoading
                ? <PokeBallSpinner/>
                : <PokemonData data={ pokeInfo }/>
            }
        </div>
    );
}