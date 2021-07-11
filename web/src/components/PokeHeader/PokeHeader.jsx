import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { config } from '../../constants/config';
/*import { getFilteredPokemonsByName } from '../../services/PokeAPI.service';*/
import './pokeHeader.css';


export default function PokeHeader() {

    const [ keyword, setKeyword ] = useState( localStorage.getItem('lastSearch') || '' );
    const history = useHistory();
    const { pathname } = useLocation();

    const handleChangeKeyword = (ev) => {        
        localStorage.setItem( 'lastSearch', ev.target.value );
        setKeyword(ev.target.value);
    }

    const handleSearchPokemon = () => {
        const search = keyword === '' ? localStorage.getItem('lastSearch') || 'def' : keyword;
        history.push(`/pokemon/search/${ search.toLowerCase() }`);
    }

    const handleSendHome = () => {
        history.push('/');
    }

    const handleGoBack = () => {
        history.goBack();
    }

    return (
        <>
            <div className="flex between poke-header">
                { pathname !== '/' && <div onClick={ handleGoBack }>
                    <div className="go-back">                        
                        <p><i className="arrow left"></i></p>
                    </div>
                </div> }
                <div className="header-home-link flex between" onClick={ handleSendHome }>
                    <img className="poke-logo" src={ `${config.appUrl}/pokeball.png` }></img>
                    <span>PokeInfo App</span>
                </div>
                <div className="last">
                    <input className="text-search" type="text" value={ keyword } onChange={ handleChangeKeyword }/>
                    <button className="btn btn-search" type="button" onClick={ handleSearchPokemon }>Buscar</button>
                </div>
            </div>
        </>
    );
}