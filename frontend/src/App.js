import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MenuAppBar from './components/MenuAppBar';
import { CssBaseline } from '@mui/material';
import QuestionnairePage from './components/pages/QuestionnairePage';
import QuestionPage from './components/pages/QuestionPage';
import Home from './components//pages/Home';
import DoAnswerPage from './components/pages/DoAnswerPage';

export default function App() {
  return (    
    <>
      <Router>
        <CssBaseline />
        <MenuAppBar />   
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/questionnaire/:id" component={QuestionnairePage} /> 
          <Route path="/question/:questionnaireID/:questionID" component={QuestionPage} /> 
          <Route path="/doanswer/:questionnaireID/:questionID/:session/:optionID" component={DoAnswerPage} /> 
        </Switch>    
      </Router>      
    </>  
  );
}
