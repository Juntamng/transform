import { useState } from 'react';
import Image from './components/Image';

import './App.css';

function App() {
  const center = {
    top: 307,
    left: 712
  };
  
  function calAngle(cx, cy, ex, ey) {
    var dy = ey - cy;
    var dx = ex - cx;
    var theta = Math.atan2(dy, dx); // range (-PI, PI]
    theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
    if (theta < 0) theta = 360 + theta; // range [0, 360)
    return theta;
  }
  
  var radius = 60;
  var angle  = 167;
  var y = radius * Math.sin(Math.PI * 2 * angle / 360);
  var x = radius * Math.cos(Math.PI * 2 * angle / 360);
  
  let Angle2 = calAngle(center.left, center.top, center.left + x, center.top + y);

  console.log( "x=" + x + ";y=" + y + ";angle=" + Angle2 );
  const styles = {
    left: center.left + x,
    top: center.top + y
  };

  // console.log('Points coors are  x=' + 
  //   Math.round(x * 100) / 100 +', y=' +
  //   Math.round(y * 100) / 100);

  const [pos, setPos] = useState({
    x1: 150,
    y1: 150,
    x2: 350,
    y2: 350,
    deg: 0
  })

  function handleTransformChange(param) {
    setPos(prev => (
      {
        x1: prev.x1 + param.x1,
        y1: prev.y1 + param.y1,
        x2: prev.x2 + param.x2,
        y2: prev.y2 + param.y2,
        deg: prev.deg + param.deg
      }
    ));
  }

  const [pos2, setPos2] = useState({
    x1: 650,
    y1: 650,
    x2: 750,
    y2: 750,
    deg: 0
  })

  function handleTransformChange2(param) {
    setPos2(prev => (
      {
        x1: prev.x1 + param.x1,
        y1: prev.y1 + param.y1,
        x2: prev.x2 + param.x2,
        y2: prev.y2 + param.y2,
        deg: prev.deg + param.deg
      }
    ));
  }

  return (
    <div className="App">
      <div className="center"></div>
      <div className="hand" style={styles}></div>
      <img src="./abc.png" className="abc" />
      <Image {...pos} onChange={handleTransformChange} />
      <Image {...pos2} onChange={handleTransformChange2} />
    </div>
  );
}

export default App;
