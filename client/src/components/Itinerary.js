import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { useRef } from 'react'
import ItineraryCard from './ItineraryCard'
function Itinerary ({ currentLocation , itineraryId, itinerary, setItinerary }) {


    function addToItinerary () {
        const mappedIds = itinerary?.map(place => place.place_id)
        fetch('/itinerary/6283e8c5bfb9da57d3e8d9f3',{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({newPlaces: [...mappedIds, currentLocation.place_id]})
        })
        .then(res => res.json())
        .then(data => setItinerary(data))
    }

    console.log(itinerary)

    
    const renderItinerary = itinerary?.map(place => {
        // console.log(place)
        return (
            <ItineraryCard key={place.place_id} place={place} itineraryId={itineraryId}/>
        )
    })


    return (
        <Stack>
            {/* <Button onClick={handleClick}>Give me data</Button> */}
            <Button onClick={addToItinerary}>Click to add to Itinerary</Button>
            {itinerary ? renderItinerary : null}
        </Stack>
    )
}
 
export default Itinerary