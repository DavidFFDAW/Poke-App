import React, { useEffect, useRef } from 'react';

export default function Alert({ cssClass, message }) {

    const alert = useRef('alert');

    useEffect(() => {
        setTimeout(function () {
            alert.current.classList.add('alert-disappear');
            alert.current.onAnimationEnd = _ => {
                alert.current.remove();
            }
        }, 2000);
    },[]);

    return(
        <div className="flex center" ref="alert">
            <div className={ `alert ${ cssClass }` }>
                {{ message }}
            </div>
        </div>
    );
}