import {useEffect, useRef, useState} from 'react';
import { useMove } from '../hooks/useMove';
import { useRotate } from '../hooks/useRotate';
import useClickOutside from "../hooks/useClickOutside";

import styles from './Transform.module.css';

export default function Transform(props) {
    const refLeft = useRef();
    const refRight = useRef();
    const refMove = useRef();
    const refTopLeft = useRef();
    const refTopRight = useRef();
    const refBottomLeft = useRef();
    const refBottomRight = useRef();
    const refRotateBottomRight = useRef();
    const refContainer = useRef();

    const [deg, setDeg] = useState(0);
    // const [pos, setPos] = useState({
    //     type: "",
    //     x1: 50,
    //     y1: 50,
    //     x2: 150,
    //     y2: 150
    // });

    const handleMove = (param) => {
        props.onChange(param);

        // setPos(prev => (
        //     {
        //         x1: prev.x1 + param.x1,
        //         y1: prev.y1 + param.y1,
        //         x2: prev.x2 + param.x2,
        //         y2: prev.y2 + param.y2,
        //     }
        // ));
    };
    
    const handleRotate = (param) => {
        props.onChange(param);

        // setDeg(prev => prev + param.deg);
    };

    useMove(refTopLeft, "NW", props, handleMove);
    useMove(refTopRight, "NE", props, handleMove);
    useMove(refBottomLeft, "SW", props, handleMove);
    useMove(refBottomRight, "SE", props, handleMove);
    useMove(refLeft, "W", props, handleMove);
    useMove(refRight, "E", props, handleMove);
    useMove(refMove, "M", props, handleMove);
    useRotate( refRotateBottomRight, props, handleRotate )
    useClickOutside(refContainer, props.onClose);

    let left = props.x1;
    let top = props.y1;
    let w = props.x2 - props.x1;
    let h = props.y2 - props.y1;

    const stylePos = {
        width: w+"px",
        height: h+"px",
        transform: `translate(${left}px, ${top}px)`
    };
    const styleRotate = {
        transform: `rotate(${props.deg}deg)`
    };

    return <div style={stylePos}> 
        <div className={styles.main} style={styleRotate} ref={refContainer}> 
            <div className={styles.move} ref={refMove}></div>
            <div className={styles.left} ref={refLeft}></div>
            <div className={styles.right} ref={refRight}></div>
            <div className={styles.topLeft} ref={refTopLeft}></div>
            <div className={styles.topRight} ref={refTopRight}></div>
            <div className={styles.bottomLeft} ref={refBottomLeft}></div>
            <div className={styles.bottomRight} ref={refBottomRight}></div>
            <div className={styles.rotateBottomRight} ref={refRotateBottomRight}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className={styles.rotate}>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
            </div>
        </div>
    </div>
}