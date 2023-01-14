import React, {useState}  from 'react'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CreateQuestion from '../CreateQuestion';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import { Redirect } from 'react-router-dom';

function CreateQuestionnairePage() {
   const [title, setTitle] = useState('');
   const [keyword1, setKeyword1] = useState('');
   const [keyword2, setKeyword2] = useState('');
   const [keyword3, setKeyword3] = useState('');
   const [number, setNumber] = useState(1);
   const [check, setCheck] = useState(0);
   const [questions, setQuestions] = useState([{ qID: 1 }]);
   const [finalQuestions, setFinalQuestions] = useState([]);
   const [countQuestions, setcountQuestions] = useState(0);
   
   const ChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const ChangeKeyword1 = (event) => {
    setKeyword1(event.target.value);
  };

  const ChangeKeyword2 = (event) => {
    setKeyword2(event.target.value);
  };

  const ChangeKeyword3 = (event) => {
    setKeyword3(event.target.value);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { qID:number+1 }]);
    setNumber(number+1);
  }

  const handleRemoveQuestion = id => {
    const values  = [...questions];
    values.splice(values.findIndex(value => value.qID === id), 1);
    setQuestions(values.map(i => {
      if (i.qID >= id) {
        i['qID'] = i.qID - 1;
      }  
      return i;
    }));
    setNumber(number-1);
    setCheck(check+1);
  }

  const handleSubmit = () => {
    setcountQuestions(1);
  }

  if (countQuestions > number) {
    console.log(finalQuestions);
    setcountQuestions(0); 
    return <Redirect to="/admin"/>;   
  }

  return (
    <Container maxWidth="md" style={{ marginTop: '80px', marginBottom: '80px'}}>
        <Typography variant="h4" gutterBottom>
            Δημιουργία Ερωτηματολογίου
        </Typography>
        <Box sx={{ mt: 5 }}>
        <TextField 
            required 
            id="outlined-required" 
            label="Τίτλος ερωτηματολογίου"
            value={title}
            onChange={ChangeTitle}
            multiline
            sx={{ width: 640 }}
        />
        </Box>  
        <Box sx={{ mt: 2, width: 640  }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">
                    Λέξεις κλειδιά : 
                </Typography>
                <TextField 
                    id="outlined-required" 
                    label="Λέξι κλειδί 1"
                    value={keyword1}
                    onChange={ChangeKeyword1}
                    multiline
                    sx={{ width: 160}}
                />
                <TextField 
                    id="outlined-required" 
                    label="Λέξι κλειδί 2"
                    value={keyword2}
                    onChange={ChangeKeyword2}
                    multiline
                    sx={{ width: 160 }}
                />
                <TextField  
                    id="outlined-required" 
                    label="Λέξι κλειδί 3"
                    value={keyword3}
                    onChange={ChangeKeyword3}
                    multiline
                    sx={{ width: 160 }}
                />
            </Stack>
        </Box>      
        <Box sx={{ mt: 5 }}>
            <Typography variant="h5">
                Ερωτήσεις
            </Typography>
            { questions.map(question => (
                <CreateQuestion 
                number={number} 
                qID={question.qID}
                handleRemoveQuestion={handleRemoveQuestion}
                check={check}
                countQuestions={countQuestions}
                setcountQuestions={setcountQuestions}
                finalQuestions={finalQuestions}
                setFinalQuestions={setFinalQuestions}
                />
            ))}              
        </Box>
        <IconButton sx={{ mt: 3 }} color="primary" onClick={handleAddQuestion}>
            <AddCircleIcon sx={{ fontSize: 40 }}/>
        </IconButton>
        <Stack direction="row" justifyContent="flex-end" sx={{ width: 640 }}>
            <Button variant="contained" sx={{ mt: 1 }} onClick={handleSubmit}>Δημιουργια</Button>
        </Stack>              
    </Container> 
  )
}

export default CreateQuestionnairePage