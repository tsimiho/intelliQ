import React, {useState} from 'react'
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
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

function CreateQuestion() {
  const Qnumber = 1;
  const [qtext, setQtext] = React.useState('');
  const [type, setType] = React.useState('question');
  const [answertype, setAnswertype] = React.useState('text');
  const [required, setRequired] = React.useState('TRUE');
  const [number, setNumber] = React.useState(2);
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
    for (let i = id+1; i <= Qnumber; i++) {
      L.push(String(i));
    }
    return L.map(i => ( 
         <MenuItem value={i}>{i}</MenuItem>
        )
      );
  }

  return (
    <>
        <Box sx={{ mt: 5, width: 640 }}>
            <Paper sx={{ p:2 }}>
                <Typography variant="h6" gutterBottom>
                    Ερώτηση
                </Typography>
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
                              {findNext(option.optID)}
                              </Select>
                          </FormControl>
                          <IconButton color="primary" sx={{ mt: 0.5 }} onClick={() => handleRemoveOption(option.optID)}>
                            <DeleteIcon sx={{ fontSize: 35 }}/>
                          </IconButton>
                        </Stack> 
                      ))}                                                                
                  </Paper>                      
              </Box>
            </Paper>                      
        </Box>       
    </>    
  )
}

export default CreateQuestion