
import React from 'react';
import './Data.css';
import Indicator from '../Indicator/Indicator';
import { useData } from '../DataContext';
import { PieChart } from 'react-minimal-pie-chart';

const STATUS_TO_COLOUR = {'Connected': '#00cc00', 'Reconnecting': '#cc3300', 'Connecting': '#ffff66', 'Error': '#ff0000', 'Offline': '#ff0000', 'Closed': '#99ff99'};
const Data = () =>  {
  
  const { 
    connectionStatus, 
    carbonIntensity, 
    carbonTime, 
    carbonColour, 
    carbonBiomass, 
    carbonGas, 
    carbonCoal , 
    carbonImports, 
    carbonNuclear, 
    carbonOther, 
    carbonHydro, 
    carbonSolar, 
    carbonWind,
    tideLatest
  } = useData();


  const defaultLabelStyle = {
    fontSize: '5px',
    fontFamily: 'sans-serif',
  };

  return (
    <div className='data-container'>
      <h1>Toms Map</h1>
      <div className='status-container'>
        <span>{`System Status:`}</span>
        <Indicator text={connectionStatus} value={STATUS_TO_COLOUR[connectionStatus]} />
      </div>
      <h2>Carbon <span>in postcode area</span></h2>
      {carbonIntensity && 
        <div className='status-container'>
          <span>Carbon Status:</span> 
          {carbonIntensity && carbonColour && <Indicator text={carbonIntensity} value={carbonColour} />}
        </div>
      }
      <div style={{height: '30%', width: '50%'}}>
        <PieChart
          data={[
            { title: 'Biomass', value: Number(carbonBiomass), color: '#99cc00' },
            { title: 'Gas', value: Number(carbonGas) || 0, color: '#cc99ff' },
            { title: 'Coal', value: Number(carbonCoal) || 0, color: '#737373' },
            { title: 'Imports', value: Number(carbonImports) || 0, color: '#8b4785' },
            { title: 'Nuclear', value: Number(carbonNuclear) || 0, color: '#ff0000' },
            { title: 'Other', value: Number(carbonOther) || 0, color: '#29ca03' },
            { title: 'Hydro', value: Number(carbonHydro) || 0, color: '#0066ff' },
            { title: 'Solar', value: Number(carbonSolar) || 0, color: '#ffff00' },
            { title: 'Wind', value: Number(carbonWind) || 0, color: '#00cc00' },
          ]}
          animate
          label={({ dataEntry }) => dataEntry.value > 8 ? dataEntry.title : ""}
          labelStyle={{
            ...defaultLabelStyle,
          }}
        />
      </div>
      {carbonTime && <p className='time'>{`Timestamp: ${carbonTime}`}</p>}
      <h2>Tide <span>blue markers</span></h2>
      <div>
        {tideLatest && <span>Height at Bournemouth: {tideLatest}m</span>}
      </div>
    </div>
  )
}
  
;

export default Data;