import React from 'react';
import { Switch, Typography, Box, Button, ListItemButton, Drawer, List, Divider, ListItem, Dialog, DialogActions, DialogTitle, ListItemIcon, ListItemText } from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import AssessmentIcon from '@mui/icons-material/Assessment';
import Info from '@mui/icons-material/Info';
import { Link, useHistory } from "react-router-dom";

const drawerWidth = 240;

export default function NavigationRGM({restaurantName, isVisible, isSelected, setIsSelected, isChecked, toggleChecked}) {
  const history = useHistory();
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpenDialog= () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  function logout(){
    window.sessionStorage.clear();
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
            width: drawerWidth,
            boxSizing: 'border-box',
            marginTop: "76px",
            maxHeight: "93%"
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
                <Typography >{restaurantName}</Typography>
                <Typography sx={{textDecoration:'underline'}} variant="body2">Role:</Typography>
                <Typography>General Manager</Typography>
              </ListItemText>
            </ListItem>


            <ListItemButton>
            <Typography sx={{marginTop:'20px', marginBottom:'20px'}}>Open For Business <Switch checked={isChecked} onClick={()=>toggleChecked()} size="large" /></Typography>
            </ListItemButton>

            <Divider variant="middle"/>

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

            <Divider variant="middle"/>

            <ListItem key="Account Management" sx={{mt:'10px'}}>
              <ListItemText primary="Account Management" />
            </ListItem>

            <ListItemButton component={Link} to='/generalmanager/manageuser' selected={isSelected === 3} onClick={() => setIsSelected(3)} >
              <ListItemIcon>
                <ManageAccountsIcon/>
              </ListItemIcon>
              <ListItemText primary="Manage Accounts" />
            </ListItemButton>

            <Divider variant="middle"/>

            <ListItem key="DashBoard" sx={{mt:'10px'}}>
              <ListItemText primary="Dashboard"/>
            </ListItem>
            
            <ListItemButton component={Link} to='/generalmanager/statistics' selected={isSelected === 4} onClick={() => setIsSelected(4)}>
              <ListItemIcon>
                <AssessmentIcon/>
              </ListItemIcon>
              <ListItemText primary="View Statistics" />
            </ListItemButton>

            <Divider variant="middle"/>
        </List>
        <Button variant="outlined" color="inherit" onClick={handleOpenDialog} sx={{margin:'30px auto', width:'90%'}} >Logout</Button>
      </Drawer>

      <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
          {"Confirm logout?"}
        </DialogTitle>
        <DialogActions>
          <Button variant="outlined" color="inherit" onClick={logout}>Logout</Button>
          <Button onClick={handleCloseDialog} variant="outlined" color="error">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}