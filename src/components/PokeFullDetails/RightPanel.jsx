import { EvolutionChain } from './EvolutionChain';
import RoundedBox, { RoundedBoxPad30, SimpleRoundBox } from '../RoundedBox/RoundedBox';
import TypeRelations from '../TypeRelations/TypeRelations';
import ShowMoreList from '../ShowMoreList/List';
import { PokeStatsChart } from '../PokeStatsChart/Radar';
import { CenteredButton } from '../SmallDataBox/SmallDataBox';

export const RightPanel = ({ details, isShiny, handleSetShiny, maleSprite, finalFemaleSprite, pokemonStats, information }) => {
    return (
        <>   
            <SimpleRoundBox title="Información:">
                <p>{ information.flavor_text }</p>
            </SimpleRoundBox>
        
                            
            <RoundedBoxPad30 title="Evoluciones:">
                <div className="body flex between relative">
                    <EvolutionChain evolutions={ details.evolutions }/>
                </div>
            </RoundedBoxPad30>


            <RoundedBoxPad30 title="Fortalezas">
                <div className="body grid-types">
                    <TypeRelations types={ details.types } strenghts></TypeRelations>
                </div>
            </RoundedBoxPad30>   


            <RoundedBoxPad30 title="Debilidades">
                <div className="body grid-types">
                    <TypeRelations types={ details.types } weaknesses></TypeRelations>
                </div>
            </RoundedBoxPad30>  
        

            <RoundedBox title="Movimientos:">
                <ShowMoreList cuttingIn={ details.moves.length / 2 } urlTo='/pokemon/move/info' list={ details.moves } arrayKey='move' translate={true}/>
            </RoundedBox>

            <RoundedBox title="Género:">
                <div className='flex center'>
                    <div className='card'>
                        <img className="gender" src={ maleSprite } alt="Male pokemon" />
                        <p style={{ textAlign: 'center' }}>Masculino</p>
                    </div>
                    <div className='card'>
                        <img className='gender' src={ finalFemaleSprite } alt="Female pokemon" />
                        <p style={{ textAlign: 'center' }}>Femenino</p>
                    </div>
                </div>
                <CenteredButton onclick={ handleSetShiny } text={ isShiny ? 'Versión normal' : 'Versión Shiny' }/>
            </RoundedBox>
        
            <RoundedBox title="Estadisticas base:">
                <div className='flex center base-stats'>
                    <PokeStatsChart stats={ pokemonStats }/>
                </div>
            </RoundedBox>        
        </>
    );
}