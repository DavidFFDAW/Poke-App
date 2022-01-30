import useCustomTranslate from '../../hooks/useTranslate';
import { TypeTag } from '../TypeTag/TypeTag';


export const InformationArray = ({ text, array, type, line }) => {

    const { translateEggType } = useCustomTranslate();
    
    const Tag = (entry) => {
        if(!type){
            return <span key={entry.name} className="tag default-tag">{ translateEggType(entry.name) }</span>;

        }
        if(type === 'type') {
            return <TypeTag key={ entry[type].name } css="tag" type={ entry[type].name }/>
        }
        return <span key={ entry[type].name } className="tag default-tag">{ entry[type].name }</span>
    }

    return (
        <div className={`flex between info-row ${ line ? 'line': '' }`}>
            <div className="info-name">{text}</div>
            <div className="">
                {
                    array.map(entry => {
                        return Tag(entry);
                    })
                }
            </div>
        </div>
    );
}