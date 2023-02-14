import React from 'react'
import Questionnaire from '../Questionnaire';
import { Redirect } from 'react-router-dom';
import axios from "axios";

function QuestionnairePage(props) {
    const { params } = props.match;
    const [Q, setQ] = React.useState({
      "questionnaireID": "",
      "questionnaireTitle": "",
      "keywords": [],
      "questions": []
    });
    const [stat, setStat] = React.useState('');

    axios
        .get(
            `/questionnaire/${params.questionnaireID}`,
            { crossdomain: true }
        )
        .then((response) => {
          setQ(response.data);
        }).catch((error) => {
          setStat(error.response.status);
        });

    if (stat !== '') {
      return (
          <Redirect to={`/error/${stat}`} />
      )
    }

    return (
        <Questionnaire
        questionnaireID={Q.questionnaireID}
        questionnaireTitle={Q.questionnaireTitle}
        keywords={Q.keywords}
        questions={Q.questions}
        />
  )
}

export default QuestionnairePage