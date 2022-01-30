import { Link } from "react-router-dom";

export const InformationRow = ({ text, data, upper, line, link }) => {

    const specialDataTypes = (data) => {
        if(link){
            return <div><Link to={`/pokemon/${data}`} className="tag default-tag">{data}</Link></div>;
        }
        if(upper){
            return <div style={{ textTransform: 'uppercase' }}>{data}</div>;
        }
        return <div>{data}</div>;
    }

    return (
        <div className={`flex between info-row ${ line ? 'line' : '' }`}>
            <div className="info-name">{text}</div>
            { specialDataTypes(data) }
        </div>
    );
}