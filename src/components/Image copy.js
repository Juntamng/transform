import { useState } from 'react';
import Transform from './Transform';

export default function Image(props) {
    const [show, setShow] = useState(false);

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

    const handleClick = () => {
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
    }

    return (
        <>  
            <div className="img-container" style={stylePos}>
                <img src="./abc.png" onClick={handleClick} style={styleRotate}></img>
            </div>
            { show && <Transform {...props} onClose={handleClose} /> }
        </>
    );
  }

