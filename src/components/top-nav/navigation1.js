import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Switch, Typography } from '@mui/material';
import './navigation1.css'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import AssessmentIcon from '@mui/icons-material/Assessment';
import Info from '@mui/icons-material/Info';
import { Button } from '@mui/material';
import { ListItemButton } from '@mui/material';
import { Link } from "react-router-dom";

const drawerWidth = 240;


// const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: `-${drawerWidth}px`,
//     ...(open && {
//       transition: theme.transitions.create('margin', {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       marginLeft: 0,
//     }),
//   }),
// );

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//   transition: theme.transitions.create(['margin', 'width'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: `${drawerWidth}px`,
//     transition: theme.transitions.create(['margin', 'width'], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
//   justifyContent: 'flex-end',
// }));

export default function Navigation1({isVisible, isSelected, setIsSelected, isChecked, toggleChecked}) {
  const theme = useTheme();  

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
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

            <ListItem key="Edit Restaurant Menu">
              <ListItemText primary="Edit Information" />
            </ListItem>

            <ListItemButton component={Link} to='/generalmanager/editmenu' key="Edit Restaurant Menu" selected={isSelected === 1} onClick={() => setIsSelected(1)} >
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
        <Button variant="outlined" color="inherit" sx={{margin:'30px auto', width:'90%'}} >Logout</Button>
      </Drawer>
    </Box>
  );
}