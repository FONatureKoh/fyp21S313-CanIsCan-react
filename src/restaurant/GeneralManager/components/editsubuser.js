import React, { useState } from 'react'
import { Button, CardContent, CardHeader, Typography, Card, Box, TextField, FormControl, InputLabel, Select, MenuItem} from '@mui/material'
import { useHistory, useRouteMatch } from 'react-router'
import { Link } from 'react-router-dom';
// import { subUser } from '../../restaurant_controller';
import { updateSubuser } from '../rgm_controller';
import { allSubUsers } from '../../restaurant_controller';

export default function EditSubUser({userData, setSubUsers}) {
  // Set match to get the path's param
  const match = useRouteMatch('/generalmanager/manageuser/editsubuser/:id');
  const subuserID = match.params.id;

  // CONST FOR THE PAGE
  const history = useHistory();

  const boldtitle = {
    fontWeight:'bold', 
    marginTop:'20px',
    marginBottom:'10px'
  };

  // MATCH THE USER DATA 
  let subSelected;
  for(const sub of userData)
  {
    if(sub.userID === parseInt(match.params.id))
    {
      subSelected = sub;
      break;
    }
  }

  // Various states to set data
  const [username] = useState(subSelected.username);
  const [fname, setFname] = useState(subSelected.fname);
  const [lname, setLname] = useState(subSelected.lname);
  const [email, setEmail] = useState(subSelected.email);
  const [phone, setPhone] = useState(subSelected.phoneNo);
  const [role, setRole] = useState(subSelected.type);

  function submitEdit(){
    //update functions goes here
    updateSubuser(subuserID, username, fname, lname, email, phone, role)
      .then((response) => {
        if (response.api_msg === "success") {
          alert(`Updated subuser details for staff member with username ${username}.`);

          // Reload the subuser data
          allSubUsers()
            .then((response) => {
              setSubUsers(response);
            });

          history.push('/generalmanager/manageuser');      
        }
        else {
          console.log(response);
          alert(`There was an error. Please try again.`);
          history.push('/generalmanager/manageuser');
        }
      });
  }

  return <>
    <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px'}}>
      <CardHeader title="Edit Sub-user" />
      <CardContent >
        <Box display='flex' flexDirection="column" > 
          <Box alignSelf='center' width="45%">
            <Typography sx={boldtitle}>Particulars:</Typography>

            <TextField 
              disabled 
              sx={{width:'100%', mb:'20px'}} 
              id="filled-basic" 
              label="Username:" 
              variant="filled" 
              size="small" 
              defaultValue={username} 
              />

            <Box alignSelf="center" display='flex' flexDirection="row" >
              <TextField sx={{width:'48%', mb:'20px'}} 
                id="filled-basic" 
                label="First Name:" 
                variant="filled" 
                size="small"
                defaultValue={fname}
                onChange={(e) => setFname(e.target.value)}
                />
              <Box sx={{width:'4%'}}></Box>
              <TextField sx={{width:'48%', mb:'20px'}} 
                id="filled-basic" 
                label="Last Name:" 
                variant="filled" 
                size="small"
                defaultValue={lname}
                onChange={(e) => setLname(e.target.value)}
                />
            </Box>
            
            <TextField sx={{width:'100%', mb:'20px'}} 
              id="filled-basic" 
              type="number"
              label="Phone No.:" 
              variant="filled" 
              size="small"
              defaultValue={phone}
              onChange={(e) => setPhone(e.target.value)}
              />

            <TextField sx={{width:'100%', mb:'20px'}} 
              id="filled-basic" 
              label="Email:" 
              variant="filled" 
              size="small"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
              />

            <Typography sx={boldtitle}>Role:</Typography>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                label="Role"
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value={'Restaurant Deliveries Manager'}>Deliveries Manager</MenuItem>
                <MenuItem value={'Restaurant Reservations Manager'}>Reservations Manager</MenuItem>
              </Select>
            </FormControl>

            <Box alignSelf="center" display='flex' flexDirection="row" sx={{mt: '20px'}}>
              <Button 
                variant="contained" 
                color="inherit" 
                sx={{width: '45%', alignSelf:'flex-start', bgcolor:'#969696'}} 
                onClick={submitEdit}
              >
                Update
              </Button>
              <Box sx={{width:'10%'}}></Box>
              <Button variant="contained" color="inherit" sx={{width: '45%', alignSelf:'flex-end' }} component={Link} to="/generalmanager/manageuser">Cancel</Button>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  </>
}
