import React, { useEffect, useState } from 'react';
import PokeBallSpinner from '../PokeSpinner/PokeBallSpinner';
import { Link } from 'react-router-dom';
import { types } from '../../constants/types.data';
import { getPokemonDetails } from '../../services/PokeAPI.service';
import { useTranslation } from 'react-i18next';
import useCustomTranslate from '../../hooks/useTranslate';
import RoundedBox, { RoundedBoxPad30, SimpleRoundBox } from '../RoundedBox/RoundedBox';
import SmallDataBox, { CenteredButton, FlipBox } from '../SmallDataBox/SmallDataBox';
import { TypeTag } from '../TypeTag/TypeTag';
import TypeRelations from '../TypeRelations/TypeRelations';
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

export const InformationRow = ({ text, data, upper, line, link }) => {

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

export const InformationArray = ({ text, array, type, line }) => {

    const { translateEggType } = useCustomTranslate();
    
    const Tag = (entry) => {
        if(!type){
            return <span key={entry.name} className="tag default-tag">{ translateEggType(entry.name) }</span>;

        }
        if(type === 'type') {
            return <TypeTag key={ entry[type].name } css="tag" type={ entry[type].name }/>
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
    const { translateMove } = useCustomTranslate();
    const [ isShiny, setShiny ] = useState(false);
    
    const isProperty = property => property ? 'Yes' : 'No';

    const handleSetShiny = _ => {
        setShiny(!isShiny);
    }

    const information = details.specieInfo.flavor_text_entries.filter(entry => entry.language.name === 'es')[0] || { flavor_text: '' };
    
    
    return (
        <>
            <div className="flex-start between">
                <SmallDataBox>
                    <FlipBox 
                        front={ <img loading="lazy" className="detail-img" src={ isShiny ? details.sprites.front_shiny : details.sprites.front_default } alt={`${ details.name } sprite`} /> }
                        back={ <img loading="lazy" className="detail-img" src={ isShiny ? details.sprites.back_shiny : details.sprites.back_default } alt={`${ details.name } sprite`} /> }
                    />
                    <CenteredButton onclick={ handleSetShiny } text={ isShiny ? 'Ver normal' : 'Ver shiny' }/>


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
                </SmallDataBox>
                
                <div className="details-text">

                    <SimpleRoundBox title="Información:">
                        <p>{ information.flavor_text }</p>
                    </SimpleRoundBox>
                     
                                        
                    <RoundedBoxPad30 title="Evoluciones:">
                            <div className="body flex between relative">
                                <EvolutionChain evolutions={ details.evolutions }/>
                            </div>
                    </RoundedBoxPad30>


                    <RoundedBoxPad30 title="Fortalezas">
                            <div className="body grid-types">
                                <TypeRelations types={ details.types } strenghts></TypeRelations>
                            </div>
                    </RoundedBoxPad30>   


                    <RoundedBoxPad30 title="Debilidades">
                            <div className="body grid-types">
                                <TypeRelations types={ details.types } weaknesses></TypeRelations>
                            </div>
                    </RoundedBoxPad30>  
                    

                    <RoundedBox title="Movimientos:">
                        {details.moves.map(move => {
                            return <Link to={ `/pokemon/move/info/${move.move.name}` } key={ move.move.name } className="tag default-tag">{ translateMove(move.move.name) }</Link>
                        })}
                    </RoundedBox>

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