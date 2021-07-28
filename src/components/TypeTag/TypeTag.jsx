import React from 'react';
import useTranslate from '../../hooks/useTranslate';
import { types } from '../../constants/types.data';

export function TypeTag({ type, css }){

    const { translateType } = useTranslate();
    const bgColor = types[type] ? types[type].bg : '#eee';
    const fontColor = types[type] ? types[type].font : '#222';

    return (
        <span 
            className={ css || 'poke-type-tag' } style={{
                background: bgColor,
                color: fontColor,
        }}>
            { translateType(type) }
        </span>
    );

}