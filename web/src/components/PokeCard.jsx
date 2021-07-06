import React from 'react';
import './pokeCard.css';

export default function PokeCard({ name }) {
    return(
        <div className="flex center">
            <div className="poke-card">
                <span className="name">{ name }</span>
            </div>
        </div>
    );
}