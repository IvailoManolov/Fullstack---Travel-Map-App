import * as React from 'react';
import Map, {Marker} from 'react-map-gl';
import {Popup} from 'react-map-gl';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import {useState} from "react"
import StarIcon from '@mui/icons-material/Star';
import axios from "axios"
import {format} from "timeago.js"
import  {NavigationControl} from 'react-map-gl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./App.css"
import 'mapbox-gl/dist/mapbox-gl.css'
import Footer from './Components/Footer';

const pinAddSuccess = () => {
  toast.success("Added pin!")
}

const pinAddFailure = () => {
  toast.error("Couldn't add pin")
}

function App() {

  const [pins,setPins] = useState([])
  
  const currentUser = 'darkWeb'

  const[newPlace,setNewPlace] = useState(null)

  const[title,setTitle] = useState(null)
  const[descr,setDescr] = useState(null)
  const[rating,setRating] = useState(0)

  const[lookTo,setLookTo] = useState(false)

  const [viewPort,setViewPort] = useState({
    longitude: 12.4,
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

  const handleMarkerClicked = (id,lat,lon) => {
    setCurrentPlaceId(id)
  }

  const handleAddClick = (e) => {
    let lat = e.lngLat.lat
    let long = e.lngLat.lng
    setNewPlace({
      lat : lat,
      lng : long,
    })
  }

  const handlePinSubmit = async (e) => {
    e.preventDefault()

    const newPin = {
      userName : currentUser,
      title : title,
      descr : descr,
      rating : rating,
      lat : newPlace.lat,
      lon : newPlace.lng
    }

    try {
      const responce = await axios.post("/pins",newPin)
      setPins([...pins,responce.data])
      setNewPlace(null)
      pinAddSuccess()
    } catch(err){
      console.log(err)
      pinAddFailure()
    }
  }

  return (
    <div className='app'>
    <Map 
      container ={'map'}
      projection={'globe'}
      initialViewState={{viewPort}}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      style={{width: "100vw", height: "100vh"}}
      mapStyle="mapbox://styles/ivomoreras/claf55gfo005114qwe1aed26r"
      onDblClick = {handleAddClick}
      >
        <NavigationControl />
      {pins.map(p => (
        <>
          <Marker longitude={p.lon} latitude={p.lat}
            anchor="center">
            <FmdGoodIcon 
            className = 'icon'
            onClick = {() => handleMarkerClicked(p._id,p.lat,p.lon)}
            style ={{fontSize : viewPort.zoom * 2, color: p.userName === currentUser ? "tomato" : "slateblue"}}
            />
          </Marker>

          {p._id === currentPlaceId && 
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
                {Array(p.rating).fill(<StarIcon className='star'/>)}
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
      {newPlace && 
      <Popup longitude={newPlace.lng}
            latitude={newPlace.lat}
            closeOnClick = {false}
            closeOnMove = {false}
            onClose={() => setNewPlace(null)}
             anchor="left">

              <div>
                <form onSubmit={handlePinSubmit}> 
                  <label>Title</label>
                  <input placeholder='Enter a title...'
                  onChange={(e) => setTitle(e.target.value)}
                  />
                  <label>Review</label>
                  <textarea placeholder='Say something about this place...'
                  onChange={(e) => setDescr(e.target.value)}
                   />
                  <label>Rating</label>
                  <select onChange={(e) => setRating(e.target.value)}>
                    <option value="1">1 </option>
                    <option value="2">2 </option>
                    <option value="3">3 </option>
                    <option value="4">4 </option>
                    <option value="5">5 </option>
                  </select>
                  <button className='submitButton' type = "submit">Add Pin</button>
                </form>
              </div>

        </Popup>
      }
      </Map>

      <Footer/>

      <ToastContainer
      position='top-left'
      theme='dark'
       />

    </div>
  );
}

export default App;
