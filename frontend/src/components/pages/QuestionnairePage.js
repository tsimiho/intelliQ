import React from 'react'
import Questionnaire from '../Questionnaire';
import QExample from '../QExample';

function QuestionnairePage() {
    const Q = QExample();
  
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