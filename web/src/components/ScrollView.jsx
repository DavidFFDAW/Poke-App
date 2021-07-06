import React from 'react';
import './searchViewport.css';

export default function ScrollView({ children }){
    return (
        <div className="pokeViewport">
            {children}
        </div>
    );
}