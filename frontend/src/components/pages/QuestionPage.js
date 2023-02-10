import React, { useState } from "react";
// import QExample from "../QExample";
import Question from "../Question";
// import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";

function QuestionPage(props) {
    const [question, setQuestion] = useState({
        qtext: "",
        require: true,
        qtype: "",
        options: [],
        _id: "",
    });
    // const Q = QExample();
    const { params } = props.match;
    // const url = `/intelliq_api/question/${params.questionnaireID}/${params.questionID}`;

    // const question = Q.questions.find((q) => q.qID === params.questionID);
    console.log("hello");

    console.log(
        `http://localhost:9103/intelliq_api/question/${params.questionnaireID}/${params.questionID}`
    );

    axios
        .get(
            `http://localhost:9103/intelliq_api/question/${params.questionnaireID}/${params.questionID}`,
            { crossdomain: true }
        )
        .then((response) => {
            setQuestion(response.data.question);
            // console.log(response.data);
        });

    console.log(question);

    return (
        <Container maxWidth="md" style={{ marginTop: "80px" }}>
            {/* <Typography variant="h4" gutterBottom>
                {Q.questionnaireTitle}
            </Typography> */}
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
