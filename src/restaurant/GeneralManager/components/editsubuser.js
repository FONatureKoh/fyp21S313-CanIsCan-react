import React, { useState } from 'react'
import { Button, CardContent, CardHeader, Typography, Card, Box, TextField, FormControl, InputLabel, Select, MenuItem} from '@mui/material'
import { useRouteMatch } from 'react-router'
import { Link } from 'react-router-dom';

export default function EditSubUser({userData}) {
  const match = useRouteMatch('/generalmanager/manageuser/editsubuser/:id');
  

  let subSelected;
  for(const sub of userData)
  {
    if(sub.id === parseInt(match.params.id) )
    {
      subSelected = sub;
      break;
    }
  }

  console.log(subSelected);

  //states to draw from form
  const [subID, setSubID] = useState(subSelected.id);
  const [username, setUsername] = useState(subSelected.id);
  const [fname, setFname] = useState(subSelected.name);
  const [lname, setLname] = useState(subSelected.name);
  const [email, setEmail] = useState(subSelected.name);
  const [phone, setPhone] = useState(subSelected.name);
  const [role, setRole] = useState(subSelected.type);

  function submitEdit()
  {
    //update functions goes here
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
                  label="Email:" 
                  variant="filled" 
                  size="small"
                  defaultValue={email}
                  onChange={(e) => setEmail(e.target.value)}
                  />

                <TextField sx={{width:'100%', mb:'20px'}} 
                  id="filled-basic" 
                  type="number"
                  label="Phone No.:" 
                  variant="filled" 
                  size="small"
                  defaultValue={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
                    <MenuItem value={'Deliveries Manager'}>Deliveries Manager</MenuItem>
                    <MenuItem value={'Reservations Manager'}>Reservations Manager</MenuItem>
                  </Select>
                </FormControl>

                <Box alignSelf="center" display='flex' flexDirection="row" sx={{mt: '20px'}}>
                  <Button variant="contained" color="inherit" sx={{width: '45%', alignSelf:'flex-start', bgcolor:'#969696'}}>Update</Button>
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
