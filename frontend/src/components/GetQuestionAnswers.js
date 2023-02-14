import React from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Container } from '@mui/system';
import Typography from "@mui/material/Typography";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

function GetQuestionAnswers(props) {
  return (
    <Container maxWidth="sm" style={{ marginTop: '80px', marginBottom: '80px' }}>
        <TableContainer component={Paper} style={{ marginTop: '20px'}}>
            <Table aria-label="customized table">
                <Stack 
                direction="column" 
                justifyContent="center" 
                alignItems="left" 
                spacing={3}
                style={{ padding: '20px'}}>
                    <Typography variant="h4">
                        {props.questionnaireTitle}
                    </Typography>
                    <Typography variant="h5" style={{ marginTop: "30px" }} gutterBottom>
                        {props.qtext}
                    </Typography>
                    <TableContainer component={Paper} style={{ marginTop: '40px' }}>
                    <Table aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Session</StyledTableCell>
                            <StyledTableCell align="center">Answer</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {props.answers.map((row) => (
                            <StyledTableRow key={row.session}>
                            <StyledTableCell align="center">{row.session}</StyledTableCell>
                            <StyledTableCell align="center">{row.ans}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                </Stack>
            </Table>
        </TableContainer>
        
    </Container>
  )
}

export default GetQuestionAnswers