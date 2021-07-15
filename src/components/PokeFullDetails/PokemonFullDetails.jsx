import React, { useEffect, useState } from 'react';
import PokeBallSpinner from '../PokeSpinner/PokeBallSpinner';
import { Link } from 'react-router-dom';
import { types } from '../../constants/types.data';
import { getPokemonDetails } from '../../services/PokeAPI.service';
import { useTranslation } from 'react-i18next';
import './pokeFullDetails.css';

const Arrow = ({ trigger, level }) => {
    return (
        <div className="fixed-width flex center">
            <span className="trigger">{trigger} { level ? level : '' }</span>
        </div>
    );
}

const EvolutionChain = ({ evolutions }) => {

    return (
        <>
        {
            evolutions.chain.evolves_to.map(({ species, evolution_details }, index) => {
                
                return (
                    <div key={index}>
                        { evolution_details.length > 0 && evolution_details[0].trigger && <Arrow trigger={evolution_details[0].trigger.name} level={evolution_details[0].min_level}/> }                       
                        <Link to={`/pokemon/${species.name}`} className="tag tag-evolution">{species.name}</Link>
                    </div>
                );
            })
        }
        </>
    );
}

const InformationRow = ({ text, data, upper, line, link }) => {

    const specialDataTypes = (data) => {
        if(link){
            return <div><Link to={`/pokemon/${data}`} className="tag default-tag">{data}</Link></div>;
        }
        if(upper){
            return <div style={{ textTransform: 'uppercase' }}>{data}</div>;
        }
        return <div>{data}</div>;
    }

    return (
        <div className={`flex between info-row ${ line ? 'line' : '' }`}>
            <div className="info-name">{text}</div>
            { specialDataTypes(data) }
        </div>
    );
}

const InformationArray = ({ text, array, type, line }) => {

    const Tag = (entry) => {
        if(!type){
            return <span key={entry.name} className="tag default-tag">{ entry.name }</span>;

        }
        if(type === 'type') {
            return <span key={ entry[type].name } className="tag" style={{ background: types[entry[type].name ].bg, color: types[entry[type].name].font }}>{ entry[type].name }</span>
        }
        return <span key={ entry[type].name } className="tag default-tag">{ entry[type].name }</span>
    }

    return (
        <div className={`flex between info-row ${ line ? 'line': '' }`}>
            <div className="info-name">{text}</div>
            <div className="">
                {
                    array.map(entry => {
                        return Tag(entry);
                    })
                }
            </div>
        </div>
    );
}

const ShowLoadedDetails = ({ details }) => {
    
    const { t } = useTranslation();
    const [ isShiny, setShiny ] = useState(false);
    
    const isProperty = property => property ? 'Yes' : 'No';

    const handleSetShiny = _ => {
        setShiny(!isShiny);
    }

    const information = details.specieInfo.flavor_text_entries.filter(entry => entry.language.name === 'es')[0] || { flavor_text: '' };
    
    
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
                            <InformationRow text="ID" data={details.id} line/>
                            <InformationRow text="Nombre" data={details.name} upper line/>
                            <InformationArray text="Tipo(s)" array={details.types} type="type" line/>
                            <InformationRow text="Altura" data={details.height} line/>
                            <InformationRow text="Orden" data={details.order} line/>
                            <InformationRow text="Peso" data={details.weight} line/>
                            <InformationRow text="Bebe" data={isProperty(details.specieInfo.is_baby)} line/>
                            <InformationRow text="Mítico" data={isProperty(details.specieInfo.is_mytical)} line/>
                            <InformationRow text="Legendario" data={isProperty(details.specieInfo.is_legendary)} line/>
                            <InformationRow text="Forma" data={details.specieInfo.shape.name} line/>
                            {details.specieInfo.evolves_from_species && <InformationRow text="Evolución previa" data={details.specieInfo.evolves_from_species.name} line link/>}
                            <InformationArray text="Grupo Huevo" array={details.specieInfo.egg_groups} line/>
                            <InformationRow text="Exp de combate" data={details.base_experience}/>                            
                        </div>
                    </div>
                </div>
                <div className="details-text">
                    <div className="rounded-box first">
                        <h3 className="title box-title"><strong>Información: </strong></h3>
                        <div className="body">
                            <p>{ information.flavor_text }</p>
                        </div>
                    </div>
                    <div className="rounded-box">
                        <h3 className="title box-title"><strong>Movimientos: </strong></h3>
                        <div className="body flex-strt flxwrap">
                            {
                                details.moves.map(move => {
                                    return <span key={ move.move.name } data-move={ move.move.name } className="tag default-tag">{ t('moves')[move.move.name.toLowerCase()] || move.move.name }</span>
                                })
                            }
                        </div>
                    </div>
                    <div className="rounded-box">
                        <h3 className="title box-title"><strong>Evoluciones: </strong></h3>
                        <div className="flex center pad-30">
                            <div className="body flex between relative">
                                <EvolutionChain evolutions={ details.evolutions }/>
                            </div>
                        </div>
                    </div>
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