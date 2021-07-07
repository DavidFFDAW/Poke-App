import React from 'react';
import { config } from '../../constants/config';
import './spinner.css';

export default function PokeBallSpinner() {
    return (
        <>
            <div className="flex between spinner">
                <img className="rotation" src={ `${config.appUrl}/pokeball.png` } alt="pokeball logo" />
            </div>
        </>
    );
}