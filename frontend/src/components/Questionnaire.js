import React from 'react'
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

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
                <TableContainer component={Paper} style={{ marginTop: '20px'}}>
                    <Table aria-label="customized table">
                        <Stack 
                        direction="column" 
                        justifyContent="center" 
                        alignItems="left" 
                        spacing={3}
                        style={{ padding: '20px'}}>
                            <Typography variant="h4">
                                { props.questionnaireTitle }
                            </Typography>
                            <Typography variant="h6">
                                { Keywords }
                            </Typography>
                            <List
                                sx={{
                                    width: '100%',
                                    bgcolor: 'background.paper',
                                }}
                                >
                                { Questions }
                            </List>
                        </Stack>
                    </Table>
                </TableContainer>
                              
            </Container>        
        </>
        
 
        
  )
}

export default Questionnaire