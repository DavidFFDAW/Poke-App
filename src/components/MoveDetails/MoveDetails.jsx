import React, { useEffect, useState } from 'react';
import { config } from '../../constants/config';
import { getMoveInfo } from '../../services/PokeAPI.service';
import useCustomTranslate from '../../hooks/useTranslate';
import { InformationRow } from '../PokeFullDetails/InformationRow';
import PokeBallSpinner from '../PokeSpinner/PokeBallSpinner';
import RoundedBox, { SimpleRoundBox } from '../RoundedBox/RoundedBox';
import useRecentSearchs from '../../hooks/useRecentSearchs';
import SmallDataBox, { FlipBox } from '../SmallDataBox/SmallDataBox';
// import { config } from '../../constants/config';
import ShowMoreList from '../ShowMoreList/List';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const MoveInfo = ({ moveInfo }) => {

    const { translateMove, translateType, getLanguage } = useCustomTranslate();
    const infoText = moveInfo.flavor_text_entries.filter(item => item.language.name === getLanguage())[0].flavor_text;

    return (
        <>
            <div className="flex-start between">
                <SmallDataBox>
                    <FlipBox extraCssClass="vertical-center-50"
                        front={ <img loading="lazy" src={ `${config.appUrl}/images/mt_disc.png`} className="detail-img-move" alt="MT pokemon disc sprite" /> }
                        back={ <img loading="lazy" src={ `${config.appUrl}/images/mt_disc.png`} className="detail-img-move" alt="MT pokemon disc sprite" /> }
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
                        <p>{ infoText }</p>
                    </SimpleRoundBox>

                    <RoundedBox title="Lo pueden aprender:">                        
                        <ShowMoreList cuttingIn={14} urlTo='/pokemon' list={ moveInfo.learned_by_pokemon } arrayKey='name'/>
                    </RoundedBox>
                </div>
            </div>
        </>
    );
}

export default function MoveDetails({ name }) {    

    const [ moveInfo, setMoveInfo ] = useState({});
    const history = useHistory();
    const [ isLoading, setLoading ] = useState(true);
    const { addRecentSearch } = useRecentSearchs();

    useEffect(() => {
        getMoveInfo(name).then(information => {
            console.log(information);
            setMoveInfo(information);        
            setLoading(false);
            addRecentSearch({
                type: 'move',
                id: information.id,
                name: information.name,
                url: history.location.pathname,
                img: `${ config.appUrl }/images/mt_disc.png`
            });
        });

    },[ name, addRecentSearch, history ]);

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
