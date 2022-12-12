import { useEffect, useRef } from 'react';

function calAngle(cx, cy, ex, ey) {
    var dy = ey - cy;
    var dx = ex - cx;
    var theta = Math.atan2(dy, dx); // range (-PI, PI]
    theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
    if (theta < 0) theta = 360 + theta; // range [0, 360)
    return theta;
}

export function useMove(ref, type, pos, onMove, onChange) {
    let x1=0, y1=0, x2=0, y2=0;
    let endX2=0, endY2=0, endHypotenuse=0, endDeg=0;
    const refCur = useRef({});

    useEffect(() => {
        refCur.current = pos;
    }, [pos]);

    useEffect(() => {
        ref.current.addEventListener("mousedown", handleMouseDown);
        return () => {
            ref.current && ref.current.removeEventListener("mousedown", handleMouseDown);
            document.removeEventListener('mousemove', mouseMove);
            document.removeEventListener('mouseup', mouseUp);
        }
    }, []);

    const calMovement = (e) => {
        x2 = e.clientX;
        y2 = e.clientY
        endDeg = calAngle(x1, y1, x2, y2) - refCur.current.angle;
        endHypotenuse =  Math.hypot(Math.abs(y2-y1), Math.abs(x2-x1));
        endX2 = endHypotenuse * Math.cos(Math.PI * 2 * endDeg / 360);
        endY2 = endHypotenuse * Math.sin(Math.PI * 2 * endDeg / 360);
console.log('move x-' + endX2 + "; y-" + endY2)
        return {
            x: endX2,
            y: endY2
        }
    }

    const mouseMove = (e) => {
        const movement = calMovement(e);

        onMove({
            type,
            x: movement.x,
            y: movement.y
        });

        x1 = x2;
        y1 = y2;
    };
    
    const mouseUp = (e) => {
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);
        onChange();
    };

    const handleMouseDown = (e) => {
        x1 = e.clientX;
        y1 = e.clientY

        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
    };
}