import { useMemo, useEffect, useState, useRef } from 'react'
import { GoogleMap, useLoadScript } from '@react-google-maps/api'
import '../styles/map.css'
import MyMarker from './MyMarker';
import PlacesAutoComplete from './PlacesAutoComplete';

const libraries = ["places"]


function Map ({ setCurrentLocation }) {
  const [zoom, setZoom] = useState(9)
  const [markers, setMarkers] = useState([])
  const [center, setCenter] = useState({lat: 40.705543976313464, lng: -74.01357140807622})
  const { isLoaded } = useLoadScript({
    googleMapsApiKey : process.env.REACT_APP_GOOGLE_MAP_API,
    libraries
  });

  //Flatiron
  // const center = useMemo(() => ({lat: 40.705543976313464, lng: -74.01357140807622}),[])

  if(!isLoaded) return <div>Loading...</div>

  //Markers
  const renderedMarkers = markers.map(marker => {
    return (
    <MyMarker 
      key={marker.time.toISOString()} 
      marker={marker}/>)
  })



  return (
    <>
    <GoogleMap zoom={zoom} center={center} mapContainerClassName='map-container'>
      {renderedMarkers}
      <div className='places-container'>
      <PlacesAutoComplete setMarkers={setMarkers} setCurrentLocation={setCurrentLocation} setZoom={setZoom} />
    </div>
    </GoogleMap>
    </>
  )
}

export default Map