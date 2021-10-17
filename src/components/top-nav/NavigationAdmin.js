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

export default function NavigationAdmin({isVisible, isSelected, setIsSelected}) {
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
              <ListItemText primary="Restaurant Management" />
            </ListItem>

            <ListItemButton selected={isSelected === 1} component={ Link } to="/admin/approverestaurant" onClick={() => setIsSelected(1)} >
              <ListItemIcon>
                <RestaurantMenuIcon/>
              </ListItemIcon>
              <ListItemText primary="Pending Applications" />
            </ListItemButton>

            <ListItemButton selected={isSelected === 2} component={ Link } to="/admin/existingrest" onClick={() => setIsSelected(2)} >
              <ListItemIcon>
                <RestaurantMenuIcon/>
              </ListItemIcon>
              <ListItemText primary="Existing Restaurants" />
            </ListItemButton>

            <ListItem>
              <ListItemText primary="Account Management" />
            </ListItem>

            <ListItemButton selected={isSelected === 3} component={ Link } to="/admin/search" onClick={() => setIsSelected(3)} >
              <ListItemIcon>
                <Info/>
              </ListItemIcon>
              <ListItemText primary="Search Account"/>
            </ListItemButton>
        </List>
        <Divider/>
        <Button variant="outlined" color="inherit" onClick={logout} sx={{margin:'30px auto', width:'90%'}} >Logout</Button>
      </Drawer>
    </Box>
  )
}
