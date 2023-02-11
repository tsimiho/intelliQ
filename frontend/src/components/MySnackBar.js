import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function MySnackBar(props) {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    props.setOpen(false);
  };

  function Success() {
    return (
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        {props.success_text}
      </Alert>
    );
  }

  function Failure() {
    return (
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {props.failure_text}
      </Alert>
    );
  }

  return (
    <>
        <Snackbar open={props.open} autoHideDuration={6000} onClose={handleClose}>
            {props.check ? Success() : Failure()}
        </Snackbar>
    </>
      
  );
}