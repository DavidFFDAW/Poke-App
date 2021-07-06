import React from 'react';
import PokemonDetail from '../components/PokemonDetail';
import ScrollView from '../components/ScrollView';
import { useParams } from 'react-router-dom';

export default function PokeDetailPage(){

    const { name } = useParams();

    return (
        <>
            <ScrollView>
                <PokemonDetail name={ name }/>
            </ScrollView>
        </>
    );
}