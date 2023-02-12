import React from 'react'
import { Redirect } from 'react-router-dom';
import QExample from '../QExample';
import axios from 'axios';

function DoAnswerPage(props) {
    // const Q = QExample();
    const { params } = props.match;
    // let questionID = params.questionID;
    // let questionnaireID = params.questionnaireID;
    // // let session =  params.optionID;
    // let optionID =  params.optionID;
    // let question = Q.questions.find((q) => q.qID === questionID);
    // let option = (
    //   question.options.length === 1 ? 
    //   question.options[0] :
    //   question.options.find((o) => o.optID === optionID));
    // axios
    //   .post(
    //       `/doanswer/${params.questionnaireID}/${params.qID}/${params.session}/${params.optID}`,
    //       { crossdomain: true }
    //   );

  return (
        <Redirect to={`/question/${params.questionnaireID}/${params.nextqID}/${params.session}`}/>
  )
}

export default DoAnswerPage