import { useRef, useState } from "react";
import { useMove } from "../hooks/useMove";

import styles from "./Dnd.module.css";

export default function Dnd(props) {
    const a = useRef();
    const [pos, setPos] = useState({x: 100, y:100});
    const pos2 = useMove(a);
console.log(pos2)
    //console.log(p);

    // const [startPos, setStartPos] = useState({x:0, y:0});

    // const mouseMove = (e) => {
    //     setPos( prevPos => ({x: prevPos.x+e.movementX, y: prevPos.y+e.movementY}) );
    //     // console.log( e.movementX, e.movementY );
    // }

    // const mouseUp = (e) => {
    //     document.removeEventListener('mousemove', mouseMove);
    // };

    // const handleMouseDown = (e) => {
    //     setStartPos({x: e.pageX, y: e.pageY});
    //     document.addEventListener('mousemove', mouseMove);
    //     document.addEventListener('mouseup', mouseUp, true);
    // };

    return (
        <div ref={a}
            style={{
                transform: `translate(${pos.x}px, ${pos.y}px)`,
            }}
            // onMouseDown={handleMouseDown}
            className={styles.dnd}
        ></div>
    );
}
