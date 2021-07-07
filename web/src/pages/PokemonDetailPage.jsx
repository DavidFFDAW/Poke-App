import React from 'react';
import PokemonDetail from '../components/PokeDetails/PokemonDetail';
import ScrollView from '../components/ScrollView/ScrollView';
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