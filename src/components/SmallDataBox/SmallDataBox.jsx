import React from 'react';

export function FlipBox({ front, back, extraCssClass }){
    return (
        <div className="flip-box">
            <div className="flip-box-inner">
                <div className={ `flip-box-front img-container ${ extraCssClass }` }>
                    { front }
                </div>
                <div className={ `flip-box-back img-container ${ extraCssClass }` }>
                    { back }
                </div>
            </div>
        </div>
    );
} 

export function CenteredButton ({ onclick, text }) {
    return (
        <div className="flex center">
            <button type="button" className="btn btn-download rd" onClick={ onclick }>{ text }</button>
        </div>
    );

}

export default function SmallDataBox({ children }) {
    return (
        <div className="details-card flex-not-align center">
            <div className="w-100">
                { children }                
            </div>
        </div>
    );
}