import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import "../styles/map.css";

function PlacesAutoComplete({ addToList, setFocus }) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 500
  });

  async function handleSelect(address) {
    console.log(typeof address)
    setValue(address, false);
    clearSuggestions();
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    addToList(results[0].place_id, results[0], lat, lng);
    setValue("");
  }

  return (
    <div className="places-container">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          style={{width: 400, height: 30, marginLeft: '120px', marginTop: "5px", marginBottom: "5px"}}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          className="combobox-input"
          placeholder="Search a Place"
          onFocus={()=> setFocus(true)}
          onBlur={() => setFocus(false)}
        />
        <ComboboxPopover className="popover">
          <ComboboxList className="slide-down">
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}

export default PlacesAutoComplete;
