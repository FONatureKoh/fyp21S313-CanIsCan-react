import React from 'react'
import Settings from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { Divider, Button, Container, Menu, MenuItem, IconButton, Avatar } from '@mui/material';
import profilepic from '../../assets/temp/johnsmith.png'
import { useHistory } from 'react-router-dom';

export default function ProfileIcon() {

    const history = useHistory();

    function logout(){
        let path = '/';
        history.push(path);
    }

    const handleProfile = () => {
        history.push("/generalmanager/profile");
      };
  
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
    <Container position="absolute" sx={{mr:1}}>
        <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }} >
            <Avatar src={profilepic} alt="profile" sx={{ width: 50 , height: 50}}/>
        </IconButton>
        
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
            <MenuItem onClick={handleProfile}> <PersonIcon color="action" fontSize="small" sx={{mr: 1}}/> Edit Profile</MenuItem>
            <MenuItem onClick={handleClose}> <LockIcon color="action" fontSize="small" sx={{mr: 1}}/>Change Password</MenuItem>
            <MenuItem onClick={handleClose}> <Settings color="action" fontSize="small" sx={{mr: 1}}/> Settings</MenuItem>
            <Divider />
            <MenuItem onClick={logout}>
                <Button variant="outlined" color="inherit" sx={{width:"100%"}}>Logout</Button>
            </MenuItem>
        </Menu> 
    </Container>
  )
}
