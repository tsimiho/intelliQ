import React from 'react'
import axios from "axios";

function T(text) {
  //const [newtext, setNewText] = React.useState(text);
  let newtext = '';
  const language = localStorage.getItem('language');

    axios
    .post(`https://api-free.deepl.com/v2/translate?auth_key=e1c3a0a1-75c5-a104-6799-3c06a5620a48:fx`,
      {text: text, target_lang: language},
      {headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }})
    .then(response => {
      //setNewText(response.data.translations[0].text);
      return  response.data.translations[0].text;
    })   

  //return newtext;
}

export default T