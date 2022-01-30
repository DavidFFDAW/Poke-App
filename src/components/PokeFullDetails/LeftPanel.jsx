import SmallDataBox, { CenteredButton, FlipBox } from '../SmallDataBox/SmallDataBox';
import { InformationRow } from './InformationRow';
import { InformationArray } from './InformationArray';
import { generations } from '../../constants/types.data';


export const LeftPanel = ({ isShiny, handleSetShiny, details, isProperty }) => {
    return (
        <SmallDataBox>
            <FlipBox 
                front={ <img loading="lazy" className="detail-img" src={ isShiny ? details.sprites.front_shiny : details.sprites.front_default } alt={`${ details.name } sprite`} /> }
                back={ <img loading="lazy" className="detail-img" src={ isShiny ? details.sprites.back_shiny : details.sprites.back_default } alt={`${ details.name } sprite`} /> }
            />
            <CenteredButton onclick={ handleSetShiny } text={ isShiny ? 'Ver normal' : 'Ver shiny' }/>


            <div className="down">
                <InformationRow text="ID" data={details.id} line/>
                <InformationRow text="Nombre" data={details.name} upper line translate="no"/>
                <InformationRow text="Generación" data={ generations[details.specieInfo.generation.name] || 'None' } upper line/>
                <InformationArray text="Tipo(s)" array={details.types} type="type" line/>
                <InformationRow text="Altura" data={details.height} line/>
                <InformationRow text="Orden" data={details.order} line/>
                <InformationRow text="Peso" data={details.weight} line/>
                <InformationRow text="Bebe" data={isProperty(details.specieInfo.is_baby)} line/>
                <InformationRow text="Mítico" data={isProperty(details.specieInfo.is_mytical)} line/>
                <InformationRow text="Legendario" data={isProperty(details.specieInfo.is_legendary)} line/>
                <InformationRow text="Forma" data={details.specieInfo.shape.name} line/>
                {details.specieInfo.evolves_from_species && <InformationRow text="Evolución previa" data={details.specieInfo.evolves_from_species.name} line link/>}
                <InformationArray text="Grupo Huevo" array={details.specieInfo.egg_groups} line/>
                <InformationRow text="Exp de combate" data={details.base_experience}/>                            
                {/* <InformationArray text="Habilidades" array={details.abilities.map(it => it)} line/> */}
            </div>
            <div className='flex center'>
                <img className="animated-artwork" alt='Animated pokemon sprite or official artwork' src={ details.sprites.versions['generation-v']['black-white'].animated.front_default || details.sprites.other['official-artwork'].front_default } />
                { details.sprites.versions['generation-v']['black-white'].animated.back_default && <img className="animated-artwork" alt='Animated pokemon sprite or official artwork' src={ details.sprites.versions['generation-v']['black-white'].animated.back_default} /> }
            </div>
        </SmallDataBox>
    );
}