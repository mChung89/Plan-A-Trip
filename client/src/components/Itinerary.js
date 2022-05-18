import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { useRef } from 'react'
import ItineraryCard from './ItineraryCard'
function Itinerary ({ currentLocation, itinerary, setItinerary }) {
    const { itineraryId, placesData } = itinerary
    
    function addToItinerary () {
        const token = localStorage.getItem('user')
        fetch(`/itinerary/${itineraryId}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(currentLocation)
        })
        .then(res => res.json())
        .then(data => {
            setItinerary([...placesData, data])
    })}

    console.log(itinerary)

    const renderItinerary = placesData?.map(
        place => <ItineraryCard 
        key={place._id} 
        place={place} 
        itineraryId={itineraryId}
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