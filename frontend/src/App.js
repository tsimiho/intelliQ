import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MenuAppBar from './components/MenuAppBar';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import QuestionnairePage from './components/pages/QuestionnairePage';
//import QuestionPage from './components/pages/QuestionPage';
import Home from './components//pages/Home';
//import DoAnswerPage from './components/pages/DoAnswerPage';
import GetQuestionAnswersPage from './components/pages/GetQuestionAnswersPage'; 
import AdminPage from './components/pages/AdminPage';
import CreateQuestionnairePage2 from './components/pages/CreateQuestionnairePage2';
import ViewQuestionnairePage from './components/pages/ViewQuestionnairePage';
import AnswerQuestionnairePage from './components/pages/AnswerQuestionnairePage';
import QuestionPage2 from './components/pages/QuestionPage2';
import LogIn from './components/pages/LoginPage';
import ErrorPage from './components/pages/ErrorPage';
import axios from 'axios';

const lightTheme = createTheme({
  palette: {
    background: {
      default: "#eceff1"
    },
    mode: 'light',
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


export default function App() {
  (function() {
      const token = localStorage.getItem('token');
      if (token) {
          axios.defaults.headers.common['X-OBSERVATORY-AUTH'] = token;
      } else {
          axios.defaults.headers.common['X-OBSERVATORY-AUTH'] = null;
      }
  })();

  return (    
    <>
      <Router>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <MenuAppBar />   
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/error/:status" component={ErrorPage} />
            <Route exact path="/answer_questionnaire/:questionnaireID/:session" component={QuestionPage2} />
            <Route exact path="/answer_questionnaire/:questionnaireID" component={AnswerQuestionnairePage} />
            <Route exact path="/questionnaire/:questionnaireID" component={QuestionnairePage} /> 
            {/* <Route exact path="/question/:questionnaireID/:questionID/:session" component={QuestionPage} />   */}
            {/* <Route exact path="/doanswer/:questionnaireID/:questionID/:session/:nextqID/:optID?" component={DoAnswerPage} />  */}
            <Route exact path="/getquestionanswers/:questionnaireID/:questionID" component={GetQuestionAnswersPage} />
            <Route exact path="/admin" component={AdminPage}  />
            <Route exact path="/admin/create_questionnaire" component={CreateQuestionnairePage2} />
            <Route exact path="/admin/view_questionnaire/:questionnaireID" component={ViewQuestionnairePage} />
            <Route path="/" component={ErrorPage}/>
          </Switch>
        </ThemeProvider>            
      </Router>      
    </>  
  );
}

