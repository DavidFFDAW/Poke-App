import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export default function useTranslate(){

    const { t } = useTranslation();

    const translateMove = useCallback(toTranslate => {        
        return t('moves')[toTranslate.toLowerCase()] || toTranslate;
    });

    const translateType = useCallback(toTranslate => {
        return t('types')[toTranslate.toLowerCase()] || toTranslate;
    });

    return { translateMove, translateType }
}