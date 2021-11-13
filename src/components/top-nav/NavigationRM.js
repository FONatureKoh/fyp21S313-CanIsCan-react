import React from 'react';
import { Box, Button, ListItemButton, Drawer, List, Divider, ListItem, Typography, ListItemIcon, ListItemText, Dialog, DialogActions, DialogTitle  } from '@mui/material';
import { Link, useHistory } from "react-router-dom";
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ViewDayIcon from '@mui/icons-material/ViewDay';

const drawerWidth = 240;

export default function NavigationRM({restName, isVisible, isSelected, setIsSelected}) {
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
              <Typography>{restName}</Typography>
              <Typography sx={{textDecoration:'underline'}} variant="body2">Role:</Typography>
              <Typography>Reservations Manager</Typography>
            </ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText primary="Reservations Management" />
          </ListItem>

          <ListItemButton selected={isSelected === 1} component= { Link } to='/reservationsmanager/viewpendingres' onClick={() => setIsSelected(1)} >
            <ListItemIcon>
              <PendingActionsIcon/>
            </ListItemIcon>
            <ListItemText primary="Pending Reservations" />
          </ListItemButton>

          <ListItemButton selected={isSelected === 2} component= { Link } to='/reservationsmanager/acceptedres' onClick={() => setIsSelected(2)} >
            <ListItemIcon>
              <DoneAllIcon/>
            </ListItemIcon>
            <ListItemText primary="Fulfilled Reservations"/>
          </ListItemButton>

          <Divider variant="middle" />

          <ListItem>
            <ListItemText primary="Slots Management" />
          </ListItem>

          <ListItemButton selected={isSelected === 3} component= { Link } to='/reservationsmanager/manageslots' onClick={() => setIsSelected(3)} >
            <ListItemIcon>
              <ViewDayIcon/>
            </ListItemIcon>
            <ListItemText primary="Manage Slots" />
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