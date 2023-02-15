import React from 'react'
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Redirect } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import axios from 'axios';

function QuestionnaireCompletedPage(props) {
  const { params } = props.match;
  const [check, setCheck] = React.useState(true);
  const [stat, setStat] = React.useState('');
  const [pairs, setPairs] = React.useState([]);
  const [questionnaireTitle, setQuestionnaireTitle] = React.useState('');
  
  if (check) {
    axios
        .get(
            `/questionnaire/${params.questionnaireID}`,
            { crossdomain: true }
        )
        .then((response) => {
            setQuestionnaireTitle(response.data.questionnaireTitle);
        })
        .catch((error) => {
            setStat(error.response.status);
        });
    axios
      .get(
          `/summary/${params.questionnaireID}/${params.session}`,
          { crossdomain: true }
      )
      .then((response) => {
        setPairs(response.data.pairs);
        setCheck(false);
      })
      .catch((error) => {
        setStat(error.response.status);
      });
  }

  if (stat !== '') {
    return (
        <Redirect to={`/error/${stat}`} />
    )
  }

  return (
    <Container maxWidth="md" style={{ marginTop: "80px", marginBottom: '80px'}}>
        <TableContainer component={Paper} style={{ marginTop: '20px'}}>
            <Table aria-label="customized table">
                <Stack 
                direction="column" 
                justifyContent="center" 
                alignItems="left" 
                //spacing={2}
                style={{ padding: '30px'}}>
                    <Typography variant="h4" gutterBottom >
                        {questionnaireTitle}
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems='center'>
                        <TaskAltIcon sx={{ fontSize: 30 }} />
                        <Typography variant="h6" style={{ marginTop: '10px'}} gutterBottom >
                            Your answers were submitted successfully!
                        </Typography>
                    </Stack>
                    <List>
                        { pairs.map((pair) => 
                            <>
                                <ListItem>
                                    <List>
                                        <ListItemText primary={pair.qtext} />
                                        <ListItem>
                                            <ListItemIcon>
                                                <SendIcon sx={{ fontSize: 10 }}/>
                                            </ListItemIcon>
                                            <ListItemText primary={pair.opttxt} />
                                        </ListItem>    
                                    </List> 
                                </ListItem>
                                <Divider />
                            </>
                        )}
                    </List>
                </Stack>
            </Table>
        </TableContainer>
    </Container>
  )
}

export default QuestionnaireCompletedPage