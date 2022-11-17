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
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';

const pinAddSuccess = () => {
  toast.success("Added pin!")
}

const pinAddFailure = () => {
  toast.error("Couldn't add pin. Please fill all data")
}

function App() {

  const myStorage = window.localStorage

  const [pins,setPins] = useState([])
  const[newPlace,setNewPlace] = useState(null)

  const[title,setTitle] = useState(null)
  const[descr,setDescr] = useState(null)
  const[rating,setRating] = useState(1)

  const[currentUser,setCurrentUser] = useState(null)

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
      setRating(1)
      setDescr(null)
      setTitle(null)

    } catch(err){
      console.log(err)
      pinAddFailure()
    }
  }

  const[showRegister,setShowRegister] = useState(false)
  const[showLogin,setShowLogin] = useState(false)

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
      <ToastContainer
      position='top-left'
      theme='dark'
       />
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
                    <option value= "1">1 </option>
                    <option value= "2">2 </option>
                    <option value= "3">3 </option>
                    <option value= "4">4 </option>
                    <option value= "5">5 </option>
                  </select>
                  <button className='submitButton' type = "submit">Add Pin</button>
                </form>
              </div>

        </Popup>
      }
      </Map>

      <div className='footer'>
            <div className='footer_down'>
                {currentUser ? (<button className='button logout'>Log out</button>
                ) : 
                (<div className='buttons'>
                    <button className='button login' onClick={() => {setShowLogin(true)}}>Login</button>
                    <button className='button register' onClick={() => setShowRegister(true)}>Register</button>
                </div>
                )}
            </div>
        </div>

        {showRegister && <Register setShowRegister={setShowRegister}/>}
        {showLogin && <Login setShowLogin={setShowLogin} myStorage={myStorage} setCurrentUser = {setCurrentUser}/>}

    </div>
  );
}

export default App;
