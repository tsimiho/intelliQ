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
    const { params } = props.match;

    axios
        .get(
            `/question/${params.questionnaireID}/${params.questionID}`,
            { crossdomain: true }
        )
        .then((response) => {
            setQuestion(response.data.question);
        });

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
