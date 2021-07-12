import React, { useEffect } from 'react';
import { getAllPokemons } from '../services/PokeAPI.service';
import PokeSearchViewport from '../components/ScrollView/PokeSearchViewport';

export default function HomePage(){

    useEffect(() => {
      if(!localStorage.getItem('pokeArray') || localStorage.getItem('pokeArray') === undefined) {
        getAllPokemons().then(pokemons => {
            localStorage.setItem('pokeArray', JSON.stringify(pokemons.results));
    
        });
      }
    },[]);
    
    return (
        <>
            {/* Presentation page */}
            <PokeSearchViewport/>        
        </>
    );
}