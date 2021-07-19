import React from 'react';
import { useParams } from 'react-router-dom';
import ScrollView from '../components/ScrollView/ScrollView';
import MoveDetails from '../components/MoveDetails/MoveDetails';

export default function PokeMoveInfoPage() {

    const { move } = useParams();

    return (
        <>
            <div className="flex center details-title-name bg-top">{ move }</div>
            <ScrollView>
                <MoveDetails name={ move } />
            </ScrollView>
        </>
    );
}