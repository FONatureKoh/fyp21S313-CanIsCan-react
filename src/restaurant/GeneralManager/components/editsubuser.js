import React, { useState } from 'react'
import { Button, CardContent, CardHeader, Typography, Card, Box, TextField, FormControl, InputLabel, Select, MenuItem} from '@mui/material'
import { useHistory, useRouteMatch } from 'react-router'
import { Link } from 'react-router-dom';
// import { subUser } from '../../restaurant_controller';
import { updateSubuser } from '../rgm_controller';

export default function EditSubUser({userData}) {
  // Set match to get the path's param
  const match = useRouteMatch('/generalmanager/manageuser/editsubuser/:id');
  const subuserID = match.params.id;

  // CONST FOR THE PAGE
  const history = useHistory();
  // console.log("EditSubUser Triggered");

  let subSelected;
  for(const sub of userData)
  {
    if(sub.subuser_ID === parseInt(match.params.id) )
    {
      subSelected = sub;
      break;
    }
  }

  console.log(subSelected);

  // Various states to set data
  const [subID, setSubID] = useState(subSelected.subuser_ID);
  const [username, setUsername] = useState(subSelected.subuser_username);
  const [fname, setFname] = useState(subSelected.first_name);
  const [lname, setLname] = useState(subSelected.last_name);
  const [email, setEmail] = useState(subSelected.email);
  const [phone, setPhone] = useState(subSelected.phone_no);
  const [role, setRole] = useState(subSelected.subuser_type);

  // NOTE: I tried to implement how I have been doing it over the last few days, to declare
  // the async function and then call that async function through the .then to set the data
  // but that didn't help either. I left this here for now Lines 35 to 62 is what I was trying.
  // Rather than taking from the parent we do one more controller
  // to retrieve the data based on the user ID, since we are requiring different set
  // of Data from the manageuse to the editsubuser. Edit subuser only needs that 1 user info
  // async function getSubUserData() {
  //   try {
  //     const response = await subUser(match.params.id);
  //     return response;
  //   }
  //   catch (error) {
  //     return error;
  //   }
  // }

  // I tried to use the useEffect here but it didn't seem to work. When I used
  // this I draw the data from here, that's why got getSubUserData() function
  // useEffect(() => {
  //   getSubUserData()
  //     .then((response) => {
  //       console.log(response)
  //       // setSubID(response.subuser_ID);
  //       // setUsername(response.subuser_username);
  //       // setFname(response.first_name);
  //       // setLname(response.last_name);
  //       // setPhone(response.phone_no);
  //       // setEmail(response.email);
  //       // setRole(response.subuser_type);
  //     })
  // })

  function submitEdit(){
    //update functions goes here
    updateSubuser(subuserID, username, fname, lname, email, phone, role)
      .then((response) => {
        if (response.api_msg === "success") {
          alert(`Updated subuser details for staff member ${fname} ${lname}.`);
          history.push('/generalmanager/manageuser');      
        }
        else {
          console.log(response);
          alert(`There was an error. Please try again.`);
          history.push('/generalmanager/manageuser');
        }
      });
  }

  const boldtitle = {
    fontSize:'1 0px', 
    fontWeight:'bold', 
    marginTop:'20px',
    marginBottom:'10px'
 };

  return (
    <div>
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
    </div>
  )
}
