import React from 'react';
import { TypeTag } from '../TypeTag/TypeTag';
import { typesStrenght, typesWeakness } from '../../constants/types.data';

export default function TypeRelations({ types, weaknesses = null, strenghts = null }){

    const weak = 'weakness';
    const flag = weaknesses ? 'weakness' : 'strenght';

    const fillArrayWithPokeRelation = (relation = 'weakness') => {
        let finalArray = [];        
        const objectToCompare = relation === weak ? typesWeakness : typesStrenght;
        
        types.map(({ type }) => objectToCompare[type.name])
            .forEach(array => {
            finalArray = [...finalArray,...array];
        });

        return finalArray;
    }

    const typesRelation = fillArrayWithPokeRelation(flag);

    return (
        <>
            {
                typesRelation.map((type, index) => {
                    return (
                        <TypeTag key={ index } type={ type } />
                    )
                })
            }
        </>
    );
    }