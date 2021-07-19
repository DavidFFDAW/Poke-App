import React, { useEffect, useState } from 'react';
import { getMoveInfo } from '../../services/PokeAPI.service';
import PokeBallSpinner from '../PokeSpinner/PokeBallSpinner';
import RoundedBox, { RoundedBoxPad30 } from '../RoundedBox/RoundedBox';

const MoveInfo = ({ info }) => {
    console.log(info);
    return (
        <>
            <RoundedBoxPad30 title="Información:">
                <p>{ info.effect_entries[0].effect }</p>
            </RoundedBoxPad30>
        </>
    );
}

export default function MoveDetails({ name }) {    

    const [ moveInfo, setMoveInfo ] = useState({});
    const [ isLoading, setLoading ] = useState(true);

    useEffect(() => {
        getMoveInfo(name).then(information => {
            setLoading(false);
            setMoveInfo(information);        
        });

    },[ name ]);

    return (
        <div className="flex center">
            {
                isLoading
                    ? <PokeBallSpinner/>
                    : <MoveInfo info={ moveInfo }/>
            }
        </div>
    );
}