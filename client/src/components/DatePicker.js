import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from 'react'
import TextField from '@mui/material/TextField'


function DatePicker() {
    const [startValue, setStartValue] = useState([null, null])
    const [endValue, setEndValue] = useState([null,null])
    const handleChange = (newValue) => {
        setStartValue(newValue);
    };
    const handleEndChange = (newValue) => {
        setEndValue(newValue);
    };
    // console.log(startValue?.toISOString())
    // console.log(endValue?.toISOString())

    return (
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
    )
}

export default DatePicker