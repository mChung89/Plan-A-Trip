import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";
import Typography from '@mui/material/Typography'

export default function NewTripDialog({
    user,
    searchTripInfo,
    open,
    handleClose,
    setItinerary,
    setTrip,
    setUser
}) {
  const [startValue, setStartValue] = useState(new Date());
  const [endValue, setEndValue] = useState(new Date());
  const [tripName, setTripName] = useState('');
  const [errors, setErrors] = useState(null)

  const handleChange = (e) => {
      console.log(e > endValue)
      if(e > endValue) {
          setErrors("Start date cannot be after end date")
          return
      }
    setStartValue(e);
  };

  const handleEndChange = (e) => {
      if(e< startValue) {
          setErrors("End date cannot be before start date!")
          return
      }
    setEndValue(e);
  };

  function handleClick() {
    handleClose();
    setErrors(null)
    const formatStart = new Date(startValue);
    const formatEnd = new Date(endValue);
    // See how many days in between to determine loop
    const difference =
      (formatEnd.getTime() - formatStart.getTime()) / (1000 * 60 * 60 * 24);

    const newItinerary = [];
    for (let i = 0; i <= difference; i++) {
      newItinerary.push(formatStart.getTime() + i * (1000 * 60 * 60 * 24));
    }
    const formatFilteredDates = newItinerary.map(
      (each) => new Date(each)
    )

    fetch('/trip',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            dates: formatFilteredDates,
            userId: user.user._id,
            tripName: tripName
        })
    })
    .then(res=> {
        if(res.ok) {
            res.json().then(data => {
                setItinerary(data.newTrip.itineraries)
                setTrip(data.newTrip._id)
                setUser(data.updatedUser)
            })
        }
    })
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        Going to {searchTripInfo?.address_components[0].short_name}!
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Label your trip and specify the dates you'll be gone for!
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          value={tripName}
          onChange={(e) => setTripName(e.target.value)}
          placeholder="Enter a name for your trip here..."
          label="Trip name"
          fullWidth
          variant="standard"
        />
        <Grid container justifyContent="center" spacing={2} pt={3}>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Start Date"
                inputFormat="MM/dd/yyyy"
                value={startValue}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="End Date"
                inputFormat="MM/dd/yyyy"
                value={endValue}
                onChange={handleEndChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Grid item xs={12} pt={2}>
            <Typography textAlign='center' sx={{color: 'red'}}>
                {errors ? errors : null}
            </Typography>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClick}>Let's Go!</Button>
      </DialogActions>
    </Dialog>
  );
}
