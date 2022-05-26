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

export default function NewTripDialog({ searchTripInfo, open, handleClickOpen, handleClose }) {
  const [startValue, setStartValue] = useState([null, null]);
  const [endValue, setEndValue] = useState([null, null]);

  const handleChange = (e) => {
    setStartValue(e);
  };

  const handleEndChange = (e) => {
    setEndValue(e);
  };

  console.log(searchTripInfo)

  function handleClick() {
    const formatStart = new Date(startValue);
    const formatEnd = new Date(endValue);
    // See how many days in between to determine loop
    const difference =
      (formatEnd.getTime() - formatStart.getTime()) / (1000 * 60 * 60 * 24);

    const newItinerary = [];
    for (let i = 0; i <= difference; i++) {
      newItinerary.push(formatStart.getTime() + i * (1000 * 60 * 60 * 24));
    }
    // const formatFilteredDates = res.map(
    //   (each) => new Date(each)
    // )
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Trip!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {searchTripInfo ? `Going to ${searchTripInfo?.address_components[0].short_name}? Label your trip and specify the dates you'll be gone for!`: null}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            placeholder="Enter a name for your trip here..."
            label="Trip name"
            fullWidth
            variant="standard"
          />
          <Grid container justifyContent="center" spacing={2} py={3}>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Let's Go!</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
