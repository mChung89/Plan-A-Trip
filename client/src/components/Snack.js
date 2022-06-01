import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { forwardRef } from 'react'


const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function Snack({ addedPlace, openSnack, setOpenSnack }) {
  const handleClose = () => {
    setOpenSnack(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{vertical:'bottom', horizontal: 'center'}}
        open={openSnack}
        onClose={handleClose}
      >
          <Alert>
            {addedPlace} successfully added!
          </Alert>
      </Snackbar>
    </div>
  );
}

export default Snack