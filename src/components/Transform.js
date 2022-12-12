import React, {useEffect, useRef, useState} from 'react';
import { useMove } from '../hooks/useMove';
import { useRotate } from '../hooks/useRotate';
import useClickOutside from "../hooks/useClickOutside";

import styles from './Transform.module.css';

function calAngle(cx, cy, ex, ey) {
    var dy = ey - cy;
    var dx = ex - cx;
    var theta = Math.atan2(dy, dx); // range (-PI, PI]
    theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
    if (theta < 0) theta = 360 + theta; // range [0, 360)
    return theta;
}

function calculateIntersection(p1, p2, p3, p4) {

    var c2x = p3.x - p4.x; // (x3 - x4)
      var c3x = p1.x - p2.x; // (x1 - x2)
      var c2y = p3.y - p4.y; // (y3 - y4)
      var c3y = p1.y - p2.y; // (y1 - y2)
  
      // down part of intersection point formula
      var d  = c3x * c2y - c3y * c2x;
  
      if (d == 0) {
        throw new Error('Number of intersection points is zero or infinity.');
    }
  
      // upper part of intersection point formula
      var u1 = p1.x * p2.y - p1.y * p2.x; // (x1 * y2 - y1 * x2)
      var u4 = p3.x * p4.y - p3.y * p4.x; // (x3 * y4 - y3 * x4)
  
      // intersection point formula
      
      var px = (u1 * c2x - c3x * u4) / d;
      var py = (u1 * c2y - c3y * u4) / d;
      
      var p = { x: px, y: py };
  
      return p;
}

function Transform(props) {
    const [pos, setPos] = useState({ 
        left: props.left,
        top: props.top, 
        angle: props.angle,
        width: props.width,
        height: props.height
    });

    const [topLeft, setTopLeft] = useState({x:0, y:0});
    const [topRight, setTopRight] = useState({x:0, y:0});
    const [bottomLeft, setBottomLeft] = useState({x:0, y:0});
    const [bottomRight, setBottomRight] = useState({x:0, y:0,});

    const refParam = useRef({ 
        left: 0,
        top: 0, 
        angle: 0,
        width: 0,
        height: 0
    });

    const refMove = useRef();
    const refLeft = useRef();
    const refRight = useRef();
    const refTopLeft = useRef();
    const refTopRight = useRef();
    const refBottomLeft = useRef();
    const refBottomRight = useRef();
    const refRotateBottomRight = useRef();
    const refContainer = useRef();

    useEffect(() => {
        console.log("Transform props change")
        console.log("prop change --- props.h=" + props.height + " ; pos.w=" + props.width);
        setPos({ 
            left: props.left,
            top: props.top, 
            angle: props.angle,
            width: props.width,
            height: props.height
        });

        refParam.current = {...props};

        setTopLeft({ x: 0, y: 0 });
        setTopRight({ x: 0, y: 0 });
        setBottomLeft({ x: 0, y: 0 });
        setBottomRight({ x: 0, y: 0 });
    }, [props])

    const calPosChange = () => {
        const pt1 = refTopLeft.current.getBoundingClientRect();
        const pt2 = refTopRight.current.getBoundingClientRect();
        const pt3 = refBottomRight.current.getBoundingClientRect();
        const pt4 = refBottomLeft.current.getBoundingClientRect();
 
        const intereact = calculateIntersection(pt1, pt3, pt2, pt4);

        // get angle from p1 to p2
        const angle = calAngle(pt1.x, pt1.y, pt2.x, pt2.y);
        // get angle from center to p1
        const angleFromCenter = calAngle(intereact.x, intereact.y, pt1.x, pt1.y);
        const width = Math.hypot(Math.abs(pt2.y-pt1.y), Math.abs(pt2.x-pt1.x));
        const height = Math.hypot(Math.abs(pt4.y-pt1.y), Math.abs(pt4.x-pt1.x));
// console.log("cal w:" + width + " h:" + height)
        const hypotenuse = Math.hypot(Math.abs(height), Math.abs(width));
        const radius =  hypotenuse/2;
        const revertAngle = angleFromCenter - angle;
        const x2 = radius * Math.cos(Math.PI * 2 * revertAngle / 360) + intereact.x;
        const y2 = radius * Math.sin(Math.PI * 2 * revertAngle / 360) + intereact.y;

        refParam.current.left = x2;
        refParam.current.top = y2;
        refParam.current.width = width;
        refParam.current.height = height;
        refParam.current.angle = angle;

        props.onMove({
            left: x2,
            top: y2,
            width,
            height,
            angle    
        });
    }

    const handleChange = () => {
        props.onChange(refParam.current);
    };

    const handleMove = (param) => {
        setTopLeft(prev => ({ x: prev.x + param.x, y: prev.y + param.y }) );
        setTopRight(prev => ({ x: prev.x + param.x, y: prev.y + param.y }) );
        setBottomLeft(prev => ({ x: prev.x + param.x, y: prev.y + param.y }) );
        setBottomRight(prev => ({ x: prev.x + param.x, y: prev.y + param.y }) );

        calPosChange();
    };
    
    const handleRotate = (param) => {
        setPos(prev => ({
            ...prev, angle: prev.angle + param.angle
        }));
        
        calPosChange();
    };

    const validateSize = (yOrX, current, param) => {
        if (yOrX === "y") {
    // console.log("current=" + current.y + " ; props.h=" + props.height + " ; pos.h=" + pos.height);
            // const calHeight = pos.height - (current.y + param.y);
            // if (refParam.current.height > 50) {
                return { ...current, y: current.y + param.y }
            // }
            // else {
            //     return current;
            // }
        }
        else if (yOrX === "x") {
            // const calWidth = pos.width - (current.x + param.x);
            // if (refParam.current.width > 50) {
                return { ...current, x: current.x + param.x }
            // }
            // else {
            //     return current;
            // }
        }
    }

    const handleResize = (param) => {
        // console.log(param)
        if (param.type[0] === "N") {
            // console.log("props.h=" + props.height + " ; pos.h=" + pos.height + " ; ref.current.h=" + refParam.current.height);

            if (refParam.current.height <= 50 && param.y > 0) {
                ;
            }
            else {
                setTopLeft(prev => ({ ...prev, y: prev.y + param.y }) );
                setTopRight(prev => ({ ...prev, y: prev.y + param.y }) );  
            }
        }
        else if (param.type[0] === "S") {
            if (refParam.current.height <= 50 && param.y < 0) {
                ;
            }
            else {
                setBottomLeft(prev => validateSize("y", prev, param) );
                setBottomRight(prev => validateSize("y", prev, param) );
            }
        }
        
        if (param.type[1] === "W") {
            if (refParam.current.width <= 50 && param.x > 0) {
                ;
            }
            else {
                setTopLeft(prev => validateSize("x", prev, param) );
                setBottomLeft(prev => validateSize("x", prev, param));
            }
        }
        else if (param.type[1] === "E") {
            if (refParam.current.width <= 50 && param.x < 0) {
                ;
            }
            else {
                setTopRight(prev => validateSize("x", prev, param) );
                setBottomRight(prev => validateSize("x", prev, param) );
            }
        }

        calPosChange();
    }

    useMove(refTopLeft, "NW", props, handleResize, handleChange);
    useMove(refTopRight, "NE", props, handleResize, handleChange);
    useMove(refBottomLeft, "SW", props, handleResize, handleChange);
    useMove(refBottomRight, "SE", props, handleResize, handleChange);
    // useMove(refLeft, "W", props, handleMove);
    // useMove(refRight, "E", props, handleMove);
    useMove(refMove, "M", props, handleMove, handleChange);
    useRotate( refRotateBottomRight, pos, handleRotate, handleChange)
    //useClickOutside(refContainer, props.onClose);

    const styleBorder = {
        left: refParam.current.left + "px",
        top: refParam.current.top + "px",
        width: refParam.current.width + "px",
        height: refParam.current.height + "px",
        transform: `rotate(${refParam.current.angle}deg)`
    };

    const stylePos = {
        left: pos.left + "px",
        top: pos.top + "px",
        width: pos.width + "px",
        height: pos.height + "px",
        transform: `rotate(${pos.angle}deg)`
    };

    const styleTopLeft = {
        transform: `translate(${topLeft.x}px, ${topLeft.y}px)`  
    };
    const styleTopRight = {
        transform: `translate(${topRight.x}px, ${topRight.y}px)`  
    };
    const styleBottomLeft = {
        transform: `translate(${bottomLeft.x}px, ${bottomLeft.y}px)`  
    };
    const styleBottomRight = {
        transform: `translate(${bottomRight.x}px, ${bottomRight.y}px)`  
    };

    const handleMouseLeave = () => {
        // console.log("enter2")
        //setShow(false);
    }

    return <>
        <div className={styles.border} style={styleBorder}></div>
        <div className={styles.main} style={stylePos} ref={refContainer} onMouseMove={handleMouseLeave} > 
            {/* <div className={styles.left} ref={refLeft}></div>
            <div className={styles.right} ref={refRight}></div> */}
            <div className={styles.move} ref={refMove}></div>
            <div className={styles.topLeft} ref={refTopLeft} style={styleTopLeft}></div>
            <div className={styles.topRight} ref={refTopRight} style={styleTopRight}></div>
            <div className={styles.bottomLeft} ref={refBottomLeft} style={styleBottomLeft}></div>
            <div className={styles.bottomRight} ref={refBottomRight} style={styleBottomRight}></div>
            <div className={styles.rotateBottomRight} ref={refRotateBottomRight} style={styleBottomRight}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className={styles.rotate}>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
            </div>
        </div>
    </>
}

export default React.memo(Transform)