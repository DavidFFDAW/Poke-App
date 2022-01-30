import { Arrow } from "./Arrow";
import { Link } from "react-router-dom";

export const EvolutionChain = ({ evolutions }) => {

    return (
        <>
        {
            evolutions.map((element, index) => {
                
                return (
                    <div key={index}>
                        { <Arrow trigger={element.trigger_name} level={element.min_level}/> }                       
                        <Link to={`/pokemon/${element.name}`} className="tag tag-evolution">{element.name}</Link>
                    </div>
                );
            })
        }
        </>
    );
}