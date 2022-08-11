
import { MapContainer, TileLayer, Popup, useMap } from 'react-leaflet'
import ReactLeafletDriftMarker from "react-leaflet-drift-marker"
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import React from 'react';

L.Icon.Default.imagePath='/'

function ChangeView({ center }) {
  const map = useMap();
  map.setView(center);
  return null;
}

const zoomVal = 7;

const MyMapComponent = (props) =>  {
  const iconBoatGreen = L.divIcon({
    html: `<img src="./boat_green.svg" style="transform: rotate(${props.brynHeading}deg)"/>`,
    iconSize: [40, 40],
  });
  const iconBoatRed = L.divIcon({
    html: `<img src="./boat_red.svg" style="transform: rotate(${props.victoryHeading}deg)"/>`,
    iconSize: [40, 40],
  });

  const mapIconMayflower = props.isMASUnderTow ? L.divIcon({
    html: `<img src="./mayflowerTop.svg" style="transform: rotate(${props.masHeading}deg)" />`,
    iconSize: [30, 30],
    iconAnchor:[30, 10],
  }) : L.divIcon({
    html: `<img src="./mayflowerTop.svg" style="transform: rotate(${props.masHeading}deg)" />`,
    iconSize: [30, 30],
  });

  return (
    <MapContainer center={props.centerPoint} zoom={zoomVal} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
         <TileLayer
        url="https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png" />
        <ChangeView center={props.centerPoint} />
        <ReactLeafletDriftMarker position={props.masLoc} duration={50} icon={mapIconMayflower}>
          <Popup>
            MAS
          </Popup>
        </ReactLeafletDriftMarker>
        <ReactLeafletDriftMarker icon={iconBoatGreen} duration={50}  position={props.brynLoc}>
          <Popup>
            Bryn
          </Popup>
        </ReactLeafletDriftMarker>
        <ReactLeafletDriftMarker icon={iconBoatRed} duration={50}  position={props.vicLoc}>
          <Popup>
            Victory
          </Popup>
      </ReactLeafletDriftMarker>
    </MapContainer>
  )
}
  
;

export default MyMapComponent;