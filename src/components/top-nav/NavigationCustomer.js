import React from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Box, Button, ListItemButton, Drawer, List, Divider, ListItem } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import Info from '@mui/icons-material/Info';
import { Link, useHistory } from "react-router-dom";
import { Dialog, DialogActions, DialogTitle } from '@mui/material';

const drawerWidth = 240;


export default function NavigationCustomer({isVisible, isSelected, setIsSelected}) {
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

            <ListItemButton selected={isSelected === 4} component={ Link } to="/customer/reservationhistory" onClick={() => setIsSelected(4)} >
              <ListItemIcon>
                <Info/>
              </ListItemIcon>
              <ListItemText primary="Reservation History"/>
            </ListItemButton>
        </List>
        <Divider variant="middle"/>
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