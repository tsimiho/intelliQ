import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MySnackBar from '../MySnackBar';
import { Redirect } from 'react-router-dom';
import axios from "axios";
import moment from 'moment/moment';

export default function LogIn() {
  const [success, setSuccess] = React.useState(false);
  const fail = false;
  const [openFail, setOpenFail] = React.useState(false);
  const [stat, setStat] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const pair = {
      username: data.get('username'),
      password: data.get('password'),
    };
    axios
    .post(
        `/login`, pair
    )
    .then((response) => {
        const res = response.data;
        const expires = moment().add(6, 'hours');
        localStorage.setItem('token', res.token);
        localStorage.setItem('expires', JSON.stringify(expires.valueOf()));
        localStorage.setItem('username', pair.username);
        setTimeout(() => {setSuccess(true);}, 500);
    }).catch((error) => {
      if (error.response.status === 401) {
        setOpenFail(true);
      } else {
        setStat(error.response.status);
      }  
    });    

  };

  if (success) {
      window.location.href = '/admin';
  }
  if (stat !== '') {
    return (
        <Redirect to={`/error/${stat}`} />
    )
  }

  setTimeout(() => {setSuccess(localStorage.getItem('token'));}, 100);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            //autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
          <MySnackBar 
            open={openFail}
            setOpen={setOpenFail}
            check={fail}
            success_text="" 
            failure_text="Log in failed."
          />
        </Box>
      </Box>
    </Container>
  );
}