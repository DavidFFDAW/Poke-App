import React, { useEffect, useState } from 'react';
import { getMoveInfo } from '../../services/PokeAPI.service';
import { Link } from 'react-router-dom';
import { InformationRow } from '../PokeFullDetails/PokemonFullDetails';
import PokeBallSpinner from '../PokeSpinner/PokeBallSpinner';
import RoundedBox, { RoundedBoxPad30, SimpleRoundBox } from '../RoundedBox/RoundedBox';
import SmallDataBox from '../SmallDataBox/SmallDataBox';


const MoveInfo = ({ moveInfo }) => {
    return (
        <>
            <div className="flex-start between">
                <SmallDataBox>
                    <InformationRow text="ID" data={moveInfo.id} upper line/>
                    <InformationRow text="Nombre" data={moveInfo.name} upper line/>
                    <InformationRow text="Max Golpes" data={ moveInfo.max_hits ? moveInfo.max_hits : 1 } upper line/>
                    <InformationRow text="Daño" data={moveInfo.power} upper line/>
                    <InformationRow text="PP" data={moveInfo.pp} upper line/>
                    <InformationRow text="Prioridad" data={moveInfo.priority} upper line/>
                    <InformationRow text="Objetivo" data={moveInfo.target.name} upper line/>
                    <InformationRow text="Generación" data={moveInfo.generation.name} upper line/>
                    <InformationRow text="Tipo" data={moveInfo.type.name} upper line/>
                </SmallDataBox>

                <div className="details-text">
                    <SimpleRoundBox title="Información:">
                        <p>{ moveInfo.effect_entries[0].effect }</p>
                        <p>{ moveInfo.effect_entries[0].short_effect }</p>
                    </SimpleRoundBox>

                    <RoundedBox title="Lo pueden aprender:">
                        { moveInfo.learned_by_pokemon.map(({name}) => {
                            return <Link to={`/pokemon/${ name }`} key={name} className="tag default-tag">{ name }</Link>
                        }) }
                    </RoundedBox>
                </div>
            </div>
        </>
    );
}

export default function MoveDetails({ name }) {    

    const [ moveInfo, setMoveInfo ] = useState({});
    const [ isLoading, setLoading ] = useState(true);

    useEffect(() => {
        getMoveInfo(name).then(information => {
            console.log(information);
            setMoveInfo(information);        
            setLoading(false);
        });

    },[ name ]);

    return (
        <div className="flex center">
            {
                isLoading
                    ? <PokeBallSpinner/>
                    : <MoveInfo moveInfo={ moveInfo }/>
            }
        </div>
    );
}