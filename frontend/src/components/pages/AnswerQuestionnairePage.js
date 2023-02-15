import React from 'react'
import { Redirect } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";
import logo from '../../fixed_logo3.png';

function AnswerQuestionnairePage(props) {
  const { params } = props.match;
  const [session, setSession] = React.useState('');
  const [questionnaireTitle, setQuestionnaireTitle] = React.useState('');
  const [stat, setStat] = React.useState('');

  if(questionnaireTitle === '') {
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
        })
  }

  const generateRandom = () => {
    function makeid(length) {
        var result = "";
        var characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        }
        return result;
    }
    return makeid(4);
  }

  if (stat !== '') {
    return (
        <Redirect to={`/error/${stat}`} />
    )
  }

  if (session !== '') {
    window.location.href = `/answer_questionnaire/${params.questionnaireID}/${session}`;
  }

  return (
    <Container maxWidth="md" style={{ marginTop: '80px', marginBottom: '80px'}}>
        <TableContainer component={Paper} style={{ marginTop: '20px'}}>
            <Table aria-label="customized table">
                <Stack 
                direction="column" 
                justifyContent="center" 
                alignItems="center" 
                spacing={4}
                style={{ marginTop: '20px', marginBottom: '20px'}}>
                    <Typography variant="h4">
                        Welcome to intelliQ!
                    </Typography>
                    <img src={logo} alt="Logo" height={235} width={235}/>
                    <Typography variant="h4">
                        {`"${questionnaireTitle}"`}
                    </Typography>
                    <Button onClick={() => setSession(generateRandom())} variant="contained" endIcon={<SendIcon />}>
                        Answer Questionnaire
                    </Button>
                </Stack>
            </Table>
        </TableContainer>
    </Container>
  )
}

export default AnswerQuestionnairePage