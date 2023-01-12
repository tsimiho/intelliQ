import React from 'react'
import GetQuestionAnswers from '../GetQuestionAnswers'

const D = {
    "List" : [
        {
            "session":"ABCD",
            "ans":"A2"
        },
        {
            "session":"KLMN",
            "ans":"A1"
        },
        {
            "session":"OPIY",
            "ans":"A3"
        },
        {
            "session":"SDFG",
            "ans":"A1"
        }
    ]
}

function GetQuestionAnswersPage() {
  return (
    <GetQuestionAnswers Hist={D} />
  )
}

export default GetQuestionAnswersPage