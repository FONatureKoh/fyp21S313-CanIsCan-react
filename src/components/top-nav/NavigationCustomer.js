import React from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Switch, Typography, Box, Button, ListItemButton, Drawer, List, Divider, ListItem } from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import AssessmentIcon from '@mui/icons-material/Assessment';
import Info from '@mui/icons-material/Info';
import { Link, useHistory } from "react-router-dom";

const drawerWidth = 240;


export default function NavigationCustomer({isVisible, isSelected, setIsSelected}) {
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
            <ListItem>
              <ListItemText primary="Food Delivery" />
            </ListItem>

            <ListItemButton selected={isSelected === 1} component={ Link } to="/customer/browserestaurant" onClick={() => setIsSelected(1)} >
              <ListItemIcon>
                <RestaurantMenuIcon/>
              </ListItemIcon>
              <ListItemText primary="Browse Restaurants" />
            </ListItemButton>

            <ListItemButton selected={isSelected === 2} component={ Link } to="/customer/deliveryhistory" onClick={() => setIsSelected(2)}  >
              <ListItemIcon>
                <Info/>
              </ListItemIcon>
              <ListItemText primary="Order History"/>
            </ListItemButton>

            <Divider variant="middle"/>

            <ListItem>
              <ListItemText primary="Reservations" />
            </ListItem>
            
            <ListItemButton selected={isSelected === 3} onClick={() => setIsSelected(3)} >
              <ListItemIcon>
                <RestaurantMenuIcon/>
              </ListItemIcon>
              
              <ListItemText primary="Browse Restaurants" />
            </ListItemButton>
            <ListItemButton selected={isSelected === 4} component={ Link } to="/customer/reservationhistory" onClick={() => setIsSelected(4)} >
              <ListItemIcon>
                <Info/>
              </ListItemIcon>
              <ListItemText primary="Reservation History"/>
            </ListItemButton>
        </List>
        <Divider variant="middle"/>
        <Button variant="outlined" color="inherit" onClick={logout} sx={{margin:'30px auto', width:'90%'}} >Logout</Button>
      </Drawer>
    </Box>
  );
}