
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import React from 'react';
import { useData } from '../DataContext';


L.Icon.Default.imagePath='/'

function ChangeView({ center }) {
  const map = useMap();
  map.setView(center);
  return null;
}

const zoomVal = 12;



const Map = (props) =>  {

  const { tideMarker, tideLatest, tideTime, planes } = useData();
  
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
      {planes && planes.map(plane => 
        <Marker position={[plane.lat, plane.long]}>
          <Popup>
            Plane {plane.callsign} @ {plane.altitude}m
          </Popup>
        </Marker>
      )}
      <ChangeView center={props.centerPoint} />
    </MapContainer>
  )
}
  
;

export default Map;