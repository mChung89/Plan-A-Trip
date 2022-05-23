import { useMemo, useCallback, useState, useRef } from 'react'
import { GoogleMap } from '@react-google-maps/api'
import '../styles/map.css'
import MyMarker from './MyMarker';


function Map({ itinerary, isLoaded, loadError }) {
  const mapRef = useRef()
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  },[])
  const [zoom, setZoom] = useState(9)
  // const center = {lat: 40.705543976313464, lng: -74.01357140807622}

  // //Flatiron
  const center = useMemo(() => ({lat: 40.705543976313464, lng: -74.01357140807622}),[])
  if (loadError) return "Error loading maps"
  if (!isLoaded) return <div>Loading...</div>
  
  //Markers

  const renderedMarkers = itinerary?.map(itinerary => {
    return (
      itinerary.places.map(place => <MyMarker key={place._id} place={place}/>))
    })

  return (
      <GoogleMap zoom={zoom} center={center} onLoad={onMapLoad} mapContainerClassName='map-container'>
        {renderedMarkers}
      </GoogleMap>
  )
}

export default Map