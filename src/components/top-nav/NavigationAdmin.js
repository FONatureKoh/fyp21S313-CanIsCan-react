import React from 'react';
import { Box, Button, ListItemButton, Drawer, List, Divider, ListItem, ListItemIcon, ListItemText, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { Link, useHistory } from "react-router-dom";
import TagIcon from '@mui/icons-material/Tag';
import SearchIcon from '@mui/icons-material/Search';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

const drawerWidth = 240;

export default function NavigationAdmin({isVisible, isSelected, setIsSelected}) {
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
              <ListItemText primary="Restaurant Management" />
            </ListItem>

            <ListItemButton selected={isSelected === 1} component={ Link } to="/admin/approverestaurant" onClick={() => setIsSelected(1)} >
              <ListItemIcon>
                <PendingActionsIcon/>
              </ListItemIcon>
              <ListItemText primary="Pending Applications" />
            </ListItemButton>

            <ListItemButton selected={isSelected === 2} component={ Link } to="/admin/existingrest" onClick={() => setIsSelected(2)} >
              <ListItemIcon>
                <FoodBankIcon/>
              </ListItemIcon>
              <ListItemText primary="Existing Restaurants" />
            </ListItemButton>
            <Divider variant="middle"/>
            <ListItem>
              <ListItemText primary="Account Management" />
            </ListItem>

            <ListItemButton selected={isSelected === 3} component={ Link } to="/admin/search" onClick={() => setIsSelected(3)} >
              <ListItemIcon>
                <SearchIcon/>
              </ListItemIcon>
              <ListItemText primary="Existing Customers"/>
            </ListItemButton>
            <Divider variant="middle"/>
            <ListItem>
              <ListItemText primary="System Management" />
            </ListItem>

            <ListItemButton selected={isSelected === 4} component={ Link } to="/admin/tags" onClick={() => setIsSelected(4)} >
              <ListItemIcon>
                <TagIcon/>
              </ListItemIcon>
              <ListItemText primary="Category Tags"/>
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
  )
}
