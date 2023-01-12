import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function MySnackBar(props) {
  const [open, setOpen] = 
    React.useState(props.check === "succeded" || props.check === "failed" ?
    true : false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
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
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            {props.check === "succeded" ? Success() : Failure()}
        </Snackbar>
    </>
      
  );
}