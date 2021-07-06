import React, { useState } from 'react';
import './pokeHeader.css';

export default function PokeHeader() {

    const [ keyword, setKeyword ] = useState('');

    const handleChangeKeyword = (ev) => {
        setKeyword(ev.target.value);
    }

    return (
        <>
            <div className="flex between poke-header">
                <div className="vertical-center">
                    <span>PokeInfo App</span>
                </div>
                <div className="vertical-center">
                    <input type="text" value={ keyword } onChange={ handleChangeKeyword }/>
                </div>
            </div>
        </>
    );
}