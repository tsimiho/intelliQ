import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import logo from '../../fixed_logo3.png';

function Home() {
  return (
    <Container maxWidth="md" style={{ marginTop: '80px', marginBottom: '80px'}}>
        <TableContainer component={Paper} style={{ marginTop: '20px'}}>
            <Table aria-label="customized table">
                <Stack 
                direction="column" 
                justifyContent="center" 
                alignItems="center" 
                spacing={4}
                style={{ marginTop: '20px', marginBottom: '20px'}}>
                    <Typography variant="h4">
                        Welcome to intelliQ!
                    </Typography>
                    <img src={logo} alt="Logo" height={235} width={235}/>
                    <Typography maxWidth="sm" variant="h5" align='center'>
                        This is a website where you can create "intelligent" questionnaires for online surveys of all kinds!
                    </Typography>
                </Stack>
            </Table>
        </TableContainer>
    </Container> 
  )
}

export default Home