import { useMemo, useEffect, useState, useRef } from 'react'
import { GoogleMap, useLoadScript } from '@react-google-maps/api'
import '../styles/map.css'
import MyMarker from './MyMarker';
import PlacesAutoComplete from './PlacesAutoComplete';

const libraries = ["places"]


function Map({ setCurrentLocation, itinerary, addToItinerary }) {
  const [zoom, setZoom] = useState(9)
  const [center, setCenter] = useState({ lat: 40.705543976313464, lng: -74.01357140807622 })
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API,
    libraries
  });

  // //Flatiron
  // // const center = useMemo(() => ({lat: 40.705543976313464, lng: -74.01357140807622}),[])

  if (!isLoaded) return <div>Loading...</div>
  
  //Markers
  const renderedMarkers = itinerary?.map(place => {
    return (
      <MyMarker
        key={place._id}
        place={place} />)
    })

  return (
      <GoogleMap zoom={zoom} center={center} mapContainerClassName='map-container'>
        {renderedMarkers}
        <div className='places-container'>
          <PlacesAutoComplete addToItinerary={addToItinerary} setCurrentLocation={setCurrentLocation} setZoom={setZoom} />
        </div>
      </GoogleMap>
  )
}

export default Map