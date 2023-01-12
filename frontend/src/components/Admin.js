import React from 'react'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { grey } from '@mui/material/colors';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import QEx2 from './QEx2';
import MySnackBar from './MySnackBar';
// import ResetallDialog from './ResetallDialog';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';

const Q = QEx2();
function Questionnaires () {
    return (
        <List sx={{ mt: 2 }}>
            {Q.Questionnaires.map((q) =>
            <ListItem disablePadding>
                <ListItemButton href={`/admin/view/${q.questionnaireID}`}>
                    <ListItemText primary={q.questionnaireTitle} />
                </ListItemButton>
            </ListItem>
            )}            
        </List>
    )
}

function Admin(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '80px' }}>
        <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar
            sx={{ bgcolor: grey[500], width: 56, height: 56  }}
            alt="Arr"
            src=""
        />
        <Typography variant="h5" gutterBottom>
          username
        </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between" sx={{ mt: 6 }} spacing={2}>
            <Stack direction="row" alignItems="flex-start" spacing={2}>
                <Typography variant="h4">
                Questionnaires
                </Typography>
                <IconButton color="primary" aria-label="upload picture" component="label">
                    <form enctype="multipart/form-data" method="post">
                        <input hidden type="file" class="form-control-file" name="uploaded_file" />
                    </form>
                    <FileUploadIcon />
                </IconButton>
            </Stack>
            <Stack direction="row" alignItems="flex-end" spacing={2}>
                <Button href="/admin/healthcheck" variant="contained">Check connection</Button>
                <MySnackBar 
                check={props.check}
                success_text="Connection is ok!" 
                failure_text="There is no connection with DB."
                />
                <Button onClick={handleClickOpen} variant="outlined">Reset all</Button>
                <MySnackBar 
                check={props.result}
                success_text="H αρχικοποίηση των δεδομένων ολοκληρώθηκε με επιτυχία!" 
                failure_text="Η αρχικοποίηση των δεδομένων απέτυχε."
                />
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
                    <Button href="/admin/resetall/" autoFocus>
                        Ναι
                    </Button>
                    </DialogActions>
                </Dialog>
            </Stack>
        </Stack>        
        {Questionnaires()}
    </Container> 
  )
}

export default Admin