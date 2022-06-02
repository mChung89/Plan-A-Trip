import Grid from "@mui/material/Grid";
import Map from "./Map";
import Itinerary from "./Itinerary";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import ItineraryHeadCard from "./ItineraryHeadCard";
import ItineraryCard from "./ItineraryCard";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import SearchCard from "./SearchCard";
import { getDetails } from "use-places-autocomplete";
import Modal from "@mui/material/Modal";
import SaveWithoutUser from './SaveWithoutUser/SaveWithoutUser'
import Snack from './Snack'
import Divider from '@mui/material/Divider'

function MainPage({
  tripSelector,
  setTripSelector,
  isLoaded,
  user,
  currentTrip,
  setTrip,
  itinerary,
  setItinerary,
  setUser,
  currentTripName,
  setCurrentTripName
}) {
  const [openSnack, setOpenSnack] = useState(false);
  const [open, setOpen] = useState(false);
  const [addedPlace, setAddedPlace] = useState("")
  const [center, setCenter] = useState({lat: 40.705543976313464, lng: -74.01357140807622})


  useEffect(() => {
    if (currentTrip) {
      fetch(`trip/${currentTrip}`)
        .then((res) => res.json())
        .then((data) => {
          //Centers map by average latLng of trip
          const count = []
          data[0].forEach(each => each.places.forEach(elem => count.push(elem)))
          if(count.length > 0) {
          const lat = data[0].map(each => {
            if(each.places.length > 0){
              return each.places.reduce((a,b) => a.lat + b.lat)/each.places.length
            }
          })
          const combLat = lat.filter(each => each)
          const lng = data[0].map(each => {
            if(each.places.length > 0){
              return each.places.reduce((a,b) => a.lng + b.lng)/each.places.length
            }
          })
          const combLng = lng.filter(each => each)
          setCenter({lat: combLat.reduce((a,b) => a+b)/combLat.length, lng: combLng.reduce((a,b) => a+b)/combLng.length })
        }
          // Sets state for trip places
          setItinerary(data[0]);
          setTrip(data[1]._id);
          setCurrentTripName(data[1].name)
        });
    }
  }, [currentTrip]);

  //handles the drag and drop features
  const onDragEnd = (res, itinerary) => {
    if (!res.destination) return;
    const { source, destination } = res;
    const findSource = itinerary.filter(
      (each) => each._id === source.droppableId
    );
    const copySource = { ...findSource };
    const findDestination = itinerary.filter(
      (each) => each._id === destination.droppableId
    );
    const [removed] = copySource[0].places.splice(source.index, 1);
    findDestination[0].places.splice(destination.index, 0, removed);

    if (source.droppableId === destination.droppableId) {
      fetch(`/dnd/oneDate`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: source.droppableId,
          reordered: findSource[0].places,
        }),
      })
        .then((res) => res.json())
        .then((data) =>
          setItinerary(
            itinerary.map((each) => (each._id === data._id ? data : each))
          )
        );
    } else {
      fetch(`dnd/twoDate`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstDate: {
            id: source.droppableId,
            reordered: findSource[0].places,
          },
          secondDate: {
            id: destination.droppableId,
            reordered: findDestination[0].places,
          },
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          const newItinerary = itinerary.map((each) =>
            each._id === data[0]._id ? data[0] : each
          );
          const secondMap = newItinerary.map((each) =>
            each._id === data[1]._id ? data[1] : each
          );
          setItinerary(secondMap);
        });
    }
  };

  //handles updates to the current trip
  async function addToItinerary(place, itineraryId) {
    fetch(`/itinerary/${itineraryId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(place),
    })
      .then((res) => res.json())
      .then((data) => {
        const findItinerary = itinerary.find(
          (each) => each._id === itineraryId
        );
        findItinerary.places = [...findItinerary.places, data];
        const newItinerary = itinerary.map((each) =>
          each._id === findItinerary._id ? findItinerary : each
        );
        setItinerary(newItinerary);
        notify(data)
        setCenter({lat: place.lat,lng: place.lng})
      });
  }
  //Opens snack notification
  function notify (data) {
    setAddedPlace(data.name)
    setOpenSnack(true)
  }

  //If place is not in DB, adds to DB
  async function addIfNotInDb(parameters, results, lat, lng, selectedDate) {
    const details = await getDetails(parameters);
    const photos = details?.photos?.map((photo) => photo.getUrl());
    const placeObj = {
      name: details.name,
      photos: photos,
      place_id: results.place_id,
      opening_hours: details.opening_hours,
      website: details.website,
      formatted_address: results.formatted_address,
      lat: lat,
      lng: lng,
    };
    fetch("/places", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(placeObj),
    })
      .then((res) => res.json())
      .then((data) => {
        addToItinerary(data, selectedDate);
      });
  }

  // Opens the login modal to have user sign in to save
  function handleSave() {
    setOpen(true);
  }

  function deleteFromItinerary(placeId, itineraryId) {
    // Filter out from state
    const newItinerary = itinerary.filter(
      (each) => each._id === itineraryId
    )[0];
    newItinerary.places = newItinerary.places.filter(
      (each) => each._id !== placeId
    );
    const updateItinerary = itinerary.map((each) =>
      each._id === newItinerary._id ? newItinerary : each
    );
    setItinerary(updateItinerary);
  }

  //Mapping Dates with Drag & Drop Context
  const mappedItineraryDates = itinerary?.map((date) => {
    return (
      <Grid container key={date._id}>
        <Grid item xs={12}>
          <Grid sx={{ position: "sticky", zIndex: 9 }} item xs={12}>
            <ItineraryHeadCard key={date._id} date={date} />
          </Grid>
          <Grid item xs={12}>
            <SearchCard
              date={date}
              isLoaded={isLoaded}
              addIfNotInDb={addIfNotInDb}
              addToItinerary={addToItinerary}
            />
          </Grid>
          <Droppable droppableId={date._id} key={date._id}>
            {(provided, snapshot) => {
              return (
                <Grid
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    minHeight: 1,
                    transition: "background-color 0.3s ease",
                    background: snapshot.isDraggingOver ? "lightblue" : null,
                  }}
                >
                  {date?.places?.map((place, index) => {
                    return (
                      <Grid item xs={12} key={place._id}>
                        <ItineraryCard
                          key={place._id}
                          index={index}
                          itineraryId={date._id}
                          deleteFromItinerary={deleteFromItinerary}
                          place={place}
                        />
                      </Grid>
                    );
                  })}
                  {provided.placeholder}
                </Grid>
              );
            }}
          </Droppable>
        </Grid>
      </Grid>
    );
  });

  return (
    <>
      <Snack addedPlace={addedPlace} openSnack={openSnack} setOpenSnack={setOpenSnack}/>
      <Grid container className="main-window">
        <Grid
          item
          md={5}
          px={3}
          sm={12}
          className="itinerary main-window-split"
        >
          <Itinerary
            notify={notify}
            setTripSelector={setTripSelector}
            setCurrentTripName={setCurrentTripName}
            handleSave={handleSave}
            setUser={setUser}
            tripSelector={tripSelector}
            setTrip={setTrip}
            user={user}
            itinerary={itinerary}
            tripId={currentTrip}
            addToItinerary={addToItinerary}
            setItinerary={setItinerary}
            isLoaded={isLoaded}
            currentTripName={currentTripName}
          />
          <DragDropContext onDragEnd={(res, date) => onDragEnd(res, itinerary)}>
            {mappedItineraryDates}
          </DragDropContext>
        </Grid>
        <Divider />
        <Grid className="main-window-split map" pl={4} item md={7} sm={12}>
          <Paper sx={{height: "93vh"}}>
            {/* <div className="map-container-hidden"></div> */}
            <Map
            center={center}
            isLoaded={isLoaded}
            itinerary={itinerary}
          />
          </Paper>
        </Grid>
      </Grid>
      <div>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
            <Paper>
              <SaveWithoutUser setTripSelector={setTripSelector} setItinerary={setItinerary} currentTripName={currentTripName} setUser={setUser} currentTrip={currentTrip} itinerary={itinerary}/>
            </Paper>
        </Modal>
      </div>
    </>
  );
}

export default MainPage;
