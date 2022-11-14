import * as React from 'react';
import Map, {Marker} from 'react-map-gl';
import {Popup} from 'react-map-gl';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import {useState} from "react"
import StarIcon from '@mui/icons-material/Star';
import axios from "axios"
import {format} from "timeago.js"

import "./App.css"
import 'mapbox-gl/dist/mapbox-gl.css'

function App() {

  const [pins,setPins] = useState([])

  const [viewPort,setViewPort] = useState({
    longitude: -122.4,
    latitude: 37.8,
    zoom: 14
  })

  const[currentPlaceId, setCurrentPlaceId] = useState(null)


  React.useEffect(() => {
    const getPins = async () => {
      try{
        const responce = await axios.get("/pins")
        setPins(responce.data)

      }catch(err){
        console.log(err)
      }
    }

    getPins()
  },[])


  const handleMarkerClicked = (id) => {
    setCurrentPlaceId(id)
    console.log("Added a marker")
  }

  return (
    <div className='app'>
    <Map
      container ={'map'}
      projection={'globe'}
      initialViewState={{viewPort}}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      style={{width: "100vw", height: "100vh"}}
      mapStyle="mapbox://styles/ivomoreras/claf55gfo005114qwe1aed26r">
      {pins.map(p => (
        <>
          <Marker longitude={p.lon} latitude={p.lat}  anchor="center">
            <FmdGoodIcon 
            className = 'icon'
            onClick = {() => handleMarkerClicked(p._id)}
            style ={{fontSize : viewPort.zoom * 2, color:"slateblue"}}
            />
          </Marker>

          { p._id === currentPlaceId && 
          (
            <Popup longitude={p.lon} latitude={p.lat}
            closeOnClick = {false}
            closeOnMove = {false}
            onClose={() => setCurrentPlaceId(null)}
             anchor="left">
            <div className='card'>
              <label>Place</label>
                <h4 className='place'>{p.title}</h4>
              <label>Review</label>
              <p className='descr'>{p.descr}</p>
              <label>Rating</label>
              <div className='stars'>
                <StarIcon className='star'/>
                <StarIcon className='star'/>
                <StarIcon className='star'/>
                <StarIcon className='star'/>
                <StarIcon className='star'/>
              </div>
              <label>Information</label>
              <div className='info'>
              <span className='username'>Created by <b>{p.userName}</b></span>
              <span className='date'>{format(p.createdAt)}</span>
              </div>
            </div>
            </Popup>
          )
          }
      </>
      ))}
      </Map>
    </div>
  );
}

export default App;
