import React, { useState } from "react";

const Context = React.createContext({});

export function PokeContextProvider({ children }) {
    const getLastSearch = _ => localStorage.getItem('lastSearch') || 'pikachu';
    const getTemporalSearchs = _ => localStorage.getItem('recentSearchs') || '[]';
    const getStoragedRecentSearchs = _ => JSON.parse(getTemporalSearchs());
    
    const [ pokeName, setPokeName ] = useState(getLastSearch());
    const [ recentSearchs, setRecentSearchs ] = useState( getStoragedRecentSearchs() );

    return (
        <Context.Provider value={{
            pokeName, setPokeName,
            recentSearchs, setRecentSearchs
        }}>
            { children }
        </Context.Provider>
    );

};

export default Context;