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
import Box from '@mui/material/Box';
import { Redirect } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';

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
  const [openUpload, setOpenUpload] = React.useState(props.upd);
  const [file, setFile] = React.useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  function handleUpload() {
        return (<Redirect to="/admin" />)
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
                <IconButton color="primary" href="/admin/questionnaire_upd">
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
                    <Button onClick={handleClose}>Ακυρο</Button>
                    <Button href="/admin/resetall/" autoFocus>
                        Ναι
                    </Button>
                    </DialogActions>
                </Dialog>
            </Stack>
        </Stack>        
        {Questionnaires()}
        <IconButton color="primary" href="/admin/create_questionnaire">
            <AddCircleIcon fontSize="large" />
        </IconButton>
        <Dialog
            open={props.upd}
            //onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Επιλέξτε αρχείο json με τα δεδομένα ενός νέου ερωτηματολογίου."}
            </DialogTitle>
            <DialogContent>
                <Stack direction="row" justifyContent="center">
                    <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>
                        <Button component="label">
                            <form enctype="multipart/form-data" method="post">
                                <input hidden type="file" onChange={handleChange} class="form-control-file" name="uploaded_file" />
                            </form>
                        Select file
                        </Button>             
                    </Box>
                </Stack>                    
            </DialogContent>
            <DialogActions>
                <Button href="/admin" >Ακυρο</Button>
                <Button onClick={handleUpload}>Συνεχεια</Button>
            </DialogActions>
        </Dialog>
    </Container> 
  )
}

export default Admin