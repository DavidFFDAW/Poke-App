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
      fetch('http://vps-f87b433e.vps.ovh.net/impression.php?action=impression&type=HOME&app=Pokemon-App');
    },[]);

    return (
      <Home/>
    );
}