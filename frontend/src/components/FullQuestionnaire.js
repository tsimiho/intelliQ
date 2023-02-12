import React from 'react'
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import CircleIcon from '@mui/icons-material/Circle';

function FullQuestionnaire(props) {
    function sec(req, type) {
        let R = (req==="TRUE"? "Υποχρεωτική" : "Προαιρετική");
        let T = (type==="question"? "Ερώτηση" : "Προφίλ");
        return R + " (" + T + ")";
    }
    let Keywords = "Λέξεις κλειδιά: " + props.keywords[0];
    for (let i = 1; i < props.keywords.length; i++) {
        Keywords += ", " + props.keywords[i];
    }
    const [currID, setCurrID] = React.useState('-');
    const handleClick = (ID) => {
        setCurrID(currID === ID ? '-' : ID)
    }
    const Questions = props.questions.map((question) =>
        <>
            <ListItem>
                <List sx={{width: '100%'}}>
                    <ListItemButton onClick={() => handleClick(question.qID)}>
                        <ListItemText 
                        primary={question.qtext} 
                        secondary={sec(question.required,question.type)}
                        />
                        {currID === question.qID ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={currID === question.qID} timeout="auto" unmountOnExit>
                        <List>
                            {question.options.map((option) => 
                                <ListItem>
                                    <ListItemIcon>
                                        <CircleIcon sx={{ fontSize: 10 }}/>
                                    </ListItemIcon>
                                    <ListItemText primary={option.opttxt} />
                                </ListItem>                    
                            )}    
                        </List>   
                    </Collapse>                           
                </List>
            </ListItem>
            <Divider />
        </>        
    );

    return (
        <>
            <Container maxWidth="md" style={{ marginTop: '20px', marginBottom: '0px' }}>
                <Typography variant="h6" gutterBottom>
                    { Keywords }
                </Typography>
                <Typography variant="h6" gutterBottom sx={{mt:2}}>
                    Ερωτήσεις:
                </Typography>
                <List>
                    { Questions }
                </List>              
            </Container>        
        </>
        
 
        
  )
}

export default FullQuestionnaire