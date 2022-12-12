import { useState, useEffect, useRef, useCallback } from 'react';
import Transform from './Transform';

export default function Image(props) {
    const [pos, setPos] = useState({
        left: 0,
        top: 0,
        angle: 0,
        width: 0,
        height: 0
    });

    const [show, setShow] = useState(true);

    useEffect(() => {
        setPos({...props});
        console.log("App props changes")
    }, [props]);

    const handleClick = () => {
        setShow(true);
    }; 

    const handleMove = useCallback(
        (param) => {
            setPos(param);
        },
        [props]
      );

    const handleChange = useCallback(
        (param) => {
           props.onChange(param);
        },
        [props]
    );

    const handleClose = useCallback(
        () => {
            setShow(false);
        },
        [props]
    );

    const stylePos = {
        left: pos.left + "px",
        top: pos.top + "px",
        width: pos.width + "px",
        height: pos.height + "px",
        transform: `rotate(${pos.angle}deg)`
    };

    const handleMouseEnter = () => {
        // console.log("enter")
        // setShow(true);
    }

    return (
        <>  
            <div className="img-container" style={stylePos} onMouseMove={handleMouseEnter} >
                <img src="./abc.png" onClick={handleClick} />
            </div>
            { show && <Transform {...props} onChange={handleChange} onMove={handleMove} onClose={handleClose} /> }
        </>
    );
  }

