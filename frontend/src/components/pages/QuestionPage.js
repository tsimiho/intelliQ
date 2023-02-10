import React from "react";
import QExample from "../QExample";
import Question from "../Question";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import request from "request";

function QuestionPage(props) {
    const Q = QExample();
    const { params } = props.match;
    //   const question = Q.questions.find((q) => q.qID === params.questionID);
    const question = request.get(
        `http://localhost:9103/intelliq_api/question/${params.questionnaireID}/${params.questionID}`
    );

    return (
        <Container maxWidth="md" style={{ marginTop: "80px" }}>
            <Typography variant="h4" gutterBottom>
                {Q.questionnaireTitle}
            </Typography>
            <Question
                qID={question.qID}
                qtext={question.qtext}
                options={question.options}
                required={question.required}
                type={question.type}
            />
        </Container>
    );
}

export default QuestionPage;
