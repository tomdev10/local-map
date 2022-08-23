import * as React from 'react'
import { useMqttState, useSubscription } from 'mqtt-react-hooks';

const DataContext = React.createContext()


function DataProvider({children}) {
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


    const { connectionStatus } = useMqttState(); 

    const { message } = useSubscription([
        'tomdev/carbon/intensity',
        'tomdev/carbon/timestamp',
        'tomdev/carbon/colour',
        'tomdev/carbon/biomass',
        'tomdev/carbon/gas',
        'tomdev/carbon/coal',
        'tomdev/carbon/imports',
        'tomdev/carbon/nuclear',
        'tomdev/carbon/other',
        'tomdev/carbon/hydro',
        'tomdev/carbon/solar',
        'tomdev/carbon/wind',
        'tomdev/tide/bournemouth/E71939',
        'tomdev/tide/bournemouth/E71939/latest',
        'tomdev/tide/bournemouth/E71939/timestamp'
    ]);

    React.useEffect(()=> {
        if (message) {
            const {message:msg,  topic} = message;

            console.log('topic: ', topic, ' msg: ', msg);
            
            const dtOptions = {
                year: 'numeric', month: 'numeric', day: 'numeric',
                hour: 'numeric', minute: 'numeric', second: 'numeric',
                hour12: false,
            };
    
            const timeFormatter = new Intl.DateTimeFormat('en-GB', dtOptions);
            if (msg && topic) {
                if (topic.includes('carbon/intensity')) setCarbonIntensity(msg);
                if (topic.includes('carbon/timestamp')) setCarbonTime(timeFormatter.format(msg));
                if (topic.includes('carbon/colour')) setCarbonColour(msg);
                if (topic.includes('carbon/biomass')) setCarbonBiomass(msg);
                if (topic.includes('carbon/gas')) setCarbonGas(msg);
                if (topic.includes('carbon/coal')) setCarbonCoal(msg);
                if (topic.includes('carbon/imports')) setCarbonImports(msg);
                if (topic.includes('carbon/nuclear')) setCarbonNuclear(msg);
                if (topic.includes('carbon/other')) setCarbonOther(msg);
                if (topic.includes('carbon/hydro')) setCarbonHydro(msg);
                if (topic.includes('carbon/solar')) setCarbonSolar(msg);
                if (topic.includes('carbon/wind')) setCarbonWind(msg);
                if (topic.includes('tide/bournemouth/E71939/latest')) setTideLatest(msg);
                if (topic.includes('tide/bournemouth/E71939/timestamp')) setTideTime(timeFormatter.format(msg));
                if (topic === 'tomdev/tide/bournemouth/E71939') setTideMarker(JSON.parse(msg));  
            }
        }
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
        tideTime: tideTime || null
    }

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

function useData() {
  const context = React.useContext(DataContext)
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider')
  }
  return context
}

export {DataProvider, useData}