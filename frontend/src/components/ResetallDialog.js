import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ResetallDialog(props) {
  const [open, setOpen] = React.useState(props.open === "t"? true : false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Είστε βέβαιοι ότι θέλετε να αρχικοποιήσετε όλα τα δεδομένα του συστήματος;"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Κατά την αρχικοποίηση θα διαγραφούν όλα τα ερωτηματολόγια και οι απαντήσεις τους.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Άκυρο</Button>
          <Button onClick={handleClose} autoFocus>
            Ναι
          </Button>
        </DialogActions>
      </Dialog>
  );
}