import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from '@mui/material/Stack'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import '../styles/App.css'
import { useNavigate } from "react-router-dom"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "rgba(255,255,255,.8)",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "1em",
  p: 4,
};

function Login({ setUser, user }) {
  const navigate = useNavigate()
  const [errors, setErrors] = useState(null)

  const defaultState = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(defaultState);
  console.log(user)

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
          console.log(data)
          setUser(data)
          navigate('/')
        })
      } else {
        res.json().then(data => setErrors(data.errors))
      }
    });
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleLogOut() {
    fetch('/logout')
    setUser(null)
  }

  function handleRefresh() {
    fetch('/refresh')
      .then(res => {
        if (res.ok) res.json().then(data => console.log(data))
      })
  }

  return (
    <div className="login-page">
      <Paper>
        <Stack>
          <Box direction="column" sx={style} component="form">
            <Stack py={2} sx={{width: "100%"}}>
            <Typography variant='h2' textAlign='center'>Login Here</Typography>
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
            <Typography textAlign='center' sx={{color: 'red'}}>{errors ? errors : null}</Typography>
            </Stack>
            </Stack>
            <Stack pb={2}>
            <Button onClick={handleSubmit}>Submit</Button>
            <Button onClick={handleLogOut}>Log Out</Button>
            <Button onClick={handleRefresh}>Refresh my Token</Button>
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </div >
  );
}

export default Login;
