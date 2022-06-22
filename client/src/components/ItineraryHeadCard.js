import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Image from "material-ui-image";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography"

function ItineraryHeadCard ({ date }) {
    const formattedDate = new Date(date?.date)

    return (
    <Grid
      container
      direction="row"
      pb={1}
      key={1}
      className="place-cards"
    >
      <Paper elevation={4} sx={{ display: "flex", width: "100%" }}>
        <Grid item xs={12}>
            <Typography variant="h2">{formattedDate.toString().slice(4,15)}</Typography>
        </Grid>
      </Paper>
    </Grid>
    )
}

export default ItineraryHeadCard