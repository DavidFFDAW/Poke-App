import React, { useState, useEffect } from 'react';
import { types } from '../../constants/types.data';
import { getPokemonDetails } from '../../services/PokeAPI.service';
import PokeBallSpinner from '../PokeSpinner/PokeBallSpinner';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './pokeDetail.css';
import { TypeTag } from '../TypeTag/TypeTag';

const PokemonData = (pokeData) => {

    const { t } = useTranslation();
    const { data } = pokeData;
    const thisTypeColors = types[data.types[0].type.name];

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


    return(
        <div className="poke-detail-card flex center">
            <div className="top-decoration" style={ decorationColor }></div>
            <div className="poke-details">
                <div className="flex center">
                    <h3 className="poke-name" style={ fontStyle(data.name,true) }>{ data.name }</h3>
                </div>
                <div className="flex center img-fixed-size">
                    <img loading="lazy" className="poke-pic" src={ data.sprites.front_default } alt={`${ data.name } pokemon sprite`}></img>
                </div>
                <div className="flex center">
                    <span className="poke-name no-margin" style={ fontStyle(data.name,false) }>{ data.name }</span>
                </div>
                <div className="flex center">
                    { data.types.map(type => 
                        <TypeTag key={type.type.name} type={type.type.name} />  
                      ) 
                    }
                </div>                
                <div className="flex center down">
                    <Link type="button" className="btn btn-download rd" to={`/pokemon/${data.name}` }>{ t('card.showDetails') }</Link>
                </div>
            </div>
        </div>
    );
}

export default function PokemonDetail({ name }) {
    
    const [ pokeInfo, setPokeInfo ] = useState({});
    const [ isLoading, setLoading ] = useState(true);

    useEffect(_ => {
        getPokemonDetails(name).then(details => {
            setPokeInfo(details)
            setLoading(false);
        });
    },[ name ]);
    
    return (
        <div className="flex center pokemon-card-one">
            {
                isLoading
                ? <PokeBallSpinner/>
                : <PokemonData data={ pokeInfo }/>
            }
        </div>
    );
}