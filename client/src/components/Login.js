import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from '@mui/material/Stack'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import '../styles/App.css'

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

function Login() {
  const defaultState = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(defaultState);
  const [user, setUser] = useState(null)

  function handleSubmit() {
    fetch("/loginuser", {
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
        })
      }
    });
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleLogOut() {
    fetch('/logout')
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
            <Stack py={2}>
            <Typography variant='h2' textAlign='center'>Login Here</Typography>
            </Stack>
            <Stack py={2}>
            <TextField
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
            />
            </Stack>
            <Stack py={2}>
            <Button onClick={handleSubmit}>Submit</Button>
            {user ? <Typography variant="h1">{user.accessToken}</Typography> : null}
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
