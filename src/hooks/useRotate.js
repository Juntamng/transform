import { useEffect, useRef } from 'react';

function calAngle(cx, cy, ex, ey) {
    var dy = ey - cy;
    var dx = ex - cx;
    var theta = Math.atan2(dy, dx); // range (-PI, PI]
    theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
    if (theta < 0) theta = 360 + theta; // range [0, 360)
    return theta;
}

export function useRotate(ref, pos, onRotate, onChange) {
    let x1=0, y1=0, x2=0, y2=0, startDeg=0, endDeg=0;

    const refCur = useRef({});
    
    useEffect(() => {
        ref.current.addEventListener("mousedown", handleMouseDown);
        
        return () => {
            ref.current && ref.current.removeEventListener("mousedown", handleMouseDown);
            document.removeEventListener('mousemove', mouseMove);
            document.removeEventListener('mouseup', mouseUp);
        }
    }, []);

    useEffect(() => {
        refCur.current = pos;
    }, [pos]);

    const mouseMove = (e) => {
        endDeg = calAngle(x1, y1, e.clientX, e.clientY);

        onRotate({
            angle: endDeg - startDeg
        });

        startDeg = endDeg;
    };
    
    const mouseUp = (e) => {
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);
        onChange();
    };

    const handleMouseDown = (e) => {
        const pos = refCur.current;
        const tmpPos = {
            x1: pos.left,
            y1: pos.top,
            x2: pos.left + pos.width,
            y2: pos.top + pos.height
        }

        x1 = Math.round( (tmpPos.x2 - tmpPos.x1) / 2 + tmpPos.x1 );
        y1 = Math.round( (tmpPos.y2 - tmpPos.y1) / 2 + tmpPos.y1 );
        x2 = e.clientX;
        y2 = e.clientY

        startDeg = calAngle(x1, y1, x2, y2);
        
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
    };
} 