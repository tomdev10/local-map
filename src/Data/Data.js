import React from "react";
import "./Data.css";
import Indicator from "../Indicator/Indicator";
import { useData } from "../DataContext";
import { PieChart } from "react-minimal-pie-chart";

const STATUS_TO_COLOUR = {
  Connected: "#00cc00",
  Reconnecting: "#cc3300",
  Connecting: "#ffff66",
  Error: "#ff0000",
  Offline: "#ff0000",
  Closed: "#99ff99",
};
const Data = () => {
  const {
    connectionStatus,
    carbonIntensity,
    carbonTime,
    carbonColour,
    carbonBiomass,
    carbonGas,
    carbonCoal,
    carbonImports,
    carbonNuclear,
    carbonOther,
    carbonHydro,
    carbonSolar,
    carbonWind
  } = useData();

  const defaultLabelStyle = {
    fontSize: "5px",
    fontFamily: "sans-serif",
  };

  return (
    <div className="data-container">
      <h1>MQTT Map</h1>
      <p>Data Provided by:</p>
      <ul>
        <li>DEFRA Tidal Sensor API</li>
        <li>DEFRA Rainfall Gauge Network</li>
        <li>Carbon Intensity API</li>
        <li>OpenSky Air Traffic API</li>
        <li>OpenWeather Current Weather API</li>
        <li>Realtime Trains API</li>
        <li>Myshiptracking.com</li>
        <li>TomTom Traffic API</li>
      </ul>
      <div className="status-container">
        <span>{`System Status:`}</span>
        <Indicator
          text={connectionStatus}
          value={STATUS_TO_COLOUR[connectionStatus]}
        />
      </div>
      <p>Key:</p>
      <ul style={{listStyle: "none", padding: 0}}>
        <li className="list-item-key"><img src="./circle_blue.svg" alt="blue circle"/>Tide Sensor</li>
        <li className="list-item-key"><img src="./circle_orange.svg" alt="orange circle"/>Plane Position</li>
        <li className="list-item-key"><img src="./circle_pink.svg" alt="pink circle"/>Weather Station</li>
        <li className="list-item-key"><img src="./circle_yellow.svg" alt="yellow circle"/>Train Position</li>
        <li className="list-item-key"><img src="./circle_purple.svg" alt="purple circle"/>Rainfall Sensor</li>
        <li className="list-item-key"><img src="./circle_green.svg" alt="green circle"/>Ship Underway</li>
        <li className="list-item-key"><img src="./circle_red.svg" alt="red circle"/>Ship Docked</li>
      </ul>
      <h2>
        Carbon <span>in postcode area</span>
      </h2>
      {carbonIntensity && (
        <div className="status-container">
          <span>Carbon Status:</span>
          {carbonIntensity && carbonColour && (
            <Indicator text={carbonIntensity} value={carbonColour} />
          )}
        </div>
      )}
      <div style={{ height: "30%", width: "50%" }}>
        <PieChart
          data={[
            {
              title: "Biomass",
              value: Number(carbonBiomass),
              color: "#99cc00",
            },
            { title: "Gas", value: Number(carbonGas) || 0, color: "#cc99ff" },
            { title: "Coal", value: Number(carbonCoal) || 0, color: "#737373" },
            {
              title: "Imports",
              value: Number(carbonImports) || 0,
              color: "#8b4785",
            },
            {
              title: "Nuclear",
              value: Number(carbonNuclear) || 0,
              color: "#ff0000",
            },
            {
              title: "Other",
              value: Number(carbonOther) || 0,
              color: "#29ca03",
            },
            {
              title: "Hydro",
              value: Number(carbonHydro) || 0,
              color: "#0066ff",
            },
            {
              title: "Solar",
              value: Number(carbonSolar) || 0,
              color: "#ffff00",
            },
            { title: "Wind", value: Number(carbonWind) || 0, color: "#00cc00" },
          ]}
          animate
          label={({ dataEntry }) =>
            dataEntry.value > 8
              ? `${dataEntry.title} - ${dataEntry.value}%`
              : ""
          }
          labelStyle={{
            ...defaultLabelStyle,
          }}
        />
      </div>
      {carbonTime && <p className="time">{`Timestamp: ${carbonTime}`}</p>}
    </div>
  );
};

export default Data;
