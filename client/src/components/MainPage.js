import Grid from "@mui/material/Grid";
import Map from "./Map";
import Itinerary from "./Itinerary";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import ItineraryHeadCard from "./ItineraryHeadCard";
import ItineraryCard from "./ItineraryCard";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'



function MainPage({ isLoaded, user, currentTrip, setTrip, itinerary, setItinerary }) {
  useEffect(() => {
    fetch(`trip/${currentTrip}`)
      .then((res) => res.json())
      .then((data) => {
        setItinerary(data[0]);
        setTrip(data[1])
      });
  }, [currentTrip]);

  const onDragEnd = (res, itinerary) => {
    console.log("Before", itinerary)
    if (!res.destination) return
    const { source, destination } = res
    const findItinerary = itinerary.filter(each => each._id === source.droppableId)
    const [removed] = findItinerary[0].places.splice(source.index, 1)
    const findDestination = itinerary.filter(each => each._id === destination.droppableId)
    findDestination[0].places.splice(destination.index, 0, removed)
    const dontMutateDate = { ...itinerary }
    dontMutateDate.places = findItinerary
    setItinerary(itinerary.map(each => each._id === dontMutateDate._id ? dontMutateDate : each))
  }


  async function addToItinerary(place, itineraryId) {
    const findItinerary = itinerary.find((each) => each._id === itineraryId);
    findItinerary.places = [...findItinerary.places, place];
    const newItinerary = itinerary.map((each) =>
      each._id === findItinerary._id ? findItinerary : each
    );
    setItinerary(newItinerary);
    // fetch(`/itinerary/${itineraryId}`, {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(place),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     const findItinerary = itinerary.find(each => each._id = data._id)
    //     findItinerary.places = [...findItinerary.places, data]
    //     const newItinerary = itinerary.map(each=> each._id === findItinerary._id ? findItinerary : each)
    //     setItinerary(newItinerary);
    //   });
  }

  function handleSave() {
    fetch(`/trip/${currentTrip}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itinerary),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  function deleteFromItinerary(placeId, index) {
    // Filter out from state
    const newItinerary = itinerary[index].places.filter(place => place._id !== placeId)
    const updateItinerary = [...itinerary]
    updateItinerary[index].places = newItinerary
    setItinerary(updateItinerary);
  }

  const mappedItineraryDates = itinerary?.map(date => {
    return (
      <Grid
        container
        key={date._id}
      >
          <Grid item xs={12}>
            <Grid sx={{ position: 'sticky', top: "0vh", zIndex: 9 }} item xs={12}>
              <ItineraryHeadCard key={date._id} date={date} />
            </Grid>
            <Droppable droppableId={date._id} key={date._id}>
              {(provided, snapshot) => {
                return <Grid
                  direction="column"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    // background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey'
                  }}
                >
                  {date?.places.map((place, index) => {
                    return (
                      <Grid item xs={12}>
                        <ItineraryCard key={place._id} index={index} itineraryId={date._id} deleteFromItinerary={deleteFromItinerary} place={place} />
                      </Grid>
                    )})}
                  {provided.placeholder}
                </Grid>
              }}
            </Droppable>
          </Grid>
      </Grid>
    );
  });

  return (
    <Grid container className="main-window">
      <Grid item xs={5} px={3} className="itinerary main-window-split">
        <Itinerary setTrip={setTrip} handleSave={handleSave} user={user} itinerary={itinerary} tripId={currentTrip} addToItinerary={addToItinerary} setItinerary={setItinerary} isLoaded={isLoaded} />
        <DragDropContext onDragEnd={(res, date) => onDragEnd(res, itinerary)}>
          {mappedItineraryDates}
        </DragDropContext>
      </Grid>
      <Grid pl={4} item xs={7}>
        <Paper className="main-window-split map">
          <div className='map-container-hidden'></div>
          {/* <Map
            isLoaded={isLoaded}
            itinerary={itinerary}
          /> */}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default MainPage;
