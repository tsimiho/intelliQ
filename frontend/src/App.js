import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MenuAppBar from './components/MenuAppBar';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import QuestionnairePage from './components/pages/QuestionnairePage';
import Home from './components//pages/Home';
import GetQuestionAnswersPage from './components/pages/GetQuestionAnswersPage'; 
import AdminPage from './components/pages/AdminPage';
import CreateQuestionnairePage2 from './components/pages/CreateQuestionnairePage2';
import ViewQuestionnairePage from './components/pages/ViewQuestionnairePage';
import AnswerQuestionnairePage from './components/pages/AnswerQuestionnairePage';
import QuestionPage2 from './components/pages/QuestionPage2';
import LogIn from './components/pages/LoginPage';
import ErrorPage from './components/pages/ErrorPage';
import ErrorPageHelp from './components/pages/ErrorPageHelp';
import QuestionnaireCompletedPage from './components/pages/QuestionnaireCompletedPage';
import moment from 'moment/moment';
import axios from 'axios';

const lightTheme = createTheme({
  palette: {
    background: {
      default: "#eceff1"
    },
    mode: 'light',
    primary: {
      main: '#009688',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#bdbdbd',
    },
  },
});

export default function App() {
  const [theme, setTheme] = React.useState(
    localStorage.getItem('theme') || 'light'
  );

  React.useEffect(() => {
      localStorage.setItem('theme', theme);
  }, [theme]);

  (function() {
        const token = localStorage.getItem('token');
        if (token) {
          if (moment().isBefore(moment(JSON.parse(localStorage.getItem('expires'))))) {
            axios.defaults.headers.common['X-OBSERVATORY-AUTH'] = token;
          }
          else {
            localStorage.removeItem('token');
            localStorage.removeItem('expires');
            localStorage.removeItem('username'); 
            axios.defaults.headers.common['X-OBSERVATORY-AUTH'] = null; 
          }
        } else {
          axios.defaults.headers.common['X-OBSERVATORY-AUTH'] = null;
        }
  })();

  return (    
    <>
    <Router>
        <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
          <CssBaseline />
          <MenuAppBar theme={theme} setTheme={setTheme}/>   
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/error/:status" component={ErrorPage} />
            <Route exact path="/answer_questionnaire/:questionnaireID/:session" component={QuestionPage2} />
            <Route exact path="/answer_questionnaire/:questionnaireID" component={AnswerQuestionnairePage} />
            <Route exact path="/questionnaire_completed/:questionnaireID/:session" component={QuestionnaireCompletedPage} />
            <Route exact path="/questionnaire/:questionnaireID" component={QuestionnairePage} /> 
            <Route exact path="/getquestionanswers/:questionnaireID/:questionID" component={GetQuestionAnswersPage} />
            <Route exact path="/admin" component={AdminPage}  />
            <Route exact path="/admin/create_questionnaire" component={CreateQuestionnairePage2} />
            <Route exact path="/admin/view_questionnaire/:questionnaireID" component={ViewQuestionnairePage} />
            <Route path="/" component={ErrorPageHelp}/>
          </Switch>  
        </ThemeProvider>
      </Router>              
    </>  
  );
}

