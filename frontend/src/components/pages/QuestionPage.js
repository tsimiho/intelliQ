import React, { useState } from "react";
import Question from "../Question";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";

function QuestionPage(props) {
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
    const { params } = props.match;

    axios
        .get(
            `/question/${params.questionnaireID}/${params.questionID}`,
            { crossdomain: true }
        )
        .then((response) => {
            setQuestion(response.data);
        });

    axios
        .get(
            `/questionnaire/${params.questionnaireID}`,
            { crossdomain: true }
        )
        .then((response) => {
            setQuestionnaireTitle(response.data.questionnaireTitle);
        });


    return (
        <Container maxWidth="md" style={{ marginTop: "80px" }}>
            <Typography variant="h4" gutterBottom>
                {questionnaireTitle}
            </Typography>
            <Question
                questionnaireID={question.questionnaireID}
                qID={question.qID}
                qtext={question.qtext}
                options={question.options}
                required={question.required}
                session={params.session}
            />
        </Container>
    );
}

export default QuestionPage;
