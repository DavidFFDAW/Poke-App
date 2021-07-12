import React, { useState, useEffect } from 'react';
import { config } from '../constants/config';
import { useParams } from 'react-router-dom';
import PokeSpinner from '../components/PokeSpinner/PokeBallSpinner';
import { getFilteredPokemonsByName } from '../services/PokeAPI.service';
import PokemonDetail from '../components/PokeDetails/PokemonDetail';


const PokemonSearchList = ({ list }) => {

    if(!list.length > 0 || !list){
        return (
            <div className="flex center">
                <div>
                    <div className="flex center">
                        <img style={{ width: 100, height: 100 }} src={ `${config.appUrl}/pokeball.png` } alt="pokeball logo" />
                    </div>
                    <h3 className="error"><strong>Ooops...</strong> No pokemons found with this criteria</h3>
                </div>
            </div>
        );
    }

    return (
        <div className="pokemon-search-list flex center flxwrap">
            {   
            list.map(({ name }) => (
                <PokemonDetail key={ name } name={ name }/>
            ))
            }

        </div>
    );
}

export default function PokemonSearchPage(){

    const [ isLoading, setLoading ] = useState(true);
    const [ pokeSearchList, setPokeSearchList ] = useState([]);
    const { name } = useParams();

    useEffect(() => {
        getFilteredPokemonsByName(name).then(pokemons => {
            setPokeSearchList(pokemons);
            setLoading(false);
        });
    } , [ name ]);

    return (
        <div className="flex center pokeViewport">
            {
                isLoading
                    ? <PokeSpinner/>
                    : <PokemonSearchList list={ pokeSearchList }/>
            }
        </div>
    );

}