import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { config } from '../../constants/config';
import { getMoveInfo } from '../../services/PokeAPI.service';
import useCustomTranslate from '../../hooks/useTranslate';
import { InformationRow } from '../PokeFullDetails/PokemonFullDetails';
import PokeBallSpinner from '../PokeSpinner/PokeBallSpinner';
import RoundedBox, { RoundedBoxPad30, SimpleRoundBox } from '../RoundedBox/RoundedBox';
import SmallDataBox, { FlipBox } from '../SmallDataBox/SmallDataBox';


const MoveInfo = ({ moveInfo }) => {

    const { translateMove, translateType } = useCustomTranslate();

    return (
        <>
            <div className="flex-start between">
                <SmallDataBox>
                    <FlipBox extraCssClass="vertical-center-50"
                        front={ <img loading="lazy" src={ `${config.appUrl}/mt_disc.png`} className="detail-img-move" alt="MT pokemon disc sprite" /> }
                        back={ <img loading="lazy" src={ `${config.appUrl}/mt_disc.png`} className="detail-img-move" alt="MT pokemon disc sprite" /> }
                    />
                    <InformationRow text="ID" data={ moveInfo.id } upper line/>
                    <InformationRow text="Nombre" data={ translateMove(moveInfo.name) } upper line/>
                    <InformationRow text="Min Golpes" data={ moveInfo.max_hits || 1 } upper line/>
                    <InformationRow text="Max Golpes" data={ moveInfo.max_hits || 1 } upper line/>
                    <InformationRow text="Turnos minimos" data={ moveInfo.min_turns || 1 } upper line/>
                    <InformationRow text="Turnos maximos" data={ moveInfo.max_turns || 1} upper line/>
                    <InformationRow text="Tipo de Daño" data={ moveInfo.damage_class.name } upper line/>
                    <InformationRow text="Potencia" data={ moveInfo.power } upper line/>
                    <InformationRow text="Precisión" data={ moveInfo.accuracy } upper line/>
                    <InformationRow text="PP" data={ moveInfo.pp } upper line/>
                    <InformationRow text="Prioridad" data={ moveInfo.priority } upper line/>
                    <InformationRow text="Ratio critico" data={ moveInfo.crit_rate || 0 } upper line/>
                    <InformationRow text="Prioridad" data={ moveInfo.priority } upper line/>
                    <InformationRow text="Prob. efecto" data={ moveInfo.effect_chance || 0 } upper line/>
                    <InformationRow text="Posible estado" data={ moveInfo.meta.ailment.name } upper line/>
                    <InformationRow text="Prob. estado" data={ moveInfo.meta.ailment_chance } upper line/>
                    <InformationRow text="Cantidad curacion" data={ moveInfo.healing || 0 } upper line/>
                    <InformationRow text="Categoria" data={ moveInfo.meta.category.name } upper line/>
                    <InformationRow text="Objetivo" data={ moveInfo.target.name } upper line/>
                    <InformationRow text="Generación" data={ moveInfo.generation.name } upper line/>
                    <InformationRow text="Tipo" data={ translateType(moveInfo.type.name) } upper/>
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