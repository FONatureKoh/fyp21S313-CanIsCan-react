import * as React from 'react';
import logo from '../../assets/logo.svg'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import EditMenu from '../../restaurant/editmenu/EditMenu';
import ProfileIcon from './profile-icon';
import { Container } from '@mui/material';

import AppBar from '@mui/material/AppBar';
import './navigation1.css'

export default function Topbar() {

  return (
    <>
      <AppBar position="fixed" sx={{bgcolor: '#474747'}}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label="open drawer"
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <img src={logo} className="logo123"/>
          </Typography>
          <Typography variant="h6" noWrap component="div" sx={{ml:'10px'}}>
            Food On Click
          </Typography>
          <Container position="flex-end">
            <ProfileIcon />
          </Container>
        </Toolbar>
      </AppBar>
    </>
    
  )
}
