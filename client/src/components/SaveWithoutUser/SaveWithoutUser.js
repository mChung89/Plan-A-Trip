import { useState } from "react";
import LoginSave from "./LoginSave";
import CreateSave from "./CreateSave";
function SaveWithoutUser ({ itinerary, setItinerary, currentTrip, setUser, currentTripName, setTripSelector }){
  const [errors, setErrors] = useState(null);
  const [toggleLogin, setToggle] = useState(true);

  function addNewTrip (user) {
    console.log(user)
    fetch(`trip/addusertotrip/${user}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({itinerary: itinerary, currentTrip, currentTripName}),
    })
      .then((res) => res.json())
      .then((data) => {
        setItinerary(prev => [...prev])
      });
  }

  return (
    <>
      {toggleLogin ? <LoginSave setUser={setUser} setTripSelector={setTripSelector} addNewTrip={addNewTrip} setToggle={setToggle} setErrors={setErrors} errors={errors}/> : <CreateSave setUser={setUser} setTripSelector={setTripSelector} addNewTrip={addNewTrip} setToggle={setToggle} setErrors={setErrors} errors={errors}/>}
    </>
  )
}
 
export default SaveWithoutUser