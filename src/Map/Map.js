
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import ReactLeafletDriftMarker from "react-leaflet-drift-marker"
import L from 'leaflet';
import React from 'react';
import { useData } from '../DataContext';
import './Map.css'

L.Icon.Default.imagePath='/'

function ChangeView({ center }) {
  const map = useMap();
  map.setView(center);
  return null;
}

const zoomVal = 12;



const Map = (props) =>  {

  const { tideMarker, tideLatest, tideTime, planes, rainfallStations, rainfallData } = useData();
  
  const planeIcon = (heading) => L.divIcon({
    html: `<img src="./plane.svg" style="transform: rotate(${heading}deg)"/>`,
    iconSize: [40, 40],
  });

  return (
    <MapContainer center={props.centerPoint} zoom={zoomVal} scrollWheelZoom={false} >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <TileLayer
        url="https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png" />
      {tideMarker && <Marker position={[tideMarker.lat, tideMarker.long]}>
        <Popup>
          Tide Height: {tideLatest}m @ {tideTime}
        </Popup>
      </Marker>}
      {rainfallStations && rainfallStations.map(station => 
        <Marker position={[station.lat, station.long]} key={station.id}>
          <Popup>
            {rainfallData && `Rainfall: ${rainfallData[station.id]?.value}mm @ ${rainfallData[station.id]?.timestamp}`}
          </Popup>
        </Marker>
      )}

      {planes && planes.map(plane => 
       <ReactLeafletDriftMarker position={[plane.lat, plane.long]} duration={50} icon={planeIcon(plane.heading)} key={plane.callsign}>
          <Popup>
            Plane {plane.callsign} @ {plane.altitude}m
          </Popup>
        </ReactLeafletDriftMarker>
          )}

      <ChangeView center={props.centerPoint} />
    </MapContainer>
  )
}
  
;

export default Map;