import React from 'react';
import { availablePokeballs, config } from '../../constants/config';
import './spinner.css';

export default function PokeBallSpinner({ size }) {

    const randomPokeball = availablePokeballs[Math.floor(Math.random() * availablePokeballs.length)];

    const small = {
        width: 70,
        height: 70,
    };

    const medium = {
        width: 100,
        height: 100,
    }

    const sizes = { small, medium };

    return (
        <>
            <div className="flex between spinner">
                <img className="rotation" style={ sizes[ size || 'medium' ] } src={ `${config.appUrl}/images/${ randomPokeball }.png` } alt={ `${ randomPokeball } logo` } />
            </div>
        </>
    );
}