import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';


function Question(props) {
    const [answer, setAnswer] = useState('');
    const handleChange = (event) => {
        setAnswer(event.target.value);
    };
    const Options = props.options.map((option) =>
        <FormControlLabel value={option.optID} control={<Radio />} label={option.opttxt} />
    );

    return (
       <>
            <Container maxWidth="sm" style={{ marginTop: '100px' }}>
                <h2>{ props.qtext }</h2>
                <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue=''
                        name="radio-buttons-group"
                        onChange={handleChange}
                    >
                    { Options }
                    </RadioGroup>
                </FormControl>
                <div>
                    <Button variant="contained" sx={{ mt: 3 }}>Next</Button>
                </div>
            </Container>        
        </>
    );
}

export default Question;