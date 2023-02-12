import React from 'react'
import Questionnaire from '../Questionnaire';
import axios from "axios";

function QuestionnairePage(props) {
    const { params } = props.match;
    const [Q, setQ] = React.useState({
      "questionnaireID": "",
      "questionnaireTitle": "",
      "keywords": [],
      "questions": []
    });

    axios
        .get(
            `/questionnaire/${params.questionnaireID}`,
            { crossdomain: true }
        )
        .then((response) => {
          setQ(response.data);
        });

    return (
        // Κανονικά εδώ παίρνει το σωστό questionnaire
        <Questionnaire
        questionnaireID={Q.questionnaireID}
        questionnaireTitle={Q.questionnaireTitle}
        keywords={Q.keywords}
        questions={Q.questions}
        />
  )
}

export default QuestionnairePage