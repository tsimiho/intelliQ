import React from 'react'
import QExample from '../QExample';
import Question from '../Question';

function QuestionPage(props) {
  const Q = QExample();
  const { params } = props.match;
  const question = Q.questions.find((q) => q.qID == params.questionID);;

  return (
        <Question 
          qID={question.qID}
          qtext={question.qtext} 
          options={ question.options } 
          required={ question.required } 
          type={ question.type } 
        />
  );
}

export default QuestionPage