import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

function Login () {
    const defaultState = {
        email: "",
        password: ""
    }
    const [formData, setFormData] = useState(defaultState)

    function handleSubmit (e) {
        console.log('click')
        fetch('/loginuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)})
            .then(res => {
                const headers = res.headers.get('auth-token')
                localStorage.setItem("user", headers)
            })
    }

    function handleChange (e) {
        setFormData({...formData, [e.target.name]: e.target.value,})
    }

    return (
        <Box component="form" >
            <Typography>Login Here</Typography>
            <TextField name='email' value={formData.email} onChange={handleChange}/>
            <TextField name='password' value={formData.password} onChange={handleChange}/>
            <Button onClick={handleSubmit}>Submit</Button>
        </Box>
    )
}

export default Login