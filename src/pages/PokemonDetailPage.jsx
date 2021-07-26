import React, { useEffect } from 'react';
import PokemonFullDetails from '../components/PokeFullDetails/PokemonFullDetails';
import ScrollView from '../components/ScrollView/ScrollView';
import { useParams } from 'react-router-dom';

export default function PokeDetailPage(){

    const { name } = useParams();

    useEffect(() => {
        document.title = `${name.toUpperCase()} | Pkm`;
    } , [name]);

    return (
        <>
            <div className="flex center details-title-name bg-top">{ name }</div>
            <ScrollView>
                <PokemonFullDetails name={ name }/>
            </ScrollView>
        </>
    );
}