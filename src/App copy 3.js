import { useState, useRef } from 'react';
import { useMove } from './hooks/useMove';
import Image from './components/Image';

import './App.css';

function App() {
  const refPoint1 = useRef();
  const refPoint2 = useRef();
  const refPoint3 = useRef();
  const refPoint4 = useRef();
  const [deg, setDeg] =  useState(145)
  const [point1, setPoint1] = useState({x:0, y:0, deg:145});
  const [point2, setPoint2] = useState({x:0, y:0, deg:145});
  const [point3, setPoint3] = useState({x:0, y:0, deg:145});
  const [point4, setPoint4] = useState({x:0, y:0, deg:145});

  const handleMove1 = (param) => {
    console.log(param)
    setPoint1(prev => (
        {
            x: prev.x + param.x1,
            y: prev.y + param.y1
        }
    ));

    setPoint2(prev => (
      { ...prev, y: prev.y + param.y1 }
    ));

    setPoint4(prev => (
      { ...prev, x: prev.x + param.x1 }
    ));
  };

  const handleMove2 = (param) => {
    setPoint2(prev => (
        {
            x: prev.x + param.x1,
            y: prev.y + param.y1
        }
    ));

    setPoint1(prev => (
      { ...prev, y: prev.y + param.y1 }
    ));

    setPoint3(prev => (
      { ...prev, x: prev.x + param.x1 }
    ));
  };

  const handleMove3 = (param) => {
    setPoint3(prev => (
        {
            x: prev.x + param.x1,
            y: prev.y + param.y1
        }
    ));

    setPoint4(prev => (
      { ...prev, y: prev.y + param.y1 }
    ));

    setPoint2(prev => (
      { ...prev, x: prev.x + param.x1 }
    ));
  };

  const handleMove4 = (param) => {
    setPoint4(prev => (
        {
            x: prev.x + param.x1,
            y: prev.y + param.y1
        }
    ));

    setPoint3(prev => (
      { ...prev, y: prev.y + param.y1 }
    ));

    setPoint1(prev => (
      { ...prev, x: prev.x + param.x1 }
    ));
  };

  useMove(refPoint1, "NW", point1, handleMove1);
  useMove(refPoint2, "NW", point1, handleMove2);
  useMove(refPoint3, "NW", point1, handleMove3);
  useMove(refPoint4, "NW", point1, handleMove4);

  const style1 = {
    transform: `translate(${point1.x}px, ${point1.y}px)`  
  };
  const style2 = {
    transform: `translate(${point2.x}px, ${point2.y}px)`  
  };
  const style3 = {
    transform: `translate(${point3.x}px, ${point3.y}px)`  
  };
  const style4 = {
    transform: `translate(${point4.x}px, ${point4.y}px)`  
  };
  
  const generateImageStyle = () => {
    let y = 0;
    let x = 0;
    let x1 = x + point1.x;
    let y1 = y + point1.y;
    let x2 = x + 100 + point3.x;
    let y2 = y + 100 + point3.y;

    return {
      width: (x2 - x1)+"px",
      height: (y2 - y1)+"px",
      transform: `translate(${x1}px, ${y1}px)`
    }
  }

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

  let rotateStyle = {
    transform: `rotate(${deg}deg)`  
  };

  return (
    <div className="App">
      <div className="square" style={rotateStyle}>
        <div className="center"></div>
        <div className="hand1" ref={refPoint1} style={style1}></div>
        <div className="hand2" ref={refPoint2} style={style2}></div>
        <div className="hand3" ref={refPoint3} style={style3}></div>
        <div className="hand4" ref={refPoint4} style={style4}></div>
      </div>
      <div className="imgWrapper" style={rotateStyle}>
        <img src="./abc.png" className="abc" style={generateImageStyle()}/>
      </div>
      <Image {...pos} onChange={handleTransformChange} />
      <Image {...pos2} onChange={handleTransformChange2} />
    </div>
  );
}

export default App;
