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

function MainPage({
  isLoaded,
  user,
  currentTrip,
  setTrip,
  itinerary,
  setItinerary,
  setUser,
  tripName,
  setTripName
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (currentTrip) {
      fetch(`trip/${currentTrip}`)
        .then((res) => res.json())
        .then((data) => {
          setItinerary(data[0]);
          setTrip(data[1]);
        });
    }
  }, [currentTrip]);

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
      });
  }

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
        console.log("Adding this to data", data);
        addToItinerary(data, selectedDate);
      });
  }

  function handleSave() {
    setOpen(true);
    // fetch(`/trip/${currentTrip}`, {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(itinerary),
    // })
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));
  }

  function deleteFromItinerary(placeId, itineraryId) {
    // Filter out from state
    const newItinerary = itinerary.filter(
      (each) => each._id === itineraryId
    )[0];
    newItinerary.places = newItinerary.places.filter(
      (each) => each._id !== placeId
    );
    console.log(newItinerary);
    const updateItinerary = itinerary.map((each) =>
      each._id === newItinerary._id ? newItinerary : each
    );
    setItinerary(updateItinerary);
  }

  const mappedItineraryDates = itinerary?.map((date) => {
    return (
      <Grid container key={date._id}>
        <Grid item xs={12}>
          <Grid sx={{ position: "sticky", top: "0vh", zIndex: 9 }} item xs={12}>
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
      <Grid container className="main-window">
        <Grid
          item
          md={5}
          px={3}
          sm={12}
          className="itinerary main-window-split"
        >
          <Itinerary
            currentTrip={currentTrip}
            handleSave={handleSave}
            setTrip={setTrip}
            setUser={setUser}
            user={user}
            itinerary={itinerary}
            tripId={currentTrip}
            addToItinerary={addToItinerary}
            setItinerary={setItinerary}
            isLoaded={isLoaded}
            tripName={tripName}
            setTripName={setTripName}
          />
          <DragDropContext onDragEnd={(res, date) => onDragEnd(res, itinerary)}>
            {mappedItineraryDates}
          </DragDropContext>
        </Grid>
        <Grid pl={4} item md={7} sm={12}>
          <Paper className="main-window-split map">
            <div className="map-container-hidden"></div>
            {/* <Map
            isLoaded={isLoaded}
            itinerary={itinerary}
          /> */}
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
              <SaveWithoutUser setItinerary={setItinerary} setUser={setUser} currentTrip={currentTrip} itinerary={itinerary}/>
            </Paper>
        </Modal>
      </div>
    </>
  );
}

export default MainPage;
