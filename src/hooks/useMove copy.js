import { useState, useEffect } from 'react';

export function useMove(ref) {
    const [pos, setPos] = useState({x:0, y:0});

    const mouseMove = (e) => {
        setPos({...pos, x: e.movementX, y: e.movementY});
    };
    
    const mouseUp = (e) => {
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);
    };

    const handleMouseDown = (e) => {
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
    };

    useEffect(() => {
        ref.current.addEventListener("mousedown", handleMouseDown);
        return () => {
            ref.current.removeEventListener("mousedown", handleMouseDown);
            document.removeEventListener('mousemove', mouseMove);
            document.removeEventListener('mouseup', mouseUp);
        }
    }, []);

    return pos;
}