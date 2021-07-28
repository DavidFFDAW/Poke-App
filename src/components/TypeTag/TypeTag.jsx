import React from 'react';
import useTranslate from '../../hooks/useTranslate';
import { types } from '../../constants/types.data';

export function TypeTag({ type, css }){

    const { translateType } = useTranslate();

    return (
        <span 
            className={ css || 'poke-type-tag' } style={{
                background: types[type].bg,
                color: types[type].font,
        }}>
            { translateType(type) }
        </span>
    );

}