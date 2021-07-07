import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './pokeHeader.css';

export default function PokeHeader() {

    const [ keyword, setKeyword ] = useState('');
    const history = useHistory();

    const getRandomNumber = (max, min) => Math.floor(Math.random() * (max - min) + min);

    const handleChangeKeyword = (ev) => {
        setKeyword(ev.target.value);
    }

    const handleSearchPokemon = () => {
        const search = keyword === '' ? getRandomNumber(1118,1) : keyword;
        history.push(`/pokemon/${ search }`);
    }

    const handleSendHome = () => {
        history.push('/');
    }

    return (
        <>
            <div className="flex between poke-header">
                <div className="vertical-center header-home-link" onClick={ handleSendHome }>
                    <span>PokeInfo App</span>
                </div>
                <div className="vertical-center">
                    <input type="text" value={ keyword } onChange={ handleChangeKeyword }/>
                    <button type="button" onClick={ handleSearchPokemon }>Buscar</button>
                </div>
            </div>
        </>
    );
}