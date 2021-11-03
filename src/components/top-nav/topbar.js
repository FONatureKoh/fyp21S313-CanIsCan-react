import * as React from 'react';
import logo from '../../assets/logo.svg'
import { Toolbar, Typography, IconButton, Box, AppBar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ProfileIcon from './profile-icon';


export default function Topbar({toggleVisibility}) {
  
  return (
    <>
      <AppBar position="fixed" sx={{bgcolor: '#474747', height:'75px', pt:'8px'}}>
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
            <img src={logo} className="logo123" height="50px" width="50px" alt="logo"/>
          </Typography>
          <Typography variant="h6" noWrap component="div" sx={{ml:'15px', flexGrow: 1}}>
            Food On Click
          </Typography>
          <Box>
            <ProfileIcon />
          </Box>
        </Toolbar>
      </AppBar>
    </>
    
  )
}
