import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Redirect } from 'react-router-dom';
import axios from "axios";

function QuestionPage2(props) {
    const { params } = props.match;
    const [question, setQuestion] = useState(
    {
        questionnaireID: "",
        qID: "",
        qtext: "",
        required: true,
        type: "",
        options: [{nextqID: ''}],
    });
    const [questionnaireTitle, setQuestionnaireTitle] = useState('');
    const [answer, setAnswer] = useState("");
    const [check, setCheck] = useState(true);
    const [stat, setStat] = React.useState('');
    const [completed, setCompleted] = useState(false);

    const handleChange = (event) => {
        setAnswer(event.target.value);
    };
    function MultiOptions() {
        return (
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue=""
                name="radio-buttons-group"
                onChange={handleChange}
            >
                {question.options.map((option) => (
                    <FormControlLabel
                        key={option.optID}
                        value={option.optID}
                        control={<Radio />}
                        label={option.opttxt}
                    />
                ))}
            </RadioGroup>
        );
    }
    function TextOption() {
        return (
            <TextField
                id="outlined-multiline-flexible"
                label=""
                multiline
                maxRows={4}
                onChange={handleChange}
                sx={{ mt: 2, width: 400 }}
            />
        );
    }
    function Submit () {
        let option = (
            question.options.length === 1 ? 
            question.options[0] :
            question.options.find((o) => o.optID === answer));
        let ID = question.options.length === 1 ? 'TXT' : option.optID;
        axios
            .post(
                `/doanswer/${params.questionnaireID}/${question.qID}/${params.session}/${ID}`, 
                {'answer': answer}
            );
        if (option.nextqID === '-') {
            setCompleted(true);
        }
        else {
            axios
            .get(
                `/question/${params.questionnaireID}/${option.nextqID}`,
                { crossdomain: true }
            )
            .then((response) => {
                setQuestion(response.data);
                setAnswer('');
            })
            .catch((error) => {
                setStat(error.response.status);
            }); 
        }         
    }
    function MyButton() {
        return question.required === "TRUE" && answer === "" ? (
            <Button variant="contained" sx={{ mt: 3 }} disabled>
                Next
            </Button>
        ) : (
            <Button
                onClick={Submit}
                variant="contained"
                sx={{ mt: 3 }}
            >
                Next
            </Button>
        );
    }

    if (check) {
        axios
            .get(
                `/question/${params.questionnaireID}/P00`,
                { crossdomain: true }
            )
            .then((response) => {
                setQuestion(response.data);
                setCheck(false);
            })
            .catch((error) => {
                setStat(error.response.status);
            });
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
    }   

    if (stat !== '') {
        return (
            <Redirect to={`/error/${stat}`} />
        )
    }
    if (completed) {
        return (
            <Redirect to={`/questionnaire_completed/${params.questionnaireID}/${params.session}`} />
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
                            <Typography variant="h4">
                                {questionnaireTitle}
                            </Typography>
                            <Typography variant="h5" style={{ marginTop: '30px', marginBottom: '10px'}}>
                                {question.qtext}
                            </Typography>
                            <FormControl>
                                {question.options.length === 1
                                    ? TextOption()
                                    : MultiOptions()}
                            </FormControl>
                            <div>{MyButton()}</div>
                        </Stack>
                    </Table>
                </TableContainer>
        </Container>
    );
}

export default QuestionPage2;
