import { config } from "../../constants/config"

export default function Footer(){
    return (
        <div className="flex center footer">
            <div>
                <a href={ config.repo }>PokeInfoApp</a> 
                <span>@Copyright</span> 
                <span>{ config.year }</span> 
                <a href={config.author.web}>{ config.author.name }</a> 
                <span>v{config.version}</span>
                <span>fase: {config.phase}</span>
            </div>
        </div>
    );

}