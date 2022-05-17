import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
function Itinerary ({ currentLocation , itinerary, setItinerary }) {

    function addToItinerary () {
        const mappedIds = itinerary.map(place => place.place_id)
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

    const renderItinerary = itinerary?.map(place => {
        return (
            <div key={place.id}>
                <h1>{place.name}</h1>
                <h2>{place.formatted_address}</h2>
                <ul>{place.opening_hours.weekday_text.map(day => <li key={day}>{day}</li>)}</ul>
                <p>{place.website}</p>
                <img src={place.photos[0]} alt={place.name}/>
            </div>
        )
    })

    function handleClick () {
        fetch('/itinerary/6283e8c5bfb9da57d3e8d9f3')
        .then(res => res.json())
        .then(data => setItinerary(data))
    }


    return (
        <Stack>
            <Button onClick={handleClick}>Give me data</Button>
            <Button onClick={addToItinerary}>Click to add to Itinerary</Button>
            {itinerary ? renderItinerary : null}
        </Stack>
    )
}
 
export default Itinerary