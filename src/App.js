import React from 'react';
import './App.css';
import Map from './Map'


function App() {

  const [hasSeaOverlay, setHasSeaOverlay] = React.useState();

  const handleSeaOverlayClick = () => {
    const current = hasSeaOverlay;
    setHasSeaOverlay(!current)
  };

  return (
    <div className="App">
      <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', margin: '1rem 0'}}> 
        <p style={{color: "black", width: '17%', textAlign: 'justify'}}>Time: </p>
        <button onClick={handleSeaOverlayClick}>Toggle Sea Overlay</button>
      </div>
      <div style={{height: "80vh"}}>
        <Map
          centerPoint={[50.7614912, -1.3812069]}
          hasSeaOverlay={hasSeaOverlay}
        />

      </div>
    </div>
  );
}

export default App;
