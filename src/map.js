
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import L, { point } from 'leaflet';
import React from 'react';

L.Icon.Default.imagePath='/'

function ChangeView({ center }) {
  const map = useMap();
  map.setView(center);
  return null;
}

const zoomVal = 12;

const MyMarker = (props) => {
  const leafletRef = React.useRef();
  React.useEffect(() => {
    leafletRef.current.openPopup();
  },[])
  return <Marker ref={leafletRef} {...props} />
};

const icon = L.divIcon({
  html: `<img src="./circle.svg" />`,
  iconSize: [40, 40],
  popupAnchor: [2,41]
});


const Map = (props) =>  {
  return (
    <MapContainer center={props.centerPoint} zoom={zoomVal} scrollWheelZoom={false} >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.hasSeaOverlay && <TileLayer
        url="https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png" />}
      <ChangeView center={props.centerPoint} />
      <MyMarker position={[50.7579852, -1.3715592]} icon={icon}>
        <Popup offset={[0, 0]} className="request-popup" closeButton={false} autoClose={false} closeOnEscapeKey={false} closeOnClick={false}>
            10
        </Popup>
      </MyMarker>
    </MapContainer>
  )
}
  
;

export default Map;