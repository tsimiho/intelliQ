import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";

function Question(props) {
    const [answer, setAnswer] = useState("");
    const handleChange = (event) => {
        setAnswer(event.target.value);
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
                        key={option._id}
                        value={option._id}
                        control={<Radio />}
                        label={option.opttext}
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
                //multiline
                maxRows={4}
                onChange={handleChange}
                sx={{ mt: 2, width: 400 }}
            />
        );
    }
    function MyButton() {
        return props.required === "TRUE" && answer === "" ? (
            <Button variant="contained" sx={{ mt: 3 }} disabled>
                Next
            </Button>
        ) : (
            <Button
                href={`/doanswer/QQ000/${props._id}/ABCD/${answer}`}
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
