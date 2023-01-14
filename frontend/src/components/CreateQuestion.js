import React, {useState} from 'react'
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';

function CreateQuestion(props) {
  const [qtext, setQtext] = useState('');
  const [type, setType] = useState('question');
  const [answertype, setAnswertype] = useState('multi');
  const [required, setRequired] = useState('TRUE');
  const [number, setNumber] = useState(2);
  const [countCheck, setCountCheck] = useState(0);
  const [nextIfText, setNextIfText] = useState('-');
  const [options, setOptions] = useState([
    { optID: 1, opttxt: '', nextqID: '-' },
    { optID: 2, opttxt: '', nextqID: '-' }
  ]);

  const ChangeQtext = (event) => {
    setQtext(event.target.value);
  };

  const ChangeType = (event) => {
    setType(event.target.value);
  };

  const ChangeAnswertype = (event) => {
    setAnswertype(event.target.value);
  };

  const ChangeRequired = (event) => {
    setRequired(event.target.value);
  };

  const ChangeNextIfText = (event) => {
    setNextIfText(event.target.value);
  };

  const handleChangeOption = (id, event) => {
    const newOptions = options.map(i => {
      if(id === i.optID) {
        i[event.target.name] = event.target.value
      }
      return i;
    })
    
    setOptions(newOptions);
  }

  const handleAddOption = () => {
    setOptions([...options, { optID:number+1 ,opttxt: '', nextqID: '-' }]);
    setNumber(number+1);
  }

  const handleRemoveOption = id => {
    const values  = [...options];
    values.splice(values.findIndex(value => value.optID === id), 1);
    setOptions(values.map(i => {
      if (i.optID >= id) {
        i['optID'] = i.optID - 1;
      }  
      return i;
    }));
    setNumber(number-1);
  }

  const findNext = id => {
    let L = ['-'];
    for (let i = id+1; i <= props.number; i++) {
      L.push(String(i));
    }
    return L.map(i => ( 
         <MenuItem value={i}>{i}</MenuItem>
        )
      );
  }

  let UpdatedOptions = options.map(i => {
    if(i.nextqID > String(props.number)) {
      i['nextqID'] = '-'
    }
    return i;
  }) 

  if (countCheck < props.check) { 
    setOptions(UpdatedOptions);
    setCountCheck(countCheck+1);
  }

  if(props.qID === props.countQuestions) {
    props.setFinalQuestions([...props.finalQuestions, { 
      qID:props.qID , qtext:qtext , required:required, type:type, 
      options:(answertype === 'multi' ? options: {optID: 1, opttxt: "<open string>",nextqID:nextIfText }) 
    }]);
      props.setcountQuestions(props.countQuestions+1);
  }

  return (
    <>
        <Box sx={{ mt: 3, width: 640 }}>
            <Paper sx={{ p:2 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" gutterBottom>
                      {`Ερώτηση ${props.qID}`}
                  </Typography> 
                  <IconButton disabled={(props.qID < props.number)} color="primary" sx={{ mr: 2 }} 
                  onClick={() => {props.handleRemoveQuestion(props.qID)}}
                  >
                    <CancelIcon sx={{ fontSize: 35 }}/>
                  </IconButton>                 
                </Stack>
                <FormControl fullWidth>
                  <TextField 
                      required 
                      id="outlined-required" 
                      label="Κείμενο ερώτησης"
                      value={qtext}
                      onChange={ChangeQtext}
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
                            value={type}
                            label="Τύπος ερώτησης"
                            onChange={ChangeType}
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
                            value={answertype}
                            label="Είδος απάντησης"
                            onChange={ChangeAnswertype}
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
                            value={required}
                            label="Υποχρεωτική"
                            onChange={ChangeRequired}
                            sx={{ width: 190 }}
                            >
                            <MenuItem value="TRUE">Ναι</MenuItem>
                            <MenuItem value="FALSE">Όχι</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                </Box>
                { answertype === 'text' ?
                (<Stack direction="row" justifyContent="flex-start" alignItems="center" sx={{ mt: 2 }}>
                  <Typography variant="h6">
                      Επόμενη Ερώτηση : 
                  </Typography>
                  <FormControl sx={{ ml: 2 }}>
                      <InputLabel id="demo-simple-select-label"></InputLabel>
                      <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="nextqID"
                      value={nextIfText}
                      label=""
                      onChange={ChangeNextIfText}
                      sx={{ width: 120 }}
                      >
                      {findNext(props.qID)}
                      </Select>
                  </FormControl>
                </Stack>) : (
                <Box sx={{ mt: 2 }} fullWidth>
                  <Paper sx={{ p:2 }}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant="h6">
                            Επιλογές
                        </Typography>
                        <IconButton color="primary" onClick={handleAddOption}>
                          <AddCircleIcon sx={{ fontSize: 35 }}/>
                        </IconButton>
                      </Stack>
                      { options.map(option => (
                        <Stack key={option.optID} direction="row" 
                        justifyContent="space-between" alignItems="center" 
                        sx={{ mt: option.optID>1 ? 1 : 0 }} fullWidth
                        >
                          <FormControl >
                            <TextField 
                                required 
                                id="outlined-required"
                                name="opttxt" 
                                label={`Επιλογή ${option.optID}`}
                                multiline
                                value={option.opttxt}
                                onChange={event => handleChangeOption(option.optID, event)}
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
                              onChange={event => handleChangeOption(option.optID, event)}
                              sx={{ width: 130 }}
                              >
                              {findNext(props.qID)}
                              </Select>
                          </FormControl>
                          <IconButton color="primary" sx={{ mt: 0.5 }} onClick={() => handleRemoveOption(option.optID)}>
                            <DeleteIcon sx={{ fontSize: 35 }}/>
                          </IconButton>
                        </Stack> 
                      ))}                                                                
                  </Paper>                      
                </Box>)}
            </Paper>                      
        </Box>       
    </>    
  )
}

export default CreateQuestion