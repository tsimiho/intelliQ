import React from 'react';
import GetQuestionAnswers from '../GetQuestionAnswers';
import axios from "axios";

function GetQuestionAnswersPage(props) {
    const { params } = props.match;
    const [answers, setAnswers] = React.useState([{
        "session":"",
        "ans":""
    }]);
    axios
    .get(
        `/getquestionanswers/${params.questionnaireID}/${params.qID}`,
        { crossdomain: true }
    )
    .then((response) => {
        setAnswers(response.data.answers);
    });

    
  return (
    <GetQuestionAnswers answers={answers} />
  )
}

export default GetQuestionAnswersPage