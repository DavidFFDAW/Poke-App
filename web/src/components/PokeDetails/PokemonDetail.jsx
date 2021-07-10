import React, { useState, useEffect } from 'react';
import { types } from '../../constants/types.data';
import { getPokemonDetails } from '../../services/PokeAPI.service';
import PokeBallSpinner from '../PokeSpinner/PokeBallSpinner';
import { useHistory } from 'react-router';
import abilitiesTranslation from '../../i18n/abilities';
import './pokeDetail.css';

const PokemonData = (pokeData) => {

    const { data } = pokeData;
    const thisTypeColors = types[data.types[0].type.name];
    const history = useHistory();

    const decorationColor = {
        background: thisTypeColors.bg,
    }
    

    const fontStyle = (name, color) => {
        
        const style = { 
            color: color ? thisTypeColors.font : '#000',
        };

        if(name.length > 10) style.fontSize = '1.2em';
        if(name.length > 15) style.fontSize = '0.9em';
        if(name.length > 20) style.fontSize = '0.5em';

        return style;
    }

    const getThisPokemonDetails = (pokename) => {
        history.push(`/pokemon/${pokename}`);
    }


    return(
        <div className="poke-detail-card flex center">
            <div className="top-decoration" style={ decorationColor }></div>
            <div className="poke-details">
                <div className="flex center">
                    <h3 className="poke-name" style={ fontStyle(data.name,true) }>{ data.name }</h3>
                </div>
                <div className="flex center img-fixed-size">
                    <img className="poke-pic" src={ data.sprites.front_default }></img>
                </div>
                <div className="flex center">
                    <span className="poke-name no-margin" style={ fontStyle(data.name,false) }>{ data.name }</span>
                </div>
                <div className="flex center">
                    { data.types.map(type => 
                        <span key={ type.type.name } className="poke-type-tag" style={{
                            background: types[type.type.name].bg,
                            color: types[type.type.name].font,
                        }}>{ types[type.type.name].trad }</span>   
                    ) }
                </div>                
                <div className="flex center down">
                    <button type="button" className="btn btn-download" onClick={ _ => getThisPokemonDetails(data.name) }>Ver Detalles</button>
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