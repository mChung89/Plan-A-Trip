import { Marker, InfoWindow } from "@react-google-maps/api";
import { useState } from "react";

function MyMarker(place) {
  const [selected, setSelected] = useState(null);

  return (
    <Marker
      position={{ lat: place.place.lat, lng: place.place.lng }}
      onClick={() => setSelected(place.place)}
    >
      {selected ? (
        <InfoWindow onCloseClick={() => setSelected(null)}>
          <div>
            <h2>{place.place.name}</h2>
            <p>{place.place.formatted_address}</p>
            <p>{place.place.website}</p>
          </div>
        </InfoWindow>
      ) : null}
    </Marker>
  );
}

export default MyMarker;
