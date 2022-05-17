import { useMemo, useEffect, useState, useRef } from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import '../styles/map.css'
import PlacesAutoComplete from './PlacesAutoComplete';

const libraries = ["places"]


function Map ({ setCurrentLocation }) {
  const [selected, setSelected] = useState(null)
  const [zoomIn, setZoomIn] = useState(9)
  const [center, setCenter] = useState({lat: 40.705543976313464, lng: -74.01357140807622})
  const { isLoaded } = useLoadScript({
    googleMapsApiKey : process.env.REACT_APP_GOOGLE_MAP_API,
    libraries
  });

  //Flatiron
  // const center = useMemo(() => ({lat: 40.705543976313464, lng: -74.01357140807622}),[])

  if(!isLoaded) return <div>Loading...</div>


  return (
    <>
    <GoogleMap zoom={zoomIn} center={center} mapContainerClassName='map-container'>
      {selected &&  <Marker position={selected} />}
      <div className='places-container'>
      <PlacesAutoComplete setCurrentLocation={setCurrentLocation} setSelected={setSelected} />
    </div>
    </GoogleMap>
    </>
  )
}

export default Map