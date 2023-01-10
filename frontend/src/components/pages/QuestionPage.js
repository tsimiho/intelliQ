import React from 'react'
import QExample from '../QExample';
import Question from '../Question';

function QuestionPage() {
  const Q = QExample();

  return (
    <Question qtext={Q.questions[2].qtext} options={ Q.questions[2].options } />
  );
}

export default QuestionPage