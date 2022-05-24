import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    justifyContent: "center"
};

function DatePicker({ itineraryId, datePickerStyle, open, setOpen, setStartValue, startValue, endValue, setEndValue }) {
    const handleChange = (e) => {
        setStartValue(e);
    };
    const handleEndChange = (e) => {
        setEndValue(e);
    };
    function handleClick () {
        fetch(`/trip/${itineraryId}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({startDate: startValue, endDate: endValue, itineraryId: itineraryId})})
        .then(res => res.json())
        .then(console.log)
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
                        <div className={`datewindow ${datePickerStyle}`}>
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
    )
}

export default DatePicker