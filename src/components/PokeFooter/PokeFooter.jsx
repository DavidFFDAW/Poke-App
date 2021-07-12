import { config } from "../../constants/config"

export default function Footer(){
    return (
        <div className="flex center footer">
            <div><a href={ config.repo }>PokeInfoApp</a> @Copyright {config.year} <a href={config.author.web}>{ config.author.name }</a></div>
        </div>
    );

}