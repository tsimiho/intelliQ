import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Menu from '@mui/material/Menu';

export default function MenuAppBar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const token = localStorage.getItem('token');
  //const mode = localStorage.getItem('theme');

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick= () => {
    setAnchorEl(null);
    if (token) {
      localStorage.removeItem('token');
      localStorage.removeItem('expires');
      localStorage.removeItem('username');  
    }
    window.location.href = `/${token ? '': 'login'}`;
  };

  function changeTheme () {
    props.setTheme(props.theme === 'light' ? 'dark' : 'light');
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            intelliQ
          </Typography>
            <div>
            <IconButton
                size="large"
                onClick={changeTheme}
                color="inherit"
              >
              {props.theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}    
            </IconButton>
            </div>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClick}>
                  { token ? `Log out` : `Log in` }
                </MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}