import React from 'react';
import './pokeCard.css';

export default function PokeCard({ name, onClick }) {
    return(
        <div className="flex center">
            <div className="poke-card" onClick={ onClick }>
                <span className="name">{ name }</span>
            </div>
        </div>
    );
}