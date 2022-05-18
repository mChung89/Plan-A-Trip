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
        const headers = res.headers.get("auth-token");
        localStorage.setItem("user", headers);
      }
    });
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        </Box>
      </Paper>
  );
}

export default Login;
