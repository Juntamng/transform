import { useState, useRef } from 'react';
import { useMove } from './hooks/useMove';
import Image from './components/Image';

import './App.css';
import Transform from './components/Transform';

function App() {
  const [img1, setImg1] = useState(
    {
      left: 100,
      top: 100,
      angle: 0,
      width: 250,
      height: 250
    }
  );
  
  const handleChange = (param) => {
    setImg1(param);
  }
  return (
    <div className="App">
       <Image {...img1}  onChange={handleChange} />
      
      {/* <div style={{
        position: "absolute",
        // backgroundColor: "yellow", 
        top: "100px",
        left: "100px",
        width: "300px",
        height: "300px",
        // transform: "scale(1.1)"
      }}>
      </div> */}
    </div>
  );
}

export default App;
