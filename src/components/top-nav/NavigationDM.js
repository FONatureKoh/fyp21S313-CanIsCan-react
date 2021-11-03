import React from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Typography, Box, Button, ListItemButton, Drawer, List, Divider, ListItem } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import Info from '@mui/icons-material/Info';
import { Link, useHistory } from "react-router-dom";
import { Dialog, DialogActions, DialogTitle } from '@mui/material';

const drawerWidth = 240;

export default function NavigationDM({restName, isVisible, isSelected, setIsSelected}) {
  const history = useHistory();
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpenDialog= () => {
      setOpenDialog(true);
  };

  const handleCloseDialog = () => {
      setOpenDialog(false);
  };

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
              <Typography >{restName}</Typography>
              <Typography sx={{textDecoration:'underline'}} variant="body2">Role:</Typography>
              <Typography>Deliveries Manager</Typography>
            </ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText primary="Delivery Management" />
          </ListItem>

          <ListItemButton selected={isSelected === 1} component={ Link } to="/deliveriesmanager/viewpending" onClick={() => setIsSelected(1)} >
            <ListItemIcon>
              <RestaurantMenuIcon/>
            </ListItemIcon>
            <ListItemText primary="Pending Orders" />
          </ListItemButton>

          <ListItemButton selected={isSelected === 2} component={ Link } to="/deliveriesmanager/acceptedorders" onClick={() => setIsSelected(2)} >
            <ListItemIcon>
              <Info/>
            </ListItemIcon>
            <ListItemText primary="Accepted Orders"/>
          </ListItemButton>

          <ListItemButton selected={isSelected === 3} component={ Link } to="/deliveriesmanager/viewhistory" onClick={() => setIsSelected(3)} >
            <ListItemIcon>
              <Info/>
            </ListItemIcon>
            <ListItemText primary="Orders History"/>
          </ListItemButton>
      </List>
        <Divider/>
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