import React,{ useState, useEffect, Suspense } from 'react';
import { getFirstPokemons } from '../../services/PokeAPI.service';
import PokeBallSpinner from '../PokeSpinner/PokeBallSpinner';
import { useHistory } from 'react-router-dom';
import PokeCard from '../PokeCard/PokeCard';
import './searchViewport.css';

export default function PokeSearchViewport(){

    const [ pokemons, setPokemons ] = useState([]);
    const history = useHistory();

    useEffect(_ => {
        getFirstPokemons().then(pokemons => setPokemons(pokemons.results));        
    },[]);

    const handleShowPokeDetail = (pokemonName) => {
        history.push(`/pokemon/${ pokemonName }`);
    }

    return (
        <>
            <Suspense fallback={ <PokeBallSpinner/> }>
                <div className="pokeViewport">
                    {
                        pokemons.map(singlePokemon => <PokeCard 
                            key={ singlePokemon.name }
                            name={ singlePokemon.name }
                            onClick={ _ => handleShowPokeDetail(singlePokemon.name) }
                            />
                        )
                    }
                </div>
            </Suspense>
        </>
    );
}