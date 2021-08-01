import React, { useEffect } from 'react';
import Home from '../components/Home/Home';
import { getAllPokemons } from '../services/PokeAPI.service';

export default function HomePage(){

    useEffect(() => {
      document.title = 'PokeInfo - App';
      if(!localStorage.getItem('pokeArray') || localStorage.getItem('pokeArray') === undefined) {
        getAllPokemons().then(pokemons => {
            localStorage.setItem('pokeArray', JSON.stringify(pokemons.results));
    
        });
      }
    },[]);

    return (
      <Home/>
    );
}