import { useContext, useCallback } from "react";
import PokeContext from "../Context/PokeContext";
import { capitalizeName } from "../Utils/GeneralUtils";

export default function usePokemonName () {
    const { pokeName, setPokeName } = useContext(PokeContext);

    const setPokemonName = useCallback(name => {
        setPokeName(capitalizeName(name));
    }, [ setPokeName ]);

    const getPokemonNameInUse = useCallback(() => {
        return pokeName
     }, [ pokeName ]);

    return {
        getPokemonNameInUse, 
        setPokemonName 
    };
}