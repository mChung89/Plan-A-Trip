import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'
import ItineraryCard from './ItineraryCard'
function Itinerary ({ currentLocation, itinerary, setItinerary }) {
    const [itineraryId, setItineraryId] = useState(null)

    useEffect(() => {
        fetch('/itinerary/6284873f4d86467e715676c2')
        .then(res => res.json())
        .then(data => {
            setItinerary(data.placesData)
            setItineraryId(data.itineraryId)
        })
      }, [])
    
    function addToItinerary () {
        // const token = localStorage.getItem('user')
        fetch(`/itinerary/${itineraryId}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(currentLocation)
        })
        .then(res => res.json())
        .then(data => {
            setItinerary([...itinerary, data])
    })}

    function deleteFromItinerary (placeId) {
        setItinerary(itinerary.filter(place => place.place_id !== placeId))
    }


    const renderItinerary = itinerary?.map(
        place => <ItineraryCard 
        key={place._id} 
        place={place} 
        itineraryId={itineraryId}
        deleteFromItinerary={deleteFromItinerary}
        />)
  
    return (
        <Stack>
            {/* <Button onClick={handleClick}>Give me data</Button> */}
            <Button onClick={addToItinerary}>Click to add to Itinerary</Button>
            {renderItinerary}
        </Stack>
    )
}
 
export default Itinerary