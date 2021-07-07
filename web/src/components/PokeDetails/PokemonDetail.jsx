import React, { useState, useEffect } from 'react';
import { types } from '../../constants/types.data';
import { getPokemonDetails } from '../../services/PokeAPI.service';
import PokeBallSpinner from '../PokeSpinner/PokeBallSpinner';
import './pokeDetail.css';

const PokemonData = (pokeData) => {
    const { data } = pokeData;
    const thisTypeColors = types[data.types[0].type.name];

    const decorationColor = {
        background: thisTypeColors.bg,
    }

    const fontColor = {
        color: thisTypeColors.font
    }


    return(
        <div className="poke-detail-card flex center">
            <div className="top-decoration" style={ decorationColor }></div>
            <div className="poke-details">
                <div className="flex center">
                    <h3 className="poke-name" style={ fontColor }>{ data.name }</h3>
                </div>
                <div className="flex center">
                    <img className="poke-pic" src={ data.sprites.front_default }></img>
                </div>
                <div className="flex center">
                    <span className="poke-name no-margin">{ data.name }</span>
                </div>
                <div className="flex center">
                    { data.types.map(type => 
                        <span key={ type.type.name } className="poke-type-tag" style={{
                            background: types[type.type.name].bg,
                            color: types[type.type.name].font,
                        }}>{ types[type.type.name].trad }</span>   
                    ) }
                </div>
                <div className="flex between down">
                    <div>
                        <span><strong>Habilidades</strong>:</span>
                    </div>
                    <div>
                        { data.abilities.map(ability => 
                            <span key={ ability } className="poke-ability">{ ability.ability.name }</span>
                        )}
                    </div>
                </div>

                <div className="flex center">
                    <span className="poke-moves">Movimientos</span>
                </div>
            </div>
        </div>
    );
}

export default function PokemonDetail({ name }) {
    
    const [ pokeInfo, setPokeInfo ] = useState({});
    const [ isLoading, setLoading ] = useState(true);
    const [ pokeEvolutions, setPokeEvolutions ] = useState([]);

    useEffect(_ => {
        getPokemonDetails(name).then(details => {
            setPokeInfo(details)
            setLoading(false);
        });
    },[ name ]);
    
    return (
        <div className="flex center">
            {
                isLoading
                ? <PokeBallSpinner/>
                : <PokemonData data={ pokeInfo }/>
            }
        </div>
    );
}