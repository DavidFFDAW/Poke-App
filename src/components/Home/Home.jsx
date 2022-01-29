import { useHistory } from 'react-router-dom';
import ScrollView from '../ScrollView/ScrollView';
import { config } from '../../constants/config';
import customTranslation from '../../hooks/useTranslate';
import usePokemonName from '../../hooks/usePokeName';

export default function Home (){

    const history = useHistory();    
    const { getMoveFromTranslation } = customTranslation();
    const { getPokemonNameInUse, setPokemonName } = usePokemonName();
    // const [ search, setSearch ] = useState(getPokemonNameInUse());

    const handleChangeSearch = (ev) => {
        setPokemonName(ev.target.value);
        // setSearch(ev.target.value);
    }

    const handleSearchByFilter = () => {
        const search = getPokemonNameInUse();
        if (search !== ''){
            localStorage.setItem('lastSearch', search);
            const route = Number.isInteger( +search ) ? `/pokemon/${ search }` : `/pokemon/search/${ search.toLowerCase() }`;
            history.push(route);
        }
    }

    const handleSearchMove = () => {
        const search = getPokemonNameInUse();
        if (search !== ''){
            const moveToSearch = getMoveFromTranslation(search);
            history.push(`/pokemon/move/info/${ moveToSearch }`);
        }
    }


    return (
        <ScrollView>
        <div className="flex center vertical-center-50 input-div center-fix">
            <div className="bg-red"></div>

            <div className="zindex flex center">
                <img src={ `${config.appUrl}/images/pokeball.png` } width="50" height="50" alt="" />
            <div>
                <input type="text" className="general-input inpt-pad" value={ getPokemonNameInUse() } onChange={ handleChangeSearch } />
                <div className="btn-group">
                <button className="btn btn-download" type="button">¿____?</button>
                <button className="btn btn-download" type="button" onClick={ handleSearchByFilter }>Pokemon</button>
                <button className="btn btn-download" type="button">¿____?</button>
                <button className="btn btn-download" type="button" onClick={ handleSearchMove }>Movimiento</button>
                </div>
            </div>
            
            </div>
        </div>      
        </ScrollView>
    );
}