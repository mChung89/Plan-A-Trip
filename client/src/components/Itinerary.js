
function Itinerary ({ currentLocation , itinerary, setItinerary }){

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
        <>
        <button onClick={handleClick}>Give me data</button>
        {itinerary ? renderItinerary : null}
        </>
    )
}
 
export default Itinerary