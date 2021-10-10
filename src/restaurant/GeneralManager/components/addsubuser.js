import React, {useState} from 'react'
import { Button, CardContent, CardHeader, Typography, Card, Box, TextField, FormControl, InputLabel, Select, MenuItem} from '@mui/material'
import { Link } from 'react-router-dom';

export default function AddSubUser() {

  const [username, setUsername] = useState();
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [role, setRole] = useState();

  const boldtitle = {
    fontSize:'1 0px', 
    fontWeight:'bold', 
    marginTop:'20px',
    marginBottom:'10px'
 };

  return (
    <div>
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
                     onChange={(e) => setFname(e.target.value)}
                  >
                    <MenuItem value={'Deliveries Manager'}>Deliveries Manager</MenuItem>
                    <MenuItem value={'Reservations Manager'}>Reservations Manager</MenuItem>
                  </Select>
                </FormControl>

                <Box alignSelf="center" display='flex' flexDirection="row" sx={{mt: '20px'}}>
                  <Button variant="contained" color="inherit" sx={{width: '45%', alignSelf:'flex-start', bgcolor:'#969696'}}>Add User</Button>
                  <Box sx={{width:'10%'}}></Box>
                  <Button variant="contained" color="inherit" sx={{width: '45%', alignSelf:'flex-end'}} component={Link} to="/generalmanager/manageuser">Cancel</Button>
                </Box>
              </Box>


          </Box>
        </CardContent>
      </Card>
    </div>
  )
}
