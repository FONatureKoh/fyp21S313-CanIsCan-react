import React from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Box, Button, ListItemButton, Drawer, List, Divider, ListItem, Typography } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import Info from '@mui/icons-material/Info';
import { Link, useHistory } from "react-router-dom";

const drawerWidth = 240;


export default function NavigationRM({isVisible, isSelected, setIsSelected}) {
  const history = useHistory();

  function logout(){
      let path = '/';
      history.push(path);
  }

  return (
    <Box sx={{ display: 'flex' }}>
      
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            top: '76px',
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={isVisible}
      >
        <Divider />
        <List>
          <ListItem sx={{bgcolor:"#eeeeee", color:'black', width:'85%', alignSelf:'center', margin:'5px auto', borderRadius:'10px'}}>
            <ListItemText>
              <Typography sx={{textDecoration:'underline'}}variant="body2">Restaurant Name:</Typography>
              <Typography >placeholder</Typography>
              <Typography sx={{textDecoration:'underline'}} variant="body2">Role:</Typography>
              <Typography>Reservations Manager</Typography>
            </ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText primary="Reservations Management" />
          </ListItem>

          <ListItemButton selected={isSelected === 1} component= { Link } to='/reservationsmanager/viewpendingres' onClick={() => setIsSelected(1)} >
            <ListItemIcon>
              <RestaurantMenuIcon/>
            </ListItemIcon>
            <ListItemText primary="Pending Reservations" />
          </ListItemButton>

          <ListItemButton selected={isSelected === 2} component= { Link } to='/reservationsmanager/acceptedres' onClick={() => setIsSelected(2)} >
            <ListItemIcon>
              <Info/>
            </ListItemIcon>
            <ListItemText primary="Accepted Reservations"/>
          </ListItemButton>
        </List>
        <Divider/>
        <Button variant="outlined" onClick={logout} color="inherit" sx={{margin:'30px auto', width:'90%'}} >Logout</Button>
      </Drawer>
    </Box>
  );
}