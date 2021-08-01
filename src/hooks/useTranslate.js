import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export default function useTranslate(){

    const { t, i18n } = useTranslation();

    const replaceSpacesWithHyphen = string => string.replace(/\s/g, '-');

    const translateMove = useCallback(toTranslate => {        
        return t('moves')[toTranslate.toLowerCase()] || toTranslate;
    },[ t ]);

    const translateType = useCallback(toTranslate => {
        return t('pokemon-types')[toTranslate.toLowerCase()] || toTranslate;
    },[ t ]);

    const translateEggType = useCallback(toTranslate => {
        return t('poke-egg-group')[toTranslate.toLowerCase()] || toTranslate;
    },[ t ]);

    const getLanguage = useCallback(_ => i18n.language,[ i18n ])

    const getMoveFromTranslation = useCallback(introducedMove => {
        const moves = t('moves');
        const keys = Object.keys(moves);
        
        if (keys.includes(introducedMove.toLowerCase())) {
            return replaceSpacesWithHyphen(introducedMove.toLowerCase());
        }
        return keys.find(move => moves[move].toLowerCase() === introducedMove.toLowerCase()) || null;
    },[ t ]);

    return { translateMove, translateType, translateEggType, getLanguage, getMoveFromTranslation }
}