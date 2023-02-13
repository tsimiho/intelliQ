import React from 'react';
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
import { Typography } from '@mui/material';
import axios from 'axios';

function ViewQuestionnairePage(props) {
  const { params } = props.match;
  const [info, setInfo] = React.useState(false);
  const [statistics, setStatistics] = React.useState(false);
  const [Q, setQ] = React.useState({
    "questionnaireID": "",
    "questionnaireTitle": "",
    "keywords": [],
    "questions": []
  });

  const handleInfoClick = () => {
    setInfo(!info);
    setStatistics(false);
  };

  const handleStatisticsClick = () => {
    setStatistics(!statistics);
    setInfo(false);
  };

  axios
      .get(
          `/questionnaire/${params.questionnaireID}`,
          { crossdomain: true }
      )
      .then((response) => {
        setQ(response.data.questionnaire);
      });

  return (
    <Container maxWidth="md" style={{ marginTop: '80px', marginBottom: '80px'}}>
      <Typography variant="h4" gutterBottom>
          { Q.questionnaireTitle }
      </Typography>
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
              <List component="div" disablePadding>
                <ListItemButton>
                  <ListItemText primary="Starred" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default ViewQuestionnairePage