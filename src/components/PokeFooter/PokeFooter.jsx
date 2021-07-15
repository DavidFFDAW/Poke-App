import { config } from "../../constants/config";
import { useTranslation } from "react-i18next";

export default function Footer(){

    const { t } = useTranslation();

    return (
        <div className="flex center footer">
            <div className="all-margins">
                <a href={ config.repo }>PokeInfoApp</a> 
                <span>@Copyright</span> 
                <span>{ config.year }</span> 
                <a href={config.author.web}>{ config.author.name }</a> 
                <span>v{config.version}</span>
                <span>{ t('footer.phase') }: { config.phase }</span>            
            </div>
        </div>
    );

}