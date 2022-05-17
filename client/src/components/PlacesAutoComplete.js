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


function PlacesAutoComplete ({ setSelected, setCurrentLocation }) {
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
        setSelected({ lat, lng })
        map.panTo({ lat, lng })
        addToList(results[0].place_id, results[0], lat, lng)
    }
    
    async function addToList (place_id, results, lat, lng) {
        const parameters = {
            placeId: place_id,
            fields: ["name", "website", "opening_hours", "photo"]
        }

        const details = await getDetails(parameters)
        const photos = details.photos.map(photo => photo.getUrl())
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
            .then(setCurrentLocation)
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