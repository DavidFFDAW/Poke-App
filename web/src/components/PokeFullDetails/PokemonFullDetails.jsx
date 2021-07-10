import React, { useEffect, useState } from 'react';
import PokeBallSpinner from '../PokeSpinner/PokeBallSpinner';
import { getPokemonDetails } from '../../services/PokeAPI.service';
import './pokeFullDetails.css';

const InformationRow = ({ text, data, upper }) => {
    return (
        <div className="flex between info-row">
            <div className="info-name">{text}</div>
            { upper
                ? <div style={{ textTransform: 'uppercase' }}>{data}</div>
                : <div>{data}</div>
            }
        </div>
    );
}

const ShowLoadedDetails = ({ details }) => {
    
    const [ isShiny, setShiny ] = useState(false);

    const notWantedVersions = ["lets-go-pikachu","lets-go-eevee","omega-ruby","alpha-sapphire"]

    const handleSetShiny = _ => {
        setShiny(!isShiny);
    }

    const information = details.specieInfo.flavor_text_entries.filter(entry => entry.language.name === 'es')
        .filter(entry => !notWantedVersions.includes(entry.version.name)) || [];
    
    return (
        <>
            <div className="flex-start between">
                <div className="details-card flex-not-align center">
                    <div className="w-100">
                        <div className="flip-box">
                            <div className="flip-box-inner">
                                <div className="flip-box-front img-container">
                                    <img className="detail-img" src={ isShiny ? details.sprites.front_shiny : details.sprites.front_default } alt={`${ details.name } sprite`} />
                                </div>
                                <div className="flip-box-back img-container">
                                    <img className="detail-img" src={ isShiny ? details.sprites.back_shiny : details.sprites.back_default } alt={`${ details.name } sprite`} />
                                </div>
                            </div>
                        </div>

                        <div className="flex center">
                            <button type="button" className="btn btn-download" onClick={ handleSetShiny }>{ isShiny ? 'Ver normal' : 'Ver Shiny' }</button>
                        </div>

                        <div className="down">
                            <InformationRow text="ID" data={details.id} />
                            <InformationRow text="Nombre" data={details.name} upper/>
                            <InformationRow text="Altura" data={details.height}/>
                            <InformationRow text="Orden" data={details.order}/>
                            <InformationRow text="Peso" data={details.weight}/>
                            <InformationRow text="Exp de combate" data={details.base_experience}/>
                        </div>
                    </div>
                </div>
                <div className="details-text">
                    <div className="rounded-box first">
                        <h3 className="error box-title"><strong>Información: </strong></h3>
                        {
                            information.map(entry => (
                                <p key={entry.version.url}>{ entry.flavor_text }</p>
                                ))
                        }
                    </div>
                    <div className="rounded-box"></div>
                    <div className="rounded-box"></div>
                    <div className="rounded-box"></div>
                    <div className="rounded-box"></div>
                </div>
            </div>
        </>
    );
}

export default function PokemonFullDetails({ name }) {

    const [ details, setDetails ] = useState({});
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        getPokemonDetails(name).then(details => {
            setDetails(details);
            setLoading(false);
        });
    }, [ name ]);

    return (
        <>
            {
                loading
                    ? <div className="flex center"><PokeBallSpinner /></div>
                    : <ShowLoadedDetails details={ details }/>
            }
        </>
    );
}