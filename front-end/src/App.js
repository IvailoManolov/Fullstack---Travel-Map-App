import * as React from 'react';
import Map, {Marker} from 'react-map-gl';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import "./App.css"
import 'mapbox-gl/dist/mapbox-gl.css'

function App() {
  return (
    <div className='app'>
    <Map
      initialViewState={{
        longitude: 17,
        latitude: 46,
        zoom: 4
      }}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      style={{width: "100vw", height: "100vh"}}
      mapStyle="mapbox://styles/mapbox/streets-v9">

      <Marker longitude={1.8566} latitude={48.2946}  anchor="center">
        <FmdGoodIcon />
      </Marker>
    </Map>
    </div>
  );
}

export default App;
