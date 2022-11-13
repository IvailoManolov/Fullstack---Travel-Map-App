import * as React from 'react';
import Map, {Marker} from 'react-map-gl';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import {useState} from "react"
import "./App.css"
import 'mapbox-gl/dist/mapbox-gl.css'

function App() {

  const [viewPort,setViewPort] = useState({
    longitude: -122.4,
    latitude: 37.8,
    zoom: 14
  })

  return (
    <div className='app'>
    <Map
      container ={'map'}
      projection={'globe'}
      initialViewState={{viewPort}}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      style={{width: "100vw", height: "100vh"}}
      mapStyle="mapbox://styles/ivomoreras/claf55gfo005114qwe1aed26r">

      <Marker longitude={2.3566} latitude={48.7946}  anchor="center">
        <FmdGoodIcon style ={{fontSize : viewPort.zoom * 2, color:"slateblue"}}/>
      </Marker>
    </Map>
    </div>
  );
}

export default App;
