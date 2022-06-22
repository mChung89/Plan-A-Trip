import { useCallback, useRef } from 'react'
import { GoogleMap } from '@react-google-maps/api'
import '../styles/map.css'
import MyMarker from './MyMarker';

function Map({ itinerary, isLoaded, center}) {
  const mapRef = useRef()
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  },[])

  // //Flatiron
  if (!isLoaded) return <div>Loading...</div>
  
  //Markers

  const renderedMarkers = itinerary?.map(itinerary => {
    return (
      itinerary?.places?.map(place => <MyMarker key={place._id} place={place}/>))
    })

  return (
      <GoogleMap zoom={7} center={center} onLoad={onMapLoad} mapContainerClassName='map-container'>
        {renderedMarkers}
      </GoogleMap>
  )
}

export default Map