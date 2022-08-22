
import React from 'react';
import './Data.css';
import { useMqttState, useSubscription } from 'mqtt-react-hooks';
import Indicator from '../Indicator/Indicator';

const Data = () =>  {
  const { connectionStatus } = useMqttState(); 
  const { message: msgIntensity } = useSubscription([
    'tomdev/carbon/intensity',
  ]);
  const { message: msgTime  } = useSubscription([
    'tomdev/carbon/timestamp'
  ]);
  const { message: msgColour  } = useSubscription([
    'tomdev/carbon/colour'
  ]);

  const dtOptions = {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
    hour12: false,
  };

  return (
    <div className='data-container'>
      <h1>Toms Map</h1>
      <h2>{`Status: ${connectionStatus}`}</h2>
      {!!msgIntensity?.message && 
        <div className='status-container'>
          <span>Carbon Status:</span> 
          {msgIntensity && msgColour && <Indicator text={msgIntensity?.message} value={msgColour?.message} />}
        </div>
      }
      {!!msgTime?.message && <p>{`Carbon Time: ${new Intl.DateTimeFormat('en-GB', dtOptions).format(msgTime?.message)}`}</p>}
    
    </div>
  )
}
  
;

export default Data;