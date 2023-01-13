import React from 'react'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CreateQuestion from '../CreateQuestion';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';

function CreateQuestionnairePage() {
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
            sx={{ width: 600 }}
        />
        </Box>        
        <Box sx={{ mt: 5 }}>
            <Typography variant="h5">
                Ερωτήσεις
            </Typography>
            <Box>
                <CreateQuestion /> 
            </Box> 
        </Box>             
    </Container> 
  )
}

export default CreateQuestionnairePage