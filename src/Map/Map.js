import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import ReactLeafletDriftMarker from "react-leaflet-drift-marker";
import L from "leaflet";
import React from "react";
import { useData } from "../DataContext";
import "./Map.css";

L.Icon.Default.imagePath = "/";

function ChangeView({ center }) {
  const map = useMap();
  map.setView(center);
  return null;
}

const zoomVal = 12;

const Map = (props) => {
  const {
    tideMarker,
    tideLatest,
    tideTime,
    planes,
    rainfallStations,
    rainfallData,
    weather,
    parkstoneTrain,
    branksomeTrain,
    pooleTrain,
    hamworthyTrain,
    pokesdownTrain,
    bournemouthTrain,
    christchurchTrain,
    ships
  } = useData();

  const planeIcon = (heading) =>
    L.divIcon({
      html: `<img src="./circle_orange.svg" style="transform: rotate(${heading}deg)"/>`,
      iconSize: [20, 20],
    });

  const trainIcon = () =>
    L.divIcon({
      html: `<img src="./circle_yellow.svg"/>`,
      iconSize: [20, 20],
    });

  const shipIconDocked = () =>
    L.divIcon({
      html: `<img src="./circle_red.svg"/>`,
      iconSize: [20, 20],
    });

  const shipIconActive = () =>
    L.divIcon({
      html: `<img src="./circle_green.svg"/>`,
      iconSize: [20, 20],
    });

  const weatherIcon = () =>
    L.divIcon({
      html: `<img src="./circle_pink.svg"/>`,
      iconSize: [20, 20],
    });

  const tideIcon = () =>
    L.divIcon({
      html: `<img src="./circle_blue.svg"/>`,
      iconSize: [20, 20],
    });

  const rainfallIcon = () =>
    L.divIcon({
      html: `<img src="./circle_purple.svg"/>`,
      iconSize: [20, 20],
    });

  return (
    <MapContainer
      center={props.centerPoint}
      zoom={zoomVal}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <TileLayer url="https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png" /> */}
      {ships &&
        ships.map((ship) => (
          <ReactLeafletDriftMarker
            position={[ship[2], ship[3]]}
            duration={50}
            icon={Number(ship[1]) <= 1 ? shipIconDocked() : shipIconActive()}
            key={ship[0]}
          >
            <Popup>
              {ship[0]}
            </Popup>
          </ReactLeafletDriftMarker>
        ))}
      {tideMarker && (
        <Marker position={[tideMarker.lat, tideMarker.long]} icon={tideIcon()}>
          <Popup>
            Tide Height: {tideLatest}m @ {tideTime}
          </Popup>
        </Marker>
      )}
      {rainfallStations &&
        rainfallStations.map((station) => (
          <Marker position={[station.lat, station.long]} key={station.id} icon={rainfallIcon()}>
            <Popup>
              {rainfallData &&
                `Rainfall: ${rainfallData[station.id]?.value}mm @ ${
                  rainfallData[station.id]?.timestamp
                }`}
            </Popup>
          </Marker>
        ))}
      {weather &&
        Object.keys(weather).map((weatherS) => {
          const station = weather[weatherS];
          return (
            <Marker position={[station.lat, station.long]} key={weatherS} icon={weatherIcon()}>
              <Popup>
                <p>{`Weather: ${station.desc} `}</p>
                <p>{`Temperature: ${station.temp} Celcius`}</p>
                <p>{`Humidity: ${station.humidity}%`}</p>
                <p>{`Time: ${station.timestamp}`}</p>
              </Popup>
            </Marker>
          );
        })}
      {planes &&
        planes.map((plane) => (
          <ReactLeafletDriftMarker
            position={[plane.lat, plane.long]}
            duration={50}
            icon={planeIcon(plane.heading)}
            key={plane.callsign}
          >
            <Popup>
              Plane {plane.callsign} @ {plane.altitude}m
            </Popup>
          </ReactLeafletDriftMarker>
        ))}
      {parkstoneTrain && (
        <ReactLeafletDriftMarker
          position={[50.7230093, -1.950156]}
          duration={50}
          icon={trainIcon()}
        >
          <Popup>Train at Parkstone Station</Popup>
        </ReactLeafletDriftMarker>
      )}
      {branksomeTrain && (
        <ReactLeafletDriftMarker
          position={[50.7270509, -1.9218713]}
          duration={50}
          icon={trainIcon()}
        >
          <Popup>Train at Branksome Station</Popup>
        </ReactLeafletDriftMarker>
      )}
      {pooleTrain && (
        <ReactLeafletDriftMarker
          position={[50.719481, -1.9854886]}
          duration={50}
          icon={trainIcon()}
        >
          <Popup>Train at Poole Station</Popup>
        </ReactLeafletDriftMarker>
      )}
      {christchurchTrain && (
        <ReactLeafletDriftMarker
          position={[50.7382893,-1.7867063]}
          duration={50}
          icon={trainIcon()}
        >
          <Popup>Train at Christchurch Station</Popup>
        </ReactLeafletDriftMarker>
      )}
      {bournemouthTrain && (
        <ReactLeafletDriftMarker
          position={[50.7272201,-1.868587]}
          duration={50}
          icon={trainIcon()}
        >
          <Popup>Train at Bournemouth Station</Popup>
        </ReactLeafletDriftMarker>
      )}
      {pokesdownTrain && (
        <ReactLeafletDriftMarker
          position={[50.7310126,-1.8272649]}
          duration={50}
          icon={trainIcon()}
        >
          <Popup>Train at Pokesdown Station</Popup>
        </ReactLeafletDriftMarker>
      )}
      {hamworthyTrain && (
        <ReactLeafletDriftMarker
          position={[50.7252057,-2.0216467]}
          duration={50}
          icon={trainIcon()}
        >
          <Popup>Train at Hamworthy Station</Popup>
        </ReactLeafletDriftMarker>
      )}
      <ChangeView center={props.centerPoint} />
    </MapContainer>
  );
};

export default Map;
