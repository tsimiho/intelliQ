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
import Button from '@mui/material/Button';
import MySnackBar from './MySnackBar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import axios from "axios";

function Admin(props) {
  const [healthcheck, setHelathcheck] = React.useState(false);
  const [openHealthcheck, setOpenHealthcheck] = React.useState(false);
  const [resetall, setResetall] = React.useState(true);
  const [openResetall, setOpenResetall] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openUpload, setOpenUpload] = React.useState(false);
  const [file, setFile] = React.useState();
  const [Q, setQ] = React.useState([]);

  axios
    .get(
        `/allquestionnaires`,
        { crossdomain: true }
    )
    .then((response) => {
        setQ(response.data);
    });

  function Questionnaires () {
    return (
        <List sx={{ mt: 0 }} style={{ padding: '10px'}}>
            {Q.map((q) =>
            <ListItem disablePadding>
                <ListItemButton href={`/admin/view_questionnaire/${q.questionnaireID}`}>
                    <ListItemText primary={q.questionnaireTitle} />
                </ListItemButton>
            </ListItem>
            )}            
        </List>
    )
  }   

  const handleHealthcheck = () => {
    axios
        .get(
            `/admin/healthcheck`
        )
        .then((response) => {
            setHelathcheck(response.data.status === 'OK');
        });
    setTimeout(() => {setOpenHealthcheck(true);}, 500);
  };

  const handleResetall = () => {
    setOpen(false);
    axios
        .get(
            `/admin/healthcheck`,
            { crossdomain: true }
        )
        .then((response) => {
            setResetall(response.data.status === 'OK');
        });
    setOpenResetall(true);
  };

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  function handleUpload() {
    setOpenUpload(false);
    let form = new FormData();
    form.append('file', file);
    axios.post(`/admin/questionnaire_upd`,
          form, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '80px', marginBottom: '80px'}}>
        <TableContainer component={Paper} style={{ width:'100%', marginTop: '20px'}}>
            <Table aria-label="customized table">
                <Stack direction="row" alignItems="center" spacing={2} style={{ padding: '20px'}}>
                    <Avatar
                        sx={{ bgcolor: grey[500], width: 56, height: 56  }}
                        alt="Arr"
                        src=""
                    />
                    <Typography variant="h5" gutterBottom>
                        {localStorage.getItem('username')}
                    </Typography>
                </Stack>
            </Table>
        </TableContainer>    
        <TableContainer component={Paper} style={{ width:'100%', marginTop: '20px'}}>
            <Table aria-label="customized table">
                    <Stack direction="row" justifyContent="space-between" spacing={2} 
                            style={{ marginTop: '15px', marginBottom: '10px', marginLeft: '20px', marginRight: '20px'}}>
                    <Stack direction="row" alignItems="flex-start" spacing={2}>
                        <Typography variant="h4">
                        Questionnaires
                        </Typography>
                        <IconButton color="primary" onClick={()=> setOpenUpload(true)}>
                            <FileUploadIcon />
                        </IconButton>
                    </Stack>
                    <Stack direction="row" alignItems="flex-end" spacing={2}>
                        <Button onClick={handleHealthcheck} variant="contained">Check connection</Button>
                        <MySnackBar 
                        open={openHealthcheck}
                        setOpen={setOpenHealthcheck}
                        check={healthcheck}
                        success_text="Connection is ok!" 
                        failure_text="There is no connection with DB."
                        />
                        <Button onClick={() => setOpen(true)} variant="outlined">Reset all</Button>
                        <MySnackBar 
                        open={openResetall}
                        setOpen={setOpenResetall}
                        check={resetall}
                        success_text="H αρχικοποίηση των δεδομένων ολοκληρώθηκε με επιτυχία!" 
                        failure_text="Η αρχικοποίηση των δεδομένων απέτυχε."
                        />
                        <Dialog
                            open={open}
                            //onClose={() => setOpen(false)}
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
                            <Button onClick={() => setOpen(false)}>Ακυρο</Button>
                            <Button onClick={handleResetall} autoFocus>
                                Ναι
                            </Button>
                            </DialogActions>
                        </Dialog>
                    </Stack>
                </Stack>        
                {Questionnaires()}
                <IconButton color="primary" href="/admin/create_questionnaire"
                style={{ marginBottom: '10px', marginLeft: '10px'}}>
                    <AddCircleIcon fontSize="large" />
                </IconButton>
                <Dialog
                    open={openUpload}
                    //onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    {"Επιλέξτε αρχείο json με τα δεδομένα ενός νέου ερωτηματολογίου."}
                    </DialogTitle>
                    <DialogContent>
                        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                            <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>
                                <Button component="label">
                                    <form enctype="multipart/form-data" method="post">
                                        <input hidden type="file" onChange={handleChange} class="form-control-file" name="file" />
                                    </form>
                                Select file
                                </Button>             
                            </Box>
                            <Typography variant="h7">
                                {file && `${file.name}`}
                            </Typography>
                        </Stack>                    
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenUpload(false)} >Ακυρο</Button>
                        <Button onClick={handleUpload}>Συνεχεια</Button>
                    </DialogActions>
                </Dialog>
            </Table>
        </TableContainer>   
        
    </Container> 
  )
}

export default Admin