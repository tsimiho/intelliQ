import React from 'react'
import axios from "axios";

function Translate(data) {
  const [text, setText] = React.useState(['']);

  axios
  .post(`https://api-free.deepl.com/v2/translate?auth_key=e1c3a0a1-75c5-a104-6799-3c06a5620a48:fx`,
    {text: data.text, target_lang: data.to},
    {headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }})
  .then(response => {
    setText(response.data.translations[0].text);
  })

  return text;
}

export default Translate