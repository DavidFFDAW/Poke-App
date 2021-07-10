import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { config } from '../../constants/config';
/*import { getFilteredPokemonsByName } from '../../services/PokeAPI.service';*/
import './pokeHeader.css';

export default function PokeHeader() {

    const [ keyword, setKeyword ] = useState('');
    const history = useHistory();

    const getRandomNumber = (max, min) => Math.floor(Math.random() * (max - min) + min);

    const handleChangeKeyword = (ev) => {        
        localStorage.setItem( 'lastSearch', ev.target.value );
        setKeyword(ev.target.value);
    }

    const handleSearchPokemon = () => {
        const search = keyword === '' ? localStorage.getItem('lastSearch') || 'def' : keyword;
        history.push(`/pokemon/search/${ search }`);
    }

    const handleSendHome = () => {
        history.push('/');
    }

    return (
        <>
            <div className="flex between poke-header">
                <div className="vertical-center header-home-link flex between" onClick={ handleSendHome }>
                    <img className="poke-logo" src={ `${config.appUrl}/pokeball.png` }></img>
                    <span>PokeInfo App</span>
                </div>
                <div className="vertical-center">
                    <input className="text-search" type="text" value={ keyword } onChange={ handleChangeKeyword }/>
                    <button className="btn btn-search" type="button" onClick={ handleSearchPokemon }>Buscar</button>
                </div>
            </div>
        </>
    );
}