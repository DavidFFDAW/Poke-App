import React, { useEffect, useState } from 'react';
import PokeBallSpinner from '../PokeSpinner/PokeBallSpinner';
import { LeftPanel } from './LeftPanel';
import { useHistory } from 'react-router-dom';
import { getPokemonDetails } from '../../services/PokeAPI.service';
import useCustomTranslate from '../../hooks/useTranslate';
import { CenteredButton } from '../SmallDataBox/SmallDataBox';
import { parseChartStatistics, getTypeColor } from '../../Utils/GeneralUtils';
import usePokemonName from '../../hooks/usePokeName';
import useRecentSearchs from '../../hooks/useRecentSearchs';
import { RightPanel } from './RightPanel';
import './pokeFullDetails.css';


const ShowLoadedDetails = ({ details }) => {

    const history = useHistory();
    const [ isBottomPage, setBottomPage ] = useState(false);
    const { setPokemonName } = usePokemonName();
    const { addRecentSearch } = useRecentSearchs();
    const { getLanguage } = useCustomTranslate();
    const [ isShiny, setShiny ] = useState(false);

    const handleScroll = () => {
        const bottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight / 2);
        setBottomPage(bottom);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        setPokemonName(details.name);
        addRecentSearch({
            id: details.id,
            name: details.name,
            url: history.location.pathname,
            img: details.sprites.front_default
        });
    } , [details, setPokemonName, addRecentSearch, history]);

    const maleShiny = details.sprites.other.home.front_shiny || details.sprites.front_shiny;
    const femaleShiny = details.sprites.other.home.front_shiny_female || details.sprites.front_shiny_female;
    const maleSprite =  isShiny ? maleShiny : details.sprites.other.home.front_default || details.sprites.front_default;
    const femaleSprite = isShiny ? femaleShiny : details.sprites.other.home.front_female || details.sprites.front_female;
    const finalFemaleSprite = femaleSprite || maleSprite;

    const pokemonStats = parseChartStatistics(details.stats,details.name, getTypeColor(details.types[0].type.name));

    const isProperty = property => property ? 'Yes' : 'No';

    const handleSetShiny = _ => {
        setShiny(!isShiny);
    }

    const getNextOrPrevPokemon = operation => {
        const newID = operation === 'prev' ? (details.id - 1) : (details.id + 1);
        return history.push(`/pokemon/${ newID }`);
    }

    const information = details.specieInfo.flavor_text_entries.filter(entry => entry.language.name === getLanguage())[0] || { flavor_text: '' };
    // console.log( details.specieInfo.generation.name );
    
    return (
        <>
            <div className='flex between' style={{
                padding: '5px 50px',
                marginBottom: '20px'
            }}>
                { details.id !== 1 ? <CenteredButton text={ 'Pokemon anterior' } onclick={ _ => getNextOrPrevPokemon('prev') }></CenteredButton> : <div/> }
                <CenteredButton text={ 'Siguiente pokemon' } onclick={ _ => getNextOrPrevPokemon('next') }></CenteredButton>
            </div>
            <div className="flex-start between">
                <LeftPanel details={ details } isShiny={isShiny} isProperty={isProperty} handleSetShiny={handleSetShiny} />
                
                <div className="details-text">
                    <RightPanel 
                        details={ details } 
                        pokemonStats={pokemonStats} 
                        isShiny={isShiny}
                        handleSetShiny={handleSetShiny}
                        maleSprite={maleSprite}
                        finalFemaleSprite={finalFemaleSprite}
                        information={information}
                    />
                </div>
            </div>

            { isBottomPage 
                && 
            <button className="btn btn-download rd fix" onClick={ _ => window.scrollTo({top: 0, behavior: 'smooth'}) } >Volver arriba </button> }

        </>
    );
}

export default function PokemonFullDetails({ name, changeName }) {

    const [ details, setDetails ] = useState({});
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        getPokemonDetails(name).then(details => {
            setDetails(details);
            changeName(details.name);
            setLoading(false);
        });
    }, [ name, changeName ]);

    return (
        <>
            {
                loading
                    ? <div className="flex center"><PokeBallSpinner /></div>
                    : <ShowLoadedDetails details={ details }/>
            }
        </>
    );
}
