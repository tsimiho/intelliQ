import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
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
        console.log(params.questionnaireID,question.qID,params.session,option.optID);
        axios
            .post(
                `/doanswer/${params.questionnaireID}/${question.qID}/${params.session}/${option.optID}`
            );
        axios
            .get(
                `/question/${params.questionnaireID}/${option.nextqID}`,
                { crossdomain: true }
            )
            .then((response) => {
                setQuestion(response.data);
            });           
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
            });
            axios
            .get(
                `/questionnaire/${params.questionnaireID}`,
                { crossdomain: true }
            )
            .then((response) => {
                setQuestionnaireTitle(response.data.questionnaireTitle);
            });
    }   


    return (
        <Container maxWidth="md" style={{ marginTop: "80px" }}>
            <Typography variant="h4" gutterBottom>
                {questionnaireTitle}
            </Typography>
            <Typography variant="h5" style={{ marginTop: "30px" }} gutterBottom>
                {question.qtext}
            </Typography>
            <FormControl>
                {question.options.length === 1
                    ? TextOption()
                    : MultiOptions()}
            </FormControl>
            <div>{MyButton()}</div>
        </Container>
    );
}

export default QuestionPage2;
