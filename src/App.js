import React from 'react';
import './App.css';
import Map from './map'


function App() {

  return (
    <div className="App">
      <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}> 
        <p style={{color: "black", width: '17%', textAlign: 'justify'}}>Time: </p>
      </div>
      <div style={{height: "80vh"}}>
        <Map
          centerPoint={[50.7614912, -1.3812069]}
        />
  
      </div>
    </div>
  );
}

export default App;
