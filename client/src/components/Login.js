import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

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
          setUser(data)})
      }
    });
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleLogOut () {
    fetch('/logout')
  }

  function handleRefresh() {
    fetch('/refresh')
    .then(res => {
      if(res.ok)res.json().then(data => console.log(data))})
  }

  return (
      <Paper>
        <Box alignItems sx={{margin: 'auto'}} component="form">
          <Typography>Login Here</Typography>
          <TextField
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button onClick={handleSubmit}>Submit</Button>
          {user ? <Typography variant="h1">{user.accessToken}</Typography> : null}
        </Box>
        <Button onClick={handleLogOut}>Log Out</Button>
        <Button onClick={handleRefresh}>Refresh my Token</Button>
      </Paper>
  );
}

export default Login;
