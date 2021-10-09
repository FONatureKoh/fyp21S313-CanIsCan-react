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

export default function Navigation1({isVisible, isSelected, setIsSelected, isChecked, toggleChecked}) {
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
            <ListItemButton>
            <Typography sx={{marginTop:'20px', marginBottom:'20px'}}>Open For Business <Switch checked={isChecked} onClick={()=>toggleChecked()} size="large" /></Typography>
            </ListItemButton>

            <Divider/>

            <ListItem>
              <ListItemText primary="Edit Information" />
            </ListItem>

            <ListItemButton component={Link} to='/generalmanager/editmenu' selected={isSelected === 1} onClick={() => setIsSelected(1)} >
              <ListItemIcon>
                <RestaurantMenuIcon/>
              </ListItemIcon>
              <ListItemText primary="Edit Menu" />
            </ListItemButton>

            <ListItemButton component={Link} to='/generalmanager/restaurantinformation' selected={isSelected === 2} onClick={() => setIsSelected(2)} >
              <ListItemIcon>
                <Info/>
              </ListItemIcon>
              <ListItemText primary="Update Information"/>
            </ListItemButton>

            <Divider/>

            <ListItem key="Account Management" sx={{mt:'10px'}}>
              <ListItemText primary="Account Management" />
            </ListItem>

            <ListItemButton component={Link} to='/generalmanager/manageuser' selected={isSelected === 3} onClick={() => setIsSelected(3)} >
              <ListItemIcon>
                <ManageAccountsIcon/>
              </ListItemIcon>
              <ListItemText primary="Manage Accounts" />
            </ListItemButton>

            <Divider/>

            <ListItem key="DashBoard" sx={{mt:'10px'}}>
              <ListItemText primary="Dashboard"/>
            </ListItem>
            
            <ListItemButton  component={Link} to='/generalmanager/statistics' selected={isSelected === 4} onClick={() => setIsSelected(4)}>
              <ListItemIcon>
                <AssessmentIcon/>
              </ListItemIcon>
              <ListItemText primary="View Statistics" />
            </ListItemButton>
        </List>
        <Divider/>
        <Button variant="outlined" color="inherit" onClick={logout} sx={{margin:'30px auto', width:'90%'}} >Logout</Button>
      </Drawer>
    </Box>
  );
}