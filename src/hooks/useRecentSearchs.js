import { useContext, useCallback } from "react";
import PokeContext from "../Context/PokeContext";

export default function useRecentSearchs() {
    const { recentSearchs, setRecentSearchs } = useContext(PokeContext);

    const addRecentSearch = useCallback(item => {
        // item: { name, img, url }
        const initialArray = (recentSearchs.length > 6) 
            ? recentSearchs.slice(1) 
            : recentSearchs;

        const finalSearchs = (initialArray.some(it => it.id === item.id))
            ? initialArray 
            : [ ...initialArray, item ];

        localStorage.setItem('recentSearchs', JSON.stringify(finalSearchs));
        setRecentSearchs(finalSearchs);
    }, [ recentSearchs, setRecentSearchs ]);

    const getRecentSearchs = useCallback(() => recentSearchs, [ recentSearchs ]);

    return {
        getRecentSearchs, 
        addRecentSearch 
    };
}
