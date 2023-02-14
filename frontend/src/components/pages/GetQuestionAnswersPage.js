import React from 'react';
import GetQuestionAnswers from '../GetQuestionAnswers';
import { Redirect } from 'react-router-dom';
import axios from "axios";

function GetQuestionAnswersPage(props) {
    const { params } = props.match;
    const [answers, setAnswers] = React.useState([{
        "session":"",
        "ans":""
    }]);
    const [Q, setQ] = React.useState({
      "questionnaireID":"",
      "questionnaireTitle":"",
      "keywords":[],
      "questions":[{"qID" : "", "qtext":''}]
    });
    const [question, setQuestion] = React.useState({"qID" : "", "qtext":''});
    const [stat, setStat] = React.useState('');
    const [check, setCheck] = React.useState(true);
    
    if (check) {
      axios
      .get(
          `/getquestionanswers/${params.questionnaireID}/${params.questionID}`,
          { crossdomain: true }
      )
      .then((response) => {
          setAnswers(response.data.answers);
      }).catch((error) => {
        setStat(error.response.status);
      });
      axios
      .get(
          `/questionnaire/${params.questionnaireID}`,
          { crossdomain: true }
      )
      .then((response) => {
        setQ(response.data);
        setQuestion(response.data.questions.find((r) => r.qID === params.questionID));
        setCheck(false);
      }).catch((error) => {
        setStat(error.response.status);
      });
    }

    if (stat !== '') {
      return (
          <Redirect to={`/error/${stat}`} />
      )
    }

  return (
    <GetQuestionAnswers 
    questionnaireTitle={Q.questionnaireTitle}
    qtext={question.qtext}
    answers={answers} 
    />
  )
}

export default GetQuestionAnswersPage