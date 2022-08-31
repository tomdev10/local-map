import * as React from "react";
import { useMqttState, useSubscription } from "mqtt-react-hooks";

const DataContext = React.createContext();

function DataProvider({ children }) {
  const [carbonIntensity, setCarbonIntensity] = React.useState();
  const [carbonTime, setCarbonTime] = React.useState();
  const [carbonColour, setCarbonColour] = React.useState();
  const [carbonBiomass, setCarbonBiomass] = React.useState();
  const [carbonGas, setCarbonGas] = React.useState();
  const [carbonCoal, setCarbonCoal] = React.useState();
  const [carbonImports, setCarbonImports] = React.useState();
  const [carbonNuclear, setCarbonNuclear] = React.useState();
  const [carbonOther, setCarbonOther] = React.useState();
  const [carbonHydro, setCarbonHydro] = React.useState();
  const [carbonSolar, setCarbonSolar] = React.useState();
  const [carbonWind, setCarbonWind] = React.useState();
  const [tideMarker, setTideMarker] = React.useState();
  const [tideLatest, setTideLatest] = React.useState();
  const [tideTime, setTideTime] = React.useState();
  const [planes, setPlanes] = React.useState();
  const [planesTime, setPlanesTime] = React.useState();
  const [rainfallStations, setRainfallStations] = React.useState();
  const [rainfallData, setRainfallData] = React.useState();
  const [weather, setWeather] = React.useState();
  const [parkstoneTrain, setParkstoneTrain] = React.useState();
  const [branksomeTrain, setBranksomeTrain] = React.useState();
  const [pooleTrain, setPooleTrain] = React.useState();
  const [bournemouthTrain, setBournemouthTrain] = React.useState();
  const [hamworthyTrain, setHamworthyTrain] = React.useState();
  const [pokesdownTrain, setPokesdownTrain] = React.useState();
  const [christchurchTrain, setChristchurchTrain] = React.useState();
  const [ships, setShips] = React.useState();
  const [traffic, setTraffic] = React.useState();
  const [waterQuality, setWaterQuality] = React.useState();

  const { connectionStatus } = useMqttState();

  const { message } = useSubscription([
    "tomdev/carbon/intensity",
    "tomdev/carbon/timestamp",
    "tomdev/carbon/colour",
    "tomdev/carbon/biomass",
    "tomdev/carbon/gas",
    "tomdev/carbon/coal",
    "tomdev/carbon/imports",
    "tomdev/carbon/nuclear",
    "tomdev/carbon/other",
    "tomdev/carbon/hydro",
    "tomdev/carbon/solar",
    "tomdev/carbon/wind",
    "tomdev/tide/bournemouth/E71939",
    "tomdev/tide/bournemouth/E71939/latest",
    "tomdev/tide/bournemouth/E71939/timestamp",
    "tomdev/planes/states",
    "tomdev/planes/timestamp",
    "tomdev/rainfall/stations",
    "tomdev/rainfall/E14440/value",
    "tomdev/rainfall/E14430/value",
    "tomdev/rainfall/43206/value",
    "tomdev/rainfall/43205/value",
    "tomdev/rainfall/44201/value",
    "tomdev/rainfall/E14440/timestamp",
    "tomdev/rainfall/E14430/timestamp",
    "tomdev/rainfall/43206/timestamp",
    "tomdev/rainfall/43205/timestamp",
    "tomdev/rainfall/44201/timestamp",
    "tomdev/weather/bournemouth",
    "tomdev/weather/poole",
    `tomdev/trains/pks/train`,
    `tomdev/trains/bsm/train`,
    `tomdev/trains/poo/train`,
    `tomdev/trains/ham/train`,
    `tomdev/trains/chr/train`,
    `tomdev/trains/pok/train`,
    `tomdev/trains/bmh/train`,
    'tomdev/ships',
    'tomdev/traffic',
    'tomdev/water'
  ]);

  React.useEffect(() => {
    if (message) {
      const { message: msg, topic } = message;

      console.log("topic: ", topic, " msg: ", msg);

      const dtOptions = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
      };

      const timeFormatter = new Intl.DateTimeFormat("en-GB", dtOptions);

      const addRainfall = (newVal, id, property) => {
        const oldData = rainfallData;
        const oldObject = oldData ? oldData[id] : {};
        const toInsert = { ...oldObject, [property]: newVal };
        setRainfallData({ ...oldData, [id]: toInsert });
      };

      const addWeather = (newVal, id) => {
        const oldData = weather;
        const newTime = timeFormatter.format(newVal.timestamp);
        const toInsert = { ...newVal, timestamp: newTime };
        setWeather({ ...oldData, [id]: toInsert });
      };

      if (msg && topic) {
        if (topic.includes("carbon/intensity")) setCarbonIntensity(msg);
        if (topic.includes("carbon/timestamp"))
          setCarbonTime(timeFormatter.format(msg));
        if (topic.includes("carbon/colour")) setCarbonColour(msg);
        if (topic.includes("carbon/biomass")) setCarbonBiomass(msg);
        if (topic.includes("carbon/gas")) setCarbonGas(msg);
        if (topic.includes("carbon/coal")) setCarbonCoal(msg);
        if (topic.includes("carbon/imports")) setCarbonImports(msg);
        if (topic.includes("carbon/nuclear")) setCarbonNuclear(msg);
        if (topic.includes("carbon/other")) setCarbonOther(msg);
        if (topic.includes("carbon/hydro")) setCarbonHydro(msg);
        if (topic.includes("carbon/solar")) setCarbonSolar(msg);
        if (topic.includes("carbon/wind")) setCarbonWind(msg);
        if (topic.includes("tide/bournemouth/E71939/latest"))
          setTideLatest(msg);
        if (topic.includes("tide/bournemouth/E71939/timestamp"))
          setTideTime(timeFormatter.format(msg));
        if (topic === "tomdev/tide/bournemouth/E71939")
          setTideMarker(JSON.parse(msg));
        if (topic.includes("planes/states")) setPlanes(JSON.parse(msg));
        if (topic.includes("planes/timestamp"))
          setPlanesTime(timeFormatter.format(msg));
        if (topic.includes("rainfall/stations"))
          setRainfallStations(JSON.parse(msg));
        if (topic.includes("tomdev/rainfall/E14440/value"))
          addRainfall(msg, "E14440", "value");
        if (topic.includes("tomdev/rainfall/E14430/value"))
          addRainfall(msg, "E14430", "value");
        if (topic.includes("tomdev/rainfall/43206/value"))
          addRainfall(msg, "43206", "value");
        if (topic.includes("tomdev/rainfall/43205/value"))
          addRainfall(msg, "43205", "value");
        if (topic.includes("tomdev/rainfall/44201/value"))
          addRainfall(msg, "44201", "value");
        if (topic.includes("tomdev/rainfall/E14440/timestamp"))
          addRainfall(timeFormatter.format(msg), "E14440", "timestamp");
        if (topic.includes("tomdev/rainfall/E14430/timestamp"))
          addRainfall(timeFormatter.format(msg), "E14430", "timestamp");
        if (topic.includes("tomdev/rainfall/43206/timestamp"))
          addRainfall(timeFormatter.format(msg), "43206", "timestamp");
        if (topic.includes("tomdev/rainfall/43205/timestamp"))
          addRainfall(timeFormatter.format(msg), "43205", "timestamp");
        if (topic.includes("tomdev/rainfall/44201/timestamp"))
          addRainfall(timeFormatter.format(msg), "44201", "timestamp");
        if (topic.includes("weather/bournemouth"))
          addWeather(JSON.parse(msg), "bournemouth");
        if (topic.includes("weather/poole"))
          addWeather(JSON.parse(msg), "poole");
        if (topic.includes("trains/poo/train")) setPooleTrain(msg === "true");
        if (topic.includes("trains/pks/train"))
          setParkstoneTrain(msg === "true");
        if (topic.includes("trains/bsm/train"))
          setBranksomeTrain(msg === "true");
        if (topic.includes("trains/bmh/train"))
          setBournemouthTrain(msg === "true");
        if (topic.includes("trains/pok/train"))
          setPokesdownTrain(msg === "true");
        if (topic.includes("trains/chr/train"))
          setChristchurchTrain(msg === "true");
        if (topic.includes("trains/chr/train"))
          setHamworthyTrain(msg === "true");
        if (topic.includes("ships"))
          setShips(JSON.parse(msg));
        if (topic.includes("traffic"))
          setTraffic(JSON.parse(msg));
        if (topic.includes("water"))
          setWaterQuality(JSON.parse(msg));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  const value = {
    connectionStatus,
    carbonIntensity: carbonIntensity || null,
    carbonTime: carbonTime || null,
    carbonColour: carbonColour || null,
    carbonBiomass: carbonBiomass || null,
    carbonGas: carbonGas || null,
    carbonCoal: carbonCoal || null,
    carbonImports: carbonImports || null,
    carbonNuclear: carbonNuclear || null,
    carbonOther: carbonOther || null,
    carbonHydro: carbonHydro || null,
    carbonSolar: carbonSolar || null,
    carbonWind: carbonWind || null,
    tideMarker: tideMarker || null,
    tideLatest: tideLatest || null,
    tideTime: tideTime || null,
    planes: planes || null,
    planesTime: planesTime || null,
    rainfallStations: rainfallStations || null,
    rainfallData: rainfallData || null,
    weather: weather || null,
    parkstoneTrain: parkstoneTrain || null,
    pooleTrain: pooleTrain || null,
    branksomeTrain: branksomeTrain || null,
    bournemouthTrain: bournemouthTrain || null,
    hamworthyTrain: hamworthyTrain || null,
    christchurchTrain: christchurchTrain || null,
    pokesdownTrain: pokesdownTrain || null,
    ships: ships || null, 
    traffic: traffic || null,
    waterQuality: waterQuality || null
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

function useData() {
  const context = React.useContext(DataContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
}

export { DataProvider, useData };
