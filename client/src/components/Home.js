import Grid from "@mui/material/Grid";
import Map from "./Map";
function Home() {
  return (
    <Grid container xs={12}>
      <Grid item xs={6}>
          <h1>Hello World</h1>
      </Grid>
      <Grid item xs={6}>
        <Map />
      </Grid>
    </Grid>
  );
}

export default Home;
