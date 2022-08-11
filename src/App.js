import React from 'react';
import masData from './data/mas.json'
import victoryData from './data/victory.json'
import brynData from './data/bryn.json'
import './App.css';
import Map from './map'
import { parseJSON ,format,compareAsc } from 'date-fns'
import {points, center} from '@turf/turf'


function App() {
  const [iteration, setIteration] = React.useState(0);
  const [masLoc, setMasLoc] = React.useState({lat: masData[0].latitude, lng: masData[0].longitude});
  const [brynLoc, setBrynLoc] = React.useState({lat: brynData[0].latitude, lng: brynData[0].longitude});
  const [vicLoc, setVicLoc] = React.useState({lat: victoryData[0].latitude, lng: victoryData[0].longitude});
  const [isMasUnderTowFromB, setIsMasUnderTowFromB] = React.useState(false);
  const [isMasUnderTowFromV, setIsMasUnderTowFromV] = React.useState(false);
  const [isStopped, setIsStopped] = React.useState(false);
  
  

  const allPointsInOrder = React.useMemo(() => {
    const allPoints = [...victoryData, ...brynData, ...masData];
    return allPoints.sort(function (a, b) {
      return compareAsc(parseJSON(a.timeStamp),parseJSON(b.timeStamp));
    }
  )}, []);
  
  const millisecondsPerUpdate = 120000/ allPointsInOrder.length ;

  React.useEffect(() => {
    const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
      const oldIteration = iteration;
      const newIteration = oldIteration +1;
      if (iteration >= allPointsInOrder.length - 1 || compareAsc(parseJSON("2021-06-25 09:46:51"),parseJSON(allPointsInOrder[newIteration].timeStamp)) < 0) {
        setIsStopped(true);
        return () => clearInterval(intervalId);
      }
      if (iteration !== 0 && allPointsInOrder[newIteration].vessel === "MAYFLOWER 400") {
        setMasLoc({lat: allPointsInOrder[newIteration].latitude, lng: allPointsInOrder[newIteration].longitude, heading:allPointsInOrder[newIteration].courseOverGround})
      }
      if (iteration !== 0 && allPointsInOrder[newIteration].vessel === "BRYN")  {
        setBrynLoc({lat: allPointsInOrder[newIteration].latitude, lng: allPointsInOrder[newIteration].longitude, heading:allPointsInOrder[newIteration].courseOverGround})
        if (isMasUnderTowFromB) {
          setMasLoc({lat: allPointsInOrder[newIteration].latitude, lng: allPointsInOrder[newIteration].longitude, heading:allPointsInOrder[newIteration].courseOverGround})
        }
      }
      if (iteration !== 0 && allPointsInOrder[newIteration].vessel === "MTS VICTORY")  {
        setVicLoc({lat: allPointsInOrder[newIteration].latitude, lng: allPointsInOrder[newIteration].longitude, heading:allPointsInOrder[newIteration].courseOverGround})
        if (isMasUnderTowFromV) {
          setMasLoc({lat: allPointsInOrder[newIteration].latitude, lng: allPointsInOrder[newIteration].longitude, heading:allPointsInOrder[newIteration].courseOverGround})
        }
      }
      if (compareAsc(parseJSON("2021-06-24 11:36:40"),parseJSON(allPointsInOrder[newIteration].timeStamp)) < 0) {
        setIsMasUnderTowFromV(false);
        setIsMasUnderTowFromB(true);
      } else if (compareAsc(parseJSON("2021-06-22 17:19:37"),parseJSON(allPointsInOrder[newIteration].timeStamp)) < 0) {
        setIsMasUnderTowFromV(true);
      }
      setIteration(newIteration)
    }, millisecondsPerUpdate)
    return () => clearInterval(intervalId); //This is important
  }, [iteration, allPointsInOrder, isMasUnderTowFromV,isMasUnderTowFromB,millisecondsPerUpdate])
  

  const customCenter = center(points([
    [masLoc.lat, masLoc.lng],
    [brynLoc.lat, brynLoc.lng],
    [vicLoc.lat, vicLoc.lng],
  ]));

  return (
    <div className="App">
       <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}> 
        <p style={{color: "black", width: '17%', textAlign: 'justify'}}>Time: {format(parseJSON(allPointsInOrder[iteration].timeStamp), 'dd/MM/yyyy HH:mm:ss')}</p>
      </div>
      <div style={{height: "80vh"}}>
        <Map 
          masHeading={masLoc.heading}
          isStopped={isStopped}
          isMASUnderTow={isMasUnderTowFromV}
          brynHeading={brynLoc.heading}
          victoryHeading={vicLoc.heading}
          masLoc={[masLoc.lat, masLoc.lng]} 
          brynLoc={[brynLoc.lat, brynLoc.lng]} 
          vicLoc={[vicLoc.lat, vicLoc.lng]} 
          centerPoint={[customCenter.geometry.coordinates[0], customCenter.geometry.coordinates[1]]}
        />
        
      </div>
      <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', marginLeft: 100}}> 
        <p style={{color: "black", width: '35%', textAlign: 'justify', marginTop: 5, marginBottom: 0 }}>MAS Position: {parseFloat(masLoc.lat.toFixed(4))}, {parseFloat(masLoc.lng.toFixed(4))} {(isMasUnderTowFromB || isMasUnderTowFromV) && <span>(under tow)</span>}</p>
        <p style={{color: "green",  width: '35%', textAlign: 'justify', marginBottom: 0, marginTop: 5}}>Bryn Position: {parseFloat(brynLoc.lat.toFixed(4))}, {parseFloat(brynLoc.lng.toFixed(4))} {isMasUnderTowFromB && <span>(towing MAS)</span>}</p>
        <p style={{color: "red",  width: '35%', textAlign: 'justify',marginBottom: 0, marginTop: 5}} >Victory Position: {parseFloat(vicLoc.lat.toFixed(4))}, {parseFloat(vicLoc.lng.toFixed(4))} {isMasUnderTowFromV && <span>(towing MAS)</span>}</p>
      </div>
     
    </div>
  );
}

export default App;
