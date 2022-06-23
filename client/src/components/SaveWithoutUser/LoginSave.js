import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from '@mui/material/Stack'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "rgba(255,255,255)",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "1em",
  p: 4,
};

function LoginSave({ setUser, setErrors, errors, setToggle, setTrip, addNewTrip, setTripSelector }) {

  const defaultState = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(defaultState);
  

  function handleSubmit() {
    fetch("/auth/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        res.json().then(data => {
            addNewTrip(data.user._id)
            setUser(data)
            setTripSelector(data.user.itineraries)
        })
      } else {
        res.json().then(data => setErrors(data.errors))
      }
    });
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }


  function handleToggle() {
    setErrors(null)
    setToggle(prev => !prev)
  }

  return (
      <Paper>
        <Stack>
          <Box direction="column" sx={style} component="form">
            <Stack py={2} sx={{width: "100%"}}>
            <Typography variant='h4' textAlign='center'>LoginSave Here</Typography>
            </Stack>
            <Stack pt={2} alignItems='center'>
              <Typography textAlign='center'>Email</Typography>
            <TextField
              sx={{width: "75%"}}
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            <Stack pt={2} alignItems='center' sx={{width: '100%'}}>
              <Typography textAlign='center'>Password</Typography>
            <TextField
              sx={{width: '75%'}}
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
            />
            </Stack>
            <Stack py={2}>
            <Typography textAlign='center' sx={{color: 'red', zIndex: 6}}>{errors ? errors : null}</Typography>
            </Stack>
            </Stack>
            <Stack pb={2}>
            <Button onClick={handleSubmit}>Submit</Button>
            <Button onClick={handleToggle}>New? Create an Account!</Button>
            </Stack>
          </Box>
        </Stack>
      </Paper>
  );
}

export default LoginSave;