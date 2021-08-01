import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CenteredButton } from '../SmallDataBox/SmallDataBox';
import customTranslation from '../../hooks/useTranslate';

export default function ShowMoreList({ cuttingIn, list, urlTo, arrayKey, translate, children }){

    const [ arrayList, setArrayList ] = useState(list);
    const { translateMove } = customTranslation();
    const areTheSameArray = (a,b) => JSON.stringify(a) === JSON.stringify(b);
    
    useEffect(() => {
        setArrayList(list.slice(0, cuttingIn));
    },[ cuttingIn, list ]);


    const handleShowMore = () => {
        if (areTheSameArray(arrayList, list)){
            return setArrayList(arrayList.slice(0,cuttingIn));
        }
        return setArrayList(list);
    }

    return (
        <>
            <div className="body flex-strt flxwrap">
                {
                    arrayList.map((item, index) => {
                        return <Link to={ `${ urlTo }/${ item[arrayKey].name }` } key={ index } className="tag default-tag">{ translate ? translateMove(item[arrayKey].name) : item[arrayKey].name }</Link>
                    })
                }
            </div>  
            <CenteredButton onclick={ handleShowMore } text={ areTheSameArray(arrayList, list) ? 'Ver menos' : 'Ver más' } />
        </>
    );

}