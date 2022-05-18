import Button from '@mui/material/Button'

function ItineraryCard ({ place, itineraryId }) {

    function handleDelete (itineraryId, placeId) {
        fetch(`/itinerary/${itineraryId}/${placeId}`,{method: 'DELETE'})
        .then(res => res.json())
        .then(console.log)
    }

    return (
        <div key={place._id}>
            <h1>{place.name}</h1>
            <h2>{place.formatted_address}</h2>
            <ul>{place.opening_hours?.weekday_text.map(day => <li key={day}>{day}</li>)}</ul>
            <p>{place.website}</p>
            <img src={place?.photos?.[0]} alt={place.name}/>
            <Button onClick={() => handleDelete(itineraryId, place.place_id)}>Delete</Button>
        </div>
    )
}

export default ItineraryCard