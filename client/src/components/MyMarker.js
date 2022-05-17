import { Marker, InfoWindow } from "@react-google-maps/api";
import { useState } from "react";

function MyMarker(marker) {
  const [selected, setSelected] = useState(null);


  return (
    <Marker
      position={{ lat: marker.marker.lat, lng: marker.marker.lng }}
      onClick={() => setSelected(marker)}
    >
      {selected ? (
        <InfoWindow onCloseClick={() => setSelected(null)}>
          <div>
            <h2>Bear Spotted?</h2>
          </div>
        </InfoWindow>
      ) : null}
    </Marker>
  );
}

export default MyMarker;
