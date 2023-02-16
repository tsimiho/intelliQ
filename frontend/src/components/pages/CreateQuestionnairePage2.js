import React, {useState} from 'react'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import axios from "axios";

function CreateQuestionnairePage2() {
  const [title, setTitle] = useState('');
  const [keyword1, setKeyword1] = useState('');
  const [keyword2, setKeyword2] = useState('');
  const [keyword3, setKeyword3] = useState('');
  const [questions, setQuestions] = useState([{ 
        qID:1 , qtext:'' , required:'TRUE', type:'question', 
        answertype:'multi', nextIfText:'-',
        options: [{optID: 1, opttxt: "",nextqID:'-' },
        {optID: 2, opttxt: "",nextqID:'-' }] 
    }]
  ); 

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
    setQuestions ([...questions, { 
      qID:questions.length+1 , qtext:'' , required:'TRUE', type:'question', 
      answertype:'multi', nextIfText:'-',
      options: [{optID: 1, opttxt: "",nextqID:'-' },
      {optID: 2, opttxt: "",nextqID:'-' }] 
    }]);
  }

  const handleRemoveQuestion = (qID) => {
    const values  = [...questions];
    values.splice(values.findIndex(value => value.qID === qID), 1);
    setQuestions(values.map(q => {
        if (q.qID < qID) {
            const O = q.options.map(o => {
                if (o.nextqID >= String(qID)) {
                    o['nextqID'] = (o.nextqID === String(qID)) ? 
                    '-' : String(parseInt(o['nextqID'])-1); 
                }
                return o;
            });          
            q['options'] = O; 
            if (q.nextIfText >= String(qID)) {
                q['nextIfText'] = (q.nextIfText === String(qID)) ?
                '-' : String(parseInt(q.nextIfText)-1);
            } 
        }
        else {
            q['qID'] -= 1;
        }
        return q;
    }));
  }

  function ChangeField(id, event) {
    const values = [...questions];
    setQuestions(values.map(q => {
        if (q.qID === id) {
            q[event.target.name] = event.target.value
        }
        return q;
    }))    
  }

  const handleChangeOption = (qID, optID, event) => {
    const values = [...questions];
    setQuestions(values.map(q => {
        if (q.qID === qID) {
            const v = q.options.map(o => {
                if (o.optID === optID) {
                    o[event.target.name] = event.target.value
                }
                return o;
            });
            q['options'] = v;
        }
        return q;
    })) 
  }

    function handleAddOption(qID) {
        const values = [...questions];
        setQuestions(values.map(q => {
            if (q.qID === qID) {
                const v = [...q.options, 
                    {optID: q.options.length+1, opttxt: "",nextqID:'-' }];
                q['options'] = v;
            }
            return q;
        })) 
    }

  const handleRemoveOption = (qID, optID) => {
    const values = [...questions];
    setQuestions(values.map(q => {
        if (q.qID === qID) {
            const v  = [...q.options];
            v.splice(v.findIndex(value => value.optID === optID), 1);
            q['options'] = v.map(o => {
                if (o.optID > optID) {
                    o['optID'] -= 1;
                }
                return o;
            });
        }
        return q;
    }))
  }

  const findNext = qID => {
    let L = ['-'];
    for (let i = qID+1; i <= questions.length; i++) {
      L.push(String(i));
    }
    return L.map(i => ( 
         <MenuItem value={i}>{i}</MenuItem>
        )
      );
  }

  const handleSubmit = () => {
    const Quest = {
      'questionnaireID': 'QQ000',
      'questionnaireTitle' : title,
      'keywords': [keyword1, keyword2, keyword3],
      'questions': [...questions].map(q => {
        const qID = q.qID < 10 ? `Q0${q.qID}` : `Q${q.qID}`;
        return {
          'qID': qID,
          'qtext' : q.qtext,
          'required': q.required,
          'type': q.type,
          'options' : q.answertype === 'multi' ? 
           [...q.options].map(o => {
            return {
              'optID': `${qID}A${o.optID}`,
              'opttxt': o.opttxt,
              'nextqID': o.nextqID === '-' ? '-' : 
                (parseInt(o.nextqID) < 10 ? `Q0${parseInt(o.nextqID)}` : `Q${parseInt(o.nextqID)}`)
            }
          }) : [{
            "optID": `${qID}TXT`,
            "opttxt": "<open string>",
            "nextqID": q.nextIfText === '-' ? '-' : 
            (parseInt(q.nextIfText) < 10 ? `Q0${parseInt(q.nextIfText)}` : `Q${parseInt(q.nextIfText)}`)
          }]
        };
      }),
      'sessions': []
    }
    axios
      .post(
          `/createquestionnaire`, 
          Quest
      );
      
    //console.log(Quest);
  }

  return (
    <Container maxWidth="md" style={{ marginTop: '80px', marginBottom: '80px'}} sx={{ width: 760 }}>
      <TableContainer component={Paper} style={{ marginTop: '20px'}}>
          <Table aria-label="customized table">
              <Stack 
              direction="column" 
              justifyContent="center" 
              alignItems="left" 
              //spacing={2}
              style={{ padding: '30px'}}>
              <Typography variant="h4" gutterBottom>
                  Δημιουργία Ερωτηματολογίου
              </Typography>
              <Box sx={{ mt: 5 }}>
              <TextField 
                  //required 
                  id="outlined-required" 
                  label="Τίτλος ερωτηματολογίου"
                  value={title}
                  onChange={event => ChangeTitle(event)}
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
                          //required
                          id="outlined-required" 
                          label="Λέξι κλειδί 1"
                          value={keyword1}
                          onChange={event => ChangeKeyword1(event)}
                          multiline
                          sx={{ width: 160}}
                      />
                      <TextField 
                          //required
                          id="outlined-required" 
                          label="Λέξι κλειδί 2"
                          value={keyword2}
                          onChange={event => ChangeKeyword2(event)}
                          multiline
                          sx={{ width: 160 }}
                      />
                      <TextField  
                          //required
                          id="outlined-required" 
                          label="Λέξι κλειδί 3"
                          value={keyword3}
                          onChange={event => ChangeKeyword3(event)}
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
                      <Box sx={{ mt: 3, width: 640 }}>
                      <Paper sx={{ p:2 }}>
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="h6" gutterBottom>
                                {`Ερώτηση ${question.qID}`}
                            </Typography> 
                            <IconButton color="primary" sx={{ mr: 2 }} 
                            onClick={() => handleRemoveQuestion(question.qID)}
                            >
                              <CancelIcon sx={{ fontSize: 35 }}/>
                            </IconButton>                 
                          </Stack>
                          <FormControl fullWidth>
                            <TextField 
                                //required 
                                id="outlined-required" 
                                label="Κείμενο ερώτησης"
                                name="qtext"
                                value={question.qtext}
                                onChange={event => ChangeField(question.qID, event)}
                                multiline
                                sx={{ mt:1 }}
                            />
                          </FormControl>
                          <Box sx={{ mt: 4 }} fullWidth>
                              <Stack direction="row" justifyContent="space-between" alignItems="center">
                                  <FormControl>
                                      <InputLabel id="demo-simple-select-label">Τύπος ερώτησης</InputLabel>
                                      <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      name="type"
                                      value={question.type}
                                      label="Τύπος ερώτησης"
                                      onChange={event => ChangeField(question.qID, event)}
                                      sx={{ width: 190 }}
                                      >
                                      <MenuItem value="question">Ερώτηση</MenuItem>
                                      <MenuItem value="profile">Προφίλ</MenuItem>
                                      </Select>
                                  </FormControl>
                                  <FormControl>
                                      <InputLabel id="demo-simple-select-label">Είδος απάντησης</InputLabel>
                                      <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      name="answertype"
                                      value={question.answertype}
                                      label="Είδος απάντησης"
                                      onChange={event => ChangeField(question.qID, event)}
                                      sx={{ width: 190 }}
                                      >
                                      <MenuItem value="text">Κείμενο</MenuItem>
                                      <MenuItem value="multi">Επιλογή</MenuItem>
                                      </Select>
                                  </FormControl>
                                  <FormControl>
                                      <InputLabel id="demo-simple-select-label">Υποχρεωτική</InputLabel>
                                      <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      name="required"
                                      value={question.required}
                                      label="Υποχρεωτική"
                                      onChange={event =>ChangeField(question.qID, event)}
                                      sx={{ width: 190 }}
                                      >
                                      <MenuItem value="TRUE">Ναι</MenuItem>
                                      <MenuItem value="FALSE">Όχι</MenuItem>
                                      </Select>
                                  </FormControl>
                              </Stack>
                          </Box>
                          { question.answertype === 'text' ?
                          (<Stack direction="row" justifyContent="flex-start" alignItems="center" sx={{ mt: 2 }}>
                            <Typography variant="h6">
                                Επόμενη Ερώτηση : 
                            </Typography>
                            <FormControl sx={{ ml: 2 }}>
                                <InputLabel id="demo-simple-select-label"></InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="nextIfText"
                                value={question.nextIfText}
                                label=""
                                onChange={event => ChangeField(question.qID,event)}
                                sx={{ width: 120 }}
                                >
                                {findNext(question.qID)}
                                </Select>
                            </FormControl>
                          </Stack>) : (
                          <Box sx={{ mt: 2 }} fullWidth>
                            <Paper sx={{ p:2 }}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                  <Typography variant="h6">
                                      Επιλογές
                                  </Typography>
                                  <IconButton color="primary" onClick={() => handleAddOption(question.qID)}>
                                    <AddCircleIcon sx={{ fontSize: 35 }}/>
                                  </IconButton>
                                </Stack>
                                { question.options.map(option => (
                                  <Stack key={option.optID} direction="row" 
                                  justifyContent="space-between" alignItems="center" 
                                  sx={{ mt: option.optID>1 ? 1 : 0 }} fullWidth
                                  >
                                    <FormControl >
                                      <TextField 
                                          //required 
                                          id="outlined-required"
                                          name="opttxt" 
                                          label={`Επιλογή ${option.optID}`}
                                          multiline
                                          value={option.opttxt}
                                          onChange={event => handleChangeOption(question.qID, option.optID, event)}
                                          sx={{ mt:1, width: 370 }}
                                      />
                                    </FormControl> 
                                    <FormControl sx={{ mt: 1 }}>
                                        <InputLabel id="demo-simple-select-label">Επόμενη Ερώτηση</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="nextqID"
                                        value={option.nextqID}
                                        label="Επόμενη Ερώτηση"
                                        onChange={event => handleChangeOption(question.qID, option.optID, event)}
                                        sx={{ width: 130 }}
                                        >
                                        {findNext(question.qID)}
                                        </Select>
                                    </FormControl>
                                    <IconButton color="primary" sx={{ mt: 0.5 }} onClick={() => handleRemoveOption(question.qID, option.optID)}>
                                      <DeleteIcon sx={{ fontSize: 35 }}/>
                                    </IconButton>
                                  </Stack> 
                                ))}                                                                
                            </Paper>                      
                          </Box>)}
                      </Paper>                      
                  </Box>
                  ))}
              </Box>
              <Stack direction="row" allignment='left'>
                <IconButton sx={{ mt: 2 }} color="primary" onClick={handleAddQuestion}>
                    <AddCircleIcon sx={{ fontSize: 40 }}/>
                </IconButton>
              </Stack>
              <Stack direction="row" justifyContent="flex-end" sx={{ width: 640 }}>
                  <Button onClick={handleSubmit} variant="contained" sx={{ mt: 1 }} >Δημιουργια</Button>
              </Stack>   
            </Stack>
          </Table>
        </TableContainer>           
    </Container> 
  )
}

export default CreateQuestionnairePage2