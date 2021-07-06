import React,{ useState, useEffect, Suspense } from 'react';
import PokeBallSpinner from './PokeBallSpinner';
import { getFirstPokemons } from '../services/PokeAPI.service';
import PokeCard from './PokeCard';
import './searchViewport.css';

export default function PokeSearchViewport(){

    const [ pokemons, setPokemons ] = useState([]);

    useEffect(_ => {
        getFirstPokemons().then(pokemons => setPokemons(pokemons.results));        
    },[]);

    return (
        <>
            <Suspense fallback={ <PokeBallSpinner/> }>
                <div className="pokeViewport">
                    {
                        pokemons.map(singlePokemon => <PokeCard 
                            key={ singlePokemon.id }
                            name={ singlePokemon.name }
                            />
                        )
                    }
                </div>
            </Suspense>
        </>
    );
}