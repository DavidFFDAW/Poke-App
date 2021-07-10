import React,{ useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PokeSpinner from '../components/PokeSpinner/PokeBallSpinner';
import { getFilteredPokemonsByName } from '../services/PokeAPI.service';
import PokemonDetail from '../components/PokeDetails/PokemonDetail';


const PokemonSearchList = ({ list }) => {
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
    } , []);

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