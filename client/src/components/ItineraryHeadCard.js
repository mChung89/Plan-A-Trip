import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Image from "material-ui-image";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography"

function ItineraryHeadCard () {

    return (
    <Grid
      sx={{position: 'sticky', top: "0vh", zIndex: 9}}
      container
      direction="row"
      px={1}
      pb={1}
      key={1}
      className="place-cards"
    >
      <Paper elevation={4} sx={{ display: "flex", width: "100%" }}>
        <Grid item xs={12}>
            <Typography variant="h1">Head Card. Will have Date</Typography>
        </Grid>
      </Paper>
    </Grid>
    )
}

export default ItineraryHeadCard