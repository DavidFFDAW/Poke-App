import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { config } from '../../constants/config';
import { useTranslation } from 'react-i18next';   
import usePokemonName from '../../hooks/usePokeName';
import useRecentSearchs from '../../hooks/useRecentSearchs';
/*import { getFilteredPokemonsByName } from '../../services/PokeAPI.service';*/
import './pokeHeader.css';


export default function PokeHeader() {

    
    const { t } = useTranslation();
    const history = useHistory();
    const { setPokemonName, getPokemonNameInUse } = usePokemonName();
    const { getRecentSearchs } = useRecentSearchs();
    const { pathname } = useLocation();

    const handleChangeKeyword = (ev) => {        
        localStorage.setItem( 'lastSearch', ev.target.value );
        setPokemonName(ev.target.value);
    }

    const handleSearchPokemon = () => {
        const keyword = getPokemonNameInUse();
        const search = keyword === '' ? localStorage.getItem('lastSearch') || 'def' : keyword;
        const isNumber = Number.isInteger( +search );

        if (isNumber) {
            history.push(`/pokemon/${ search }`);
            return 0;
        }

        history.push(`/pokemon/search/${ search.toLowerCase() }`);
    }

    const handleEnterToSearch = (ev) => {
        if (ev.key === 'Enter') {
            handleSearchPokemon();
        }
    }
    
    const handleSendHome = () => {
        history.push('/');
    }

    const handleGoBack = () => {
        history.goBack();
    }

    return (
        <>
            <div className="flex between poke-header">
                { pathname !== '/' && <div onClick={ handleGoBack } className="back">
                    <div className="go-back">                        
                        <p><i className="arrow left"></i></p>
                    </div>
                </div> }

                <div class="dropdown">
                    <button class="dropbtn">Búsquedas recientes</button>
                    <div class="dropdown-content">
                        { getRecentSearchs().map(poke => {
                            return (
                                <div class="boxed link">
                                    <div>
                                        <img src={ poke.img } alt={ poke.name } />
                                    </div>
                                    <div>
                                        <div class="text">
                                                <h4 class="name">{ poke.name }</h4>
                                                <p class="url">{ poke.url }</p>
                                        </div>
                                        <p class="date">{ poke.date || new Date().toJSON().slice(0,10).replace(/-/g,'/') }</p>
                                    </div>
                                </div>
                            )
                        }) }                        
                    </div>
                </div>

                <div className="header-home-link flex between" onClick={ handleSendHome }>
                    <img className="poke-logo" alt="pokeball-logo" src={ `${config.appUrl }/images/pokeball.png` }></img>
                    <span translate='no'>PokeInfo App</span>
                </div>
                <div className="last input-div">
                    <input className="text-search" type="text" value={ getPokemonNameInUse() } onKeyDown={ handleEnterToSearch } onChange={ handleChangeKeyword }/>
                    <button className="btn btn-search" type="button" onClick={ handleSearchPokemon }>{ t('header.button')}</button>
                </div>
            </div>
        </>
    );
}