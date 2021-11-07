import React, { useState } from 'react'
import { Button, CardContent, CardHeader, Typography, Card, Box, TextField, FormControl, InputLabel, Select, MenuItem, Backdrop, CircularProgress} from '@mui/material';
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom';
import { postAddNewSubUser } from '../../restaurant_controller';

export default function AddSubUser() {
  // PAGE CONSTANTS
  const history = useHistory();
  // States for the form and stuffs
  const [username, setUsername] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');

  // Standard settings
  const boldtitle = {
    fontSize:'1 0px', 
    fontWeight:'bold', 
    marginTop:'20px',
    marginBottom:'10px'
 };

  /***********************************************************************************************
   * Settings for Backdrop
   * *********************************************************************************************
   */
  // Backdrop useStates 
  const [backdropState, setBackDropState] = useState(false);

  // Backdrop functions
  const handleBackdropClose = () => {
    setBackDropState(false);
  };

  const handleBackdropOpen = () => {
    setBackDropState(true);
  };

  // Function to submit a new user
  function submitAdd() {
    // Do some validation on click for adding
    var errorCount = 0;

    if (username === "") {
      alert("Username cannot be blank!");
      errorCount++;
    }

    if (fname === "" || lname === "") {
      alert("First name and lname cannot be blank!");
      errorCount++;
    }

    if (email === "") {
      alert("Email cannot be blank! We need this to send the credentials to your employee.");
      errorCount++;
    }

    if (phone === "") {
      alert("Phone number cannot be blank!");
      errorCount++;
    }

    if (role === "") {
      alert("You have not selected a role from the dropdown list. Please do so. Thank you!");
      errorCount++;
    }

    // If there's no errors, then we can post
    if (errorCount === 0) {
      // Open the backdrop to push loading
      handleBackdropOpen();

      postAddNewSubUser(username, fname, lname, email, phone, role)
        .then((response) => {
          if (response.api_msg === "success") {
            alert(`Successful creation of subuser ${username}`);
            handleBackdropClose();

            history.push('/generalmanager/manageuser');            
          }
          else {
            alert(`Something went wrong. Please double check!`);

            handleBackdropClose();
          }
        })
        .catch(error => {
          alert(error);

          handleBackdropClose();
        });
    }
  }

  return <>
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={backdropState}>
      <CircularProgress color="inherit" />
    </Backdrop>
    <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px'}}>
      <CardHeader title="Add Sub-user" />
      <CardContent >
        <Box display='flex' flexDirection="column" > 
          <Box alignSelf='center' width="45%">
            <Typography sx={boldtitle}>Particulars:</Typography>
            <TextField sx={{width:'100%', mb:'20px'}} 
              id="filled-basic" 
              label="Username:" 
              variant="filled" 
              size="small"
              onChange={(e) => setUsername(e.target.value)}
              />
            <Box alignSelf="center" display='flex' flexDirection="row" >
              <TextField sx={{width:'48%', mb:'20px'}} 
                id="filled-basic" 
                label="First Name:" 
                variant="filled" 
                size="small"
                onChange={(e) => setFname(e.target.value)}
                />
              <Box sx={{width:'4%'}}></Box>
              <TextField sx={{width:'48%', mb:'20px'}} 
                id="filled-basic" 
                label="Last Name:" 
                variant="filled" 
                size="small"
                onChange={(e) => setLname(e.target.value)}
                />
            </Box>
            
            <TextField sx={{width:'100%', mb:'20px'}} 
              id="filled-basic" 
              label="Email:" 
              variant="filled" 
              size="small"
              onChange={(e) => setEmail(e.target.value)}
              />

            <TextField sx={{width:'100%', mb:'20px'}}
                id="filled-basic" 
                label="Phone No.:"
                variant="filled" 
                size="small"
                type="number" 
                inputProps={{ maxLength: 8 }}
                onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                />

            <Typography sx={boldtitle}>Role:</Typography>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                label="Role"
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              >
                <MenuItem value={'Restaurant Deliveries Manager'}>Deliveries Manager</MenuItem>
                <MenuItem value={'Restaurant Reservations Manager'}>Reservations Manager</MenuItem>
              </Select>
            </FormControl>

            <Box alignSelf="center" display='flex' flexDirection="row" sx={{mt: '20px'}}>
              <Button variant="contained" color="inherit" onClick={submitAdd} sx={{width: '45%', alignSelf:'flex-start', bgcolor:'#969696'}}>Add User</Button>
              <Box sx={{width:'10%'}}></Box>
              <Button variant="contained" color="inherit" sx={{width: '45%', alignSelf:'flex-end'}} component={Link} to="/generalmanager/manageuser">Cancel</Button>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  </>
}
