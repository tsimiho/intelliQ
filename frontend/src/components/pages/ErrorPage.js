import React from 'react'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Redirect } from 'react-router-dom';
import { Stack } from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

function ErrorPage(props) {
  const { params } = props.match;  
  const codes = [
    {
        status: '400',
        msg: 'Bad request'
    },
    {
        status: '402',
        msg: 'No data'
    },
    {
        status: '500',
        msg: 'Internal server error'
    }
  ];

  const status = params.status ? params.status : '400';
  console.log(status);

  return (
    <Container maxWidth="md" style={{ marginTop: '80px', marginBottom: '80px' }}>
        {status === '401' ? 
            <Redirect to='/login' /> 
        : 
        <Stack direction="row" spacing={2}>
            <SentimentVeryDissatisfiedIcon sx={{ fontSize: 50 }} />
        <Typography variant="h3" gutterBottom>
            {`${status} ${(codes.find((c) => c.status === status)).msg}`}
        </Typography>
        </Stack>
        }        
    </Container>
  )
}

export default ErrorPage