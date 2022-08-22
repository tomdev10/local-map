
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import React from 'react';

L.Icon.Default.imagePath='/'

function ChangeView({ center }) {
  const map = useMap();
  map.setView(center);
  return null;
}

const zoomVal = 12;

const Map = (props) =>  {
  return (
    <MapContainer center={props.centerPoint} zoom={zoomVal} scrollWheelZoom={false} >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <TileLayer
        url="https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png" />
      <ChangeView center={props.centerPoint} />
    </MapContainer>
  )
}
  
;

export default Map;