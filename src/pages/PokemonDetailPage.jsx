import React, { useEffect, useState } from 'react';
import PokemonFullDetails from '../components/PokeFullDetails/PokemonFullDetails';
import ScrollView from '../components/ScrollView/ScrollView';
import { useParams } from 'react-router-dom';

export default function PokeDetailPage(){

    const { name } = useParams();
    const [ pokeName, setPokeName ] = useState(name);

    useEffect(() => {
        localStorage.setItem('lastSearch',pokeName);
        document.title = `${pokeName.toUpperCase()} | Pkm`;
    } , [pokeName]);

    return (
        <>
            <div className="flex center details-title-name bg-top" translate='false'>{ pokeName }</div>
            <ScrollView>
                <PokemonFullDetails name={ name } changeName={ setPokeName } />
            </ScrollView>
        </>
    );
}