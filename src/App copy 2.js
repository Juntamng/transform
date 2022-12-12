import { useState, useRef } from 'react';
import { useMove } from './hooks/useMove';
import Image from './components/Image';

import './App.css';

function App() {
  const refPoint = useRef();
  const [point, setPoint] = useState({x:0, y:0, deg: 45});

  const handleMove = (param) => {
    setPoint(prev => (
        {
            x: prev.x + param.x,
            y: prev.y + param.y
        }
    ));
  };

  useMove(refPoint, point, handleMove);

  const style = {
    transform: `translate(${point.x}px, ${point.y}px)`  
  };

  return (
    <div className="App">
      <div className="square">
        <div className="center"></div>
        <div className="hand" ref={refPoint} style={style}></div>
      </div>
    </div>
  );
}

export default App;

// const center = {
//   top: 307,
//   left: 712
// };

// function calAngle(cx, cy, ex, ey) {
//   var dy = ey - cy;
//   var dx = ex - cx;
//   var theta = Math.atan2(dy, dx); // range (-PI, PI]
//   theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
//   if (theta < 0) theta = 360 + theta; // range [0, 360)
//   return theta;
// }

// var radius = 60;
// var angle  = 167;
// var y = radius * Math.sin(Math.PI * 2 * angle / 360);
// var x = radius * Math.cos(Math.PI * 2 * angle / 360);

// let Angle2 = calAngle(center.left, center.top, center.left + x, center.top + y);

// console.log( "x=" + x + ";y=" + y + ";angle=" + Angle2 );

// const styles = {
//   left: center.left + x,
//   top: center.top + y
// };