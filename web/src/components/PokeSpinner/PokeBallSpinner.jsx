import React from 'react';
import { config } from '../../constants/config';
import './spinner.css';

export default function PokeBallSpinner({ size }) {

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
                <img className="rotation" style={ sizes[ size || 'medium' ] } src={ `${config.appUrl}/pokeball.png` } alt="pokeball logo" />
            </div>
        </>
    );
}