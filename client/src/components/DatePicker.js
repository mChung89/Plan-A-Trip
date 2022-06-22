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
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

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
};

function DatePicker({ tripId, open, setOpen, itinerary, setItinerary, currentTripName, notify }) {
  const [startValue, setStartValue] = useState([null, null]);
  const [endValue, setEndValue] = useState([null, null]);
  const [errors, setErrors] = useState(null)

  useEffect(() => {
    setStartValue(itinerary[0].date);
    setEndValue(itinerary[itinerary.length - 1].date);
    return () => {
      "Unmounting";
    };
  }, [itinerary]);

  //Gets dates of start date and end date
  const handleChange = (e) => {
    if (e > endValue) {
      setErrors("Start date cannot be after end date");
      return;
    }
    setStartValue(e);
  };

  const handleEndChange = (e) => {
    if (e < startValue) {
      setErrors("End date cannot be before start date!");
      return;
    }
    setEndValue(e);
  };

  // Handles editing of trip dates
  function handleClick() {
    const formatStart = new Date(startValue);
    const formatEnd = new Date(endValue);
    // See how many days in between to determine loop
    const difference =
    (formatEnd.getTime() - formatStart.getTime()) / (1000 * 60 * 60 * 24);
    // Get array of user selected dates
    const newItinerary = [];
    for (let i = 0; i <= difference; i++) {
      newItinerary.push(formatStart.getTime() + (i * (1000 * 60 * 60 * 24)));
    }
    //Get array of current dates
    const currentDates = itinerary.map((each) => new Date(each.date).getTime());

    // Checks to see if any of the selected dates fall outside of current dates 
    const res = newItinerary.filter(item => !currentDates.includes(item))
    // Format dates to be sent
    const formatFilteredDates = res.map(
      (each) => new Date(each)
    );

    //Trim current dates
    if (res.length === 0 && currentDates.length > newItinerary.length) {
      const mappedSelectedDates = newItinerary.map(each => new Date(each).toISOString())
      const idsToKeep = itinerary.filter(each=> mappedSelectedDates.includes(new Date(each.date).toISOString()))
      const idsToDelete = itinerary.filter(each=> !mappedSelectedDates.includes(new Date(each.date).toISOString()))
      fetch(`trip/${tripId}/trim`,{
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({dates: idsToKeep, idsToDelete: idsToDelete, currentTripName})
      })
      .then((res) => res.json())
      .then(data => {
        setItinerary(data)
        //Closes modal
        setOpen(false)
        //Snack
        notify("Dates changed!")
        });
    }

    if (res.length > 0) {
      fetch(`/trip/${tripId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({dates: formatFilteredDates})
      })
        .then((res) => res.json())
        .then(data => {
          setItinerary(data);
          setOpen(false);
          notify("Dates changed!")
        });
    }
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
            <Stack justifyContent='center' spacing={3}>
              <Stack>
                <Typography variant="h5" textAlign="center">How long are you planning for?</Typography>
              </Stack>
              <Stack py={1}>
                <Stack py={1}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Start Date"
                    inputFormat="MM/dd/yyyy"
                    value={startValue}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                </Stack>
                <Stack pt={2}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="End Date"
                    inputFormat="MM/dd/yyyy"
                    value={endValue}
                    onChange={handleEndChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                </Stack>
              </Stack>
              <Stack xs={12}>
                <Button onClick={handleClick}>Update itinerary dates</Button>
                {errors ? <Typography variant='p'>{errors}</Typography> : null}
              </Stack>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default DatePicker;
