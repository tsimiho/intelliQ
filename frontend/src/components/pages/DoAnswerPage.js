import React from 'react'
import { Redirect } from 'react-router-dom';
import QExample from '../QExample';

function DoAnswerPage(props) {
    const Q = QExample();
    const { params } = props.match;
    let questionID = params.questionID;
    let questionnaireID = params.questionnaireID;
    // let session =  params.optionID;
    let optionID =  params.optionID;
    let question = Q.questions.find((q) => q.qID == questionID);
    let option = question.options.find((o) => o.optID == optionID);

  return (
        <Redirect to={`/question/${questionnaireID}/${option.nextqID}`}/>
  )
}

export default DoAnswerPage