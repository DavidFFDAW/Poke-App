import React from 'react';

export default function RoundedBox ({ title, children }){
    return (
        <div className="rounded-box">
            <h3 className="title box-title"><strong>{ title } </strong></h3>
                { children }            
        </div>
    );
}
export function RoundedBoxPad30 ({ title, children }){
    return (
        <div className="rounded-box">
            <h3 className="title box-title"><strong>{ title } </strong></h3>
            <div className="flex center pad-30">
                { children }
            </div>
        </div>
    );
}

export function SimpleRoundBox({ title, children }){
    return (
        <div className="rounded-box first">
            <h3 className="title box-title"><strong>{ title } </strong></h3>
            <div className="body">
                { children }
            </div>
        </div>

    );
}