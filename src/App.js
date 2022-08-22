import React from 'react';
import './App.css';
import Map from './Map/Map';
import Data from './Data/Data';
import { Connector } from 'mqtt-react-hooks';

function App() {
  const randomId =`mqttjs_ ${Math.random().toString(16).substr(2, 8)}`;
  return (
    <Connector brokerUrl="wss://mqtt.eclipseprojects.io:443/mqtt" options={{
      clientId: randomId,
      rejectUnauthorized: false,
    }}>
       <div className="app">
          <div style={{height: "100vh"}}>
            <Map
              centerPoint={[50.7120585, -1.9058966]}
            />
          </div>
          <Data />
        </div>
    </Connector>
  );
}

export default App;
