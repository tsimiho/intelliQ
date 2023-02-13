import React from 'react'
import { Redirect } from 'react-router-dom';
import axios from 'axios';

function DoAnswerPage(props) {
    const { params } = props.match;

    axios
      .post(
          `/doanswer/${params.questionnaireID}/${params.qID}/${params.session}/${params.optID}`
      );

  return (
        <Redirect to={`/question/${params.questionnaireID}/${params.nextqID}/${params.session}`}/>
  )
}

export default DoAnswerPage