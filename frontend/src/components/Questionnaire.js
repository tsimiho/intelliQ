import React from 'react'
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

function Questionnaire(props) {
    function sec(req, type) {
        let R = (req==="TRUE"? "Υποχρεωτική" : "Προαιρετική");
        let T = (type==="question"? "Ερώτηση" : "Προφίλ");
        return R + " (" + T + ")";
    }
    let Keywords = "Λέξεις κλειδιά: " + props.keywords[0];
    for (let i = 1; i < props.keywords.length; i++) {
        Keywords += ", " + props.keywords[i];
    }
    const Questions = props.questions.map((question) =>
        <>
            <ListItem>
                <ListItemText 
                primary={question.qtext} 
                secondary={sec(question.required,question.type)}
                />
            </ListItem>
            <Divider />
        </>        
    );

    return (
        <>
            <Container maxWidth="md" style={{ marginTop: '80px', marginBottom: '80px' }}>
            <Typography variant="h4" gutterBottom>
                { props.questionnaireTitle }
            </Typography>
            <Typography variant="h6" gutterBottom>
                { Keywords }
            </Typography>
            <List
                sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                    mt:2
                }}
                >
                { Questions }
                </List>              
            </Container>        
        </>
        
 
        
  )
}

export default Questionnaire