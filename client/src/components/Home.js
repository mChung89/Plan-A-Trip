import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

function Home() {

    return (
        <Grid container sx={{ bgcolor: 'black', height: '100vh' }} justifyContent='center' fullWidth>
            <Typography sx={{ color: 'white' }} textAlign="center">Hello World</Typography>
        </Grid>
    )
}

export default Home