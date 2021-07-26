import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import useCustomTranslate from '../hooks/useTranslate';
import ScrollView from '../components/ScrollView/ScrollView';
import MoveDetails from '../components/MoveDetails/MoveDetails';

export default function PokeMoveInfoPage() {

    const { translateMove } = useCustomTranslate();
    const { move } = useParams();
    
    useEffect(() => {
        document.title = `${move.toUpperCase()} | Move`;
    },[ move ]);

    return (
        <>
            <div className="flex center details-title-name bg-top">{ translateMove(move) }</div>
            <ScrollView>
                <MoveDetails name={ move } />
            </ScrollView>
        </>
    );
}