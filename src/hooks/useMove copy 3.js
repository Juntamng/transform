import { useEffect, useRef } from 'react';

export function useMove(ref, pos, onMove) {
    let x1=0, y1=0, x2=0, y2=0;
    let startX2=0, startY2=0, startHypotenuse=0, startDeg=0;
    let endX2=0, endY2=0, endHypotenuse=0, endDeg=0;
    const refCur = useRef({});

    function calAngle(cx, cy, ex, ey) {
        var dy = ey - cy;
        var dx = ex - cx;
        var theta = Math.atan2(dy, dx); // range (-PI, PI]
        theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
        if (theta < 0) theta = 360 + theta; // range [0, 360)
        return theta;
    }

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

    const param = {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
        deg: 0
    };

    const calMovement = (e) => {
        x2 = e.clientX;
        y2 = e.clientY

        endDeg = calAngle(x1, y1, x2, y2) - 280
        // console.log(endDeg)
        endHypotenuse =  Math.hypot(Math.abs(y2-y1), Math.abs(x2-x1));
        endX2 = endHypotenuse * Math.cos(Math.PI * 2 * endDeg / 360);
        endY2 = endHypotenuse * Math.sin(Math.PI * 2 * endDeg / 360);

        console.log("edeg=" + endDeg + ";endX2=" + endX2 + ";endY2=" + endY2);
        return {
            x: endX2,
            y: endY2
        }
    }

    const mouseMove = (e) => {
        const movement = calMovement(e);

        // const param = {
        //     x: e.movementX, 
        //     y: e.movementY
        // }

        const param = {
            x: movement.x, 
            y: movement.y
        }
        onMove(param);

        // startDeg = endDeg;
        // startHypotenuse = endHypotenuse;
        x1 = x2;
        y1 = y2;
    };
    
    const mouseUp = (e) => {
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);
    };

    const handleMouseDown = (e) => {
        // const pos = refCur.current;

        // x1 = Math.round( (pos.x2 - pos.x1) / 2 + pos.x1 );
        // y1 = Math.round( (pos.y2 - pos.y1) / 2 + pos.y1 );

        x1 = e.clientX;
        y1 = e.clientY

        // startDeg = calAngle(x1, y1, x2, y2) - pos.deg;
        // startHypotenuse =  Math.hypot(Math.abs(y2-y1), Math.abs(x2-x1));
        // //startHypotenuse = Math.pow(, 2) + Math.pow(Math.abs(x2-x1), 2) 
        // startX2 = startHypotenuse * Math.cos(Math.PI * 2 * startDeg / 360) + x1;
        // startY2 = startHypotenuse * Math.sin(Math.PI * 2 * startDeg / 360) + y1;
        // //console.log(pos.x2+":"+pos.y2 + "----" + x2o + ":" + y2o);
        // console.log("deg=" + startDeg + ";startX2=" + startX2 + ";startY2=" + startY2);
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
    };
}