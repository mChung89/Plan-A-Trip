import { useMemo, useCallback, useState, useRef } from 'react'
import { GoogleMap, useLoadScript } from '@react-google-maps/api'
import '../styles/map.css'
import MyMarker from './MyMarker';
import PlacesAutoComplete from './PlacesAutoComplete';

const libraries = ["places"]


function Map({ itinerary, addToItinerary }) {
  const mapRef = useRef()
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  },[])
  const [zoom, setZoom] = useState(9)
  // const center = {lat: 40.705543976313464, lng: -74.01357140807622}
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API,
    libraries
  });

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
        <div className='places-container'>
          <PlacesAutoComplete addToItinerary={addToItinerary} setZoom={setZoom} />
        </div>
      </GoogleMap>
  )
}

export default Map