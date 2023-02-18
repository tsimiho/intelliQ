import React from 'react';
import MySnackBar from '../MySnackBar';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import FullQuestionnaire from '../FullQuestionnaire';
import Statistics from '../Statistics';
import History from '../History';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import LinkIcon from '@mui/icons-material/Link';
import Tooltip from '@mui/material/Tooltip';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import copy from 'copy-to-clipboard';

function ViewQuestionnairePage(props) {
  const { params } = props.match;
  const [info, setInfo] = React.useState(false);
  const [statistics, setStatistics] = React.useState(false);
  const [history, setHistory] = React.useState(false);
  const [Q, setQ] = React.useState({
    "questionnaireID": "",
    "questionnaireTitle": "",
    "keywords": [],
    "questions": []
  });
  const [bars, setBars] = React.useState([]);
  const [historyAnswers, setHistoryAnswers] = React.useState([]);
  const [stat, setStat] = React.useState('');
  const [check, setCheck] = React.useState(true);
  const [reset, setReset] = React.useState(true);
  const [openReset, setOpenReset] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const handleInfoClick = () => {
    setInfo(!info);
    setStatistics(false);
    setHistory(false);
  };

  const handleStatisticsClick = () => {
    setStatistics(!statistics);
    setInfo(false);
    setHistory(false);
  };

  const handleHistoryClick = () => {
    setHistory(!history);
    setInfo(false);
    setStatistics(false);
  };

  if (check) {
    axios
      .get(
          `/fullquestionnaire/${params.questionnaireID}`,
          { crossdomain: true }
      )
      .then((response) => {
        setQ(response.data);
      })
      .catch((error) => {
        setStat(error.response.status);
      });

  axios
      .get(
          `/graph/${params.questionnaireID}`,
          { crossdomain: true }
      )
      .then((response) => {
        setBars(response.data);
      })
      .catch((error) => {
        setStat(error.response.status);
      });

  axios
      .get(
          `/history/${params.questionnaireID}`,
          { crossdomain: true }
      )
      .then((response) => {
        setHistoryAnswers(response.data);
        //console.log(response.data);
        setCheck(false);
      })
      .catch((error) => {
        setStat(error.response.status);
      });
  }
  
  const handleReset = () => {
    setOpen(false);
    axios
        .post(
            `/admin/resetq/${params.questionnaireID}`
        )
        .then((response) => {
            setReset(response.data.status === 'OK');
        })
        .catch((error) => {
            setStat(error.response.status);
        });
    setOpenReset(true);
  };

  const handleCopyLink = () => {
    setCopied(true);
    copy(`http://localhost:3000/answer_questionnaire/${params.questionnaireID}`);
  }
  
  if (stat !== '') {
    return (
        <Redirect to={`/error/${stat}`} />
    )
  }

  return (
    <Container maxWidth="md" style={{ marginTop: '80px', marginBottom: '80px'}}>
      <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" justifyContent="left">
            <Typography variant="h4">
                { Q.questionnaireTitle }
            </Typography>
            <Tooltip title={copied ? 'Copied!' : 'Copy link'}>
              <ToggleButtonGroup
                value={'copied'}
                exclusive
                onChange={handleCopyLink}
                aria-label="copied"
                style={{ maxHeight: '40px', marginLeft: '15px'}}
              >
                <ToggleButton value="copied" aria-label="copied">
                  <LinkIcon/>
                </ToggleButton>
              </ToggleButtonGroup> 
            </Tooltip>
          </Stack>
          <Button onClick={() => setOpen(true)} variant="contained" style={{ maxHeight: '40px'}}>Reset</Button>
          <MySnackBar 
          open={openReset}
          setOpen={setOpenReset}
          check={reset}
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
              {"Είστε βέβαιοι ότι θέλετε να αρχικοποιήσετε όλα τα δεδομένα του ερωτηματολογίου;"}
              </DialogTitle>
              <DialogContent>
              <DialogContentText id="alert-dialog-description">
                  Κατά την αρχικοποίηση θα διαγραφεί το ιστορικό και τα στατιστικά του ερωτηματολογίου.
              </DialogContentText>
              </DialogContent>
              <DialogActions>
              <Button onClick={() => setOpen(false)}>Ακυρο</Button>
              <Button onClick={handleReset} autoFocus>
                  Ναι
              </Button>
              </DialogActions>
        </Dialog>
      </Stack>
      <TableContainer component={Paper} style={{ marginTop: '20px'}}>
        <Table aria-label="customized table">
          <List>
            <ListItemButton onClick={handleInfoClick}>
              <ListItemText primary="Info" />
              {info ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={info} timeout="auto" unmountOnExit>
              <FullQuestionnaire
              questionnaireID={Q.questionnaireID}
              questionnaireTitle={Q.questionnaireTitle}
              keywords={Q.keywords}
              questions={Q.questions}
              />
            </Collapse>
            <Divider/>
            <ListItemButton onClick={handleStatisticsClick}>
              <ListItemText primary="Statistics" />
              {statistics ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={statistics} timeout="auto" unmountOnExit>
              <Statistics questions={bars}/>
            </Collapse>
            <Divider/>
            <ListItemButton onClick={handleHistoryClick}>
              <ListItemText primary="History" />
              {history ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={history} timeout="auto" unmountOnExit>
              <History history={historyAnswers}/>
            </Collapse>
          </List>
        </Table>
      </TableContainer>      
    </Container>
  )
}

export default ViewQuestionnairePage