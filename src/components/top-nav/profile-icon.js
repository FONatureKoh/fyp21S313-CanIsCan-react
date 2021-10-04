import React from 'react'
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Settings from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { Divider, Button } from '@mui/material';
import profilepic from '../../assets/temp/johnsmith.png'
import './topnav.css';

export default function ProfileIcon() {
  
    /*Menu*/
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
  return (
    <div>
      <div className="icon-profile">
            <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }} >
                <Avatar src={profilepic} className="icon-profile" alt="profile"  sx={{ width: 60 , height: 60}}/>
            </IconButton>
      </div>
            <Menu
                anchorEl={anchorEl}
                id="menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,}}}
            >
                <MenuItem onClick={handleClose}> <PersonIcon color="action" fontSize="small" sx={{mr: 1}}/> Edit Profile</MenuItem>
                <MenuItem onClick={handleClose}> <LockIcon color="action" fontSize="small" sx={{mr: 1}}/>Change Password</MenuItem>
                <MenuItem onClick={handleClose}> <Settings color="action" fontSize="small" sx={{mr: 1}}/> Settings</MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                    <Button variant="outlined" color="inherit" sx={{width:"100%"}}>Logout</Button>
                </MenuItem>
            </Menu>
            {/*
            
            <img src={profile} className="icon-profile" alt="profile" onClick= {viewprofile}/>
            
            */}    
    </div>
  )
}
