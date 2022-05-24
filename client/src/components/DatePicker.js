import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  justifyContent: "center",
};

function DatePicker({
  tripId,
  open,
  setOpen,
  itinerary
}) {
    const [startValue, setStartValue] = useState([null,null])
    const [endValue, setEndValue] = useState([null,null])

    useEffect(() => {
        setStartValue(itinerary[0].date)
        setEndValue(itinerary[itinerary.length -1].date)
        return () => {"Unmounting"}
    },[itinerary])

  const handleChange = (e) => {
    setStartValue(e);
  };
  
  const handleEndChange = (e) => {
    setEndValue(e);
  };

  function handleClick() {
    const currentDates = itinerary.map(each=> new Date(each.date).getTime())
    const formatStart = new Date(startValue);
    const formatEnd = new Date(endValue);
    // See how many days in between to determine loop
    const difference =
      (formatEnd.getTime() - formatStart.getTime()) / (1000 * 60 * 60 * 24);
    
    const newItinerary = [];
    for (let i = 0; i < difference; i++) {
      newItinerary.push(formatStart.getTime() + (i * (1000 * 60 * 60 * 24)));
    }
    console.log(newItinerary)
    console.log("Current dates", currentDates)


    let filteredItinerary = currentDates.map(cd=> newItinerary.filter(date => date !== cd))

    console.log("Filtered Itinerary:", filteredItinerary)


    const formatFilteredDates = filteredItinerary[0].map(each => new Date(each))
    console.log(formatFilteredDates)

    fetch(`/trip/${tripId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dates: formatFilteredDates,
        itineraryId: tripId,
      }),
    })
      .then((res) => res.json())
      .then(console.log);
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className={`datewindow`}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Start Date"
                  inputFormat="MM/dd/yyyy"
                  value={startValue}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DesktopDatePicker
                  label="End Date"
                  inputFormat="MM/dd/yyyy"
                  value={endValue}
                  onChange={handleEndChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <Button onClick={handleClick}>Update itinerary dates</Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default DatePicker;
