import * as React from 'react';
import logo from '../../assets/logo.svg'
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ProfileIcon from './profile-icon';

import AppBar from '@mui/material/AppBar';

export default function Topbar({toggleVisibility}) {

  return (
    <>
      <AppBar position="fixed" sx={{bgcolor: '#474747'}}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label="open drawer"
            edge="start"
            onClick={() => {
              toggleVisibility();
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ml:'15px'}}>
            <img src={logo} className="logo123" height="50px" width="50px"/>
          </Typography>
          <Typography variant="h6" noWrap component="div" sx={{ml:'15px', flexGrow: 1}}>
            Food On Click
          </Typography>
          <IconButton edge='end'>
            <ProfileIcon />
            </IconButton>
        </Toolbar>
      </AppBar>
    </>
    
  )
}
