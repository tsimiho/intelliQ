import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { Redirect } from 'react-router-dom';
import axios from 'axios';

function Question(props) {
    const [answer, setAnswer] = useState("");
    const [currOption, setCurrOption] = useState({nextqID: ''});
    const handleChange = (event) => {
        setAnswer(event.target.value);
        setCurrOption(
            props.options.length === 1 ? 
            props.options[0] :
            props.options.find((o) => o.optID === event.target.value)
        );
    };
    function MultiOptions(props) {
        return (
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue=""
                name="radio-buttons-group"
                onChange={handleChange}
            >
                {props.options.map((option) => (
                    <FormControlLabel
                        key={option.optID}
                        value={option.optID}
                        control={<Radio />}
                        label={option.opttxt}
                    />
                ))}
            </RadioGroup>
        );
    }
    function TextOption() {
        return (
            <TextField
                id="outlined-multiline-flexible"
                label=""
                multiline
                maxRows={4}
                onChange={handleChange}
                sx={{ mt: 2, width: 400 }}
            />
        );
    }
    function Submit () {
        console.log('hello');
        let option = (
            props.options.length === 1 ? 
            props.options[0] :
            props.options.find((o) => o.optID === answer));
        axios
            .post(
                `/doanswer/${props.questionnaireID}/${props.qID}/${props.session}/${option.optID}`,
                { crossdomain: true }
            );
        return (
            <Redirect to={`/question/${props.questionnaireID}/${option.nextqID}/${props.session}`}/>
        )        
    }
    function MyButton() {
        return props.required === "TRUE" && answer === "" ? (
            <Button variant="contained" sx={{ mt: 3 }} disabled>
                Next
            </Button>
        ) : (
            <Button
                href={`/doanswer/${props.questionnaireID}/${props.qID}/${props.session}/
${currOption.nextqID === '' ? props.options[0].nextqID : currOption.nextqID }/${answer}`}
                onClick={Submit}
                variant="contained"
                sx={{ mt: 3 }}
            >
                Next
            </Button>
        );
    }

    return (
        <>
            <Typography variant="h5" style={{ marginTop: "30px" }} gutterBottom>
                {props.qtext}
            </Typography>
            <FormControl>
                {props.options.length === 1
                    ? TextOption()
                    : MultiOptions(props)}
            </FormControl>
            <div>{MyButton()}</div>
        </>
    );
}

export default Question;
