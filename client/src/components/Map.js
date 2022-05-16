import { useMemo, useEffect, useState, useRef } from 'react'
import '../styles/map.css'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'


function Map () {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey : process.env.REACT_APP_GOOGLE_MAP_API
  });

  //Flatiron
  const center = {lat: 40.705543976313464, lng: -74.01357140807622}

  if(!isLoaded) return <div>Loading...</div>


  return ( 
    <GoogleMap zoom={8} center={center} mapContainerClassName='map-container'>
      <Marker position={center} />
    </GoogleMap>)
}

export default Map