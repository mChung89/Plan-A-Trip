import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
    getDetails
  } from 'use-places-autocomplete'
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption
} from '@reach/combobox'
import '@reach/combobox/styles.css'
import { useGoogleMap } from '@react-google-maps/api'


function PlacesAutoComplete ({ addToItinerary , setZoom }) {
    const map = useGoogleMap()
    const { 
        ready, 
        value, 
        setValue, 
        suggestions: { status, data }, 
        clearSuggestions } = usePlacesAutocomplete({
            debounce: 500,
            requestOptions: {
                location: {lat: () => 41.902, lng: () => 12.496},
                radius: 20000 * 1000
        } 
            });
    
    async function handleSelect (address) {
        setValue(address, false);
        clearSuggestions();

        const results = await getGeocode({ address })
        const { lat, lng } = await getLatLng(results[0])
        setZoom(15)
        map.panTo({ lat, lng })
        addToList(results[0].place_id, results[0], lat, lng)
    }
    
    async function addToList (place_id, results, lat, lng) {
        fetch(`/places/${place_id}`)
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    console.log("I'm in the database", data)
                    addToItinerary(data)
                })
            } else {
                const parameters = {
                    placeId: place_id,
                    fields: ["name", "website", "opening_hours", "photo"]
                };
                addIfNotInDb(parameters, results, lat, lng)
        }})
    }

    async function addIfNotInDb (parameters, results, lat, lng) {
        const details = await getDetails(parameters)
        const photos = details?.photos?.map(photo => photo.getUrl())
        const placeObj = {
            name: details.name,
            photos: photos,
            place_id: results.place_id,
            opening_hours: details.opening_hours,
            website: details.website,
            formatted_address: results.formatted_address,
            lat: lat,
            lng: lng
        }
        fetch('/places', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(placeObj)})
            .then(res => res.json())
            .then(data => {
                console.log("Adding this to data", data)
                addToItinerary(data);
                setValue("")
            })
    }
    
    return (
        <Combobox onSelect={handleSelect}>
            <ComboboxInput value={value} onChange={e => setValue(e.target.value)} disabled={!ready} className='combobox-input' placeholder="Search a Place"/>
            <ComboboxPopover>
                <ComboboxList>
                    {status === "OK" && data.map(({place_id, description}) => <ComboboxOption key={place_id} value={description}/>)}
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
    )
}

export default PlacesAutoComplete