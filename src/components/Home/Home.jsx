import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ScrollView from '../ScrollView/ScrollView';
import { config } from '../../constants/config';
import customTranslation from '../../hooks/useTranslate'

export default function Home (){

    const history = useHistory();
    const { getMoveFromTranslation } = customTranslation();
    const [ search, setSearch ] = useState('');

    const handleChangeSearch = (ev) => {
      setSearch(ev.target.value);
    }

    const handleSearchByFilter = () => {
      if (search !== ''){
        history.push(`pokemon/search/${ search.toLowerCase() }`);
      }
    }

    const handleSearchMove = () => {
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
                <img src={ `${config.appUrl}/pokeball.png` } width="50" height="50" alt="" />
            <div>
                <input type="text" className="general-input inpt-pad" value={ search } onChange={ handleChangeSearch } />
                <div className="btn-group">
                {/* <button className="btn btn-download" type="button">Tipo</button> */}
                <button className="btn btn-download" type="button" onClick={ handleSearchByFilter }>Pokemon</button>
                {/*<button className="btn btn-download" type="button">Habilidad</button> */}
                <button className="btn btn-download" type="button" onClick={ handleSearchMove }>Movimiento</button>
                </div>
            </div>
            
            </div>
        </div>      
        </ScrollView>
    );
}