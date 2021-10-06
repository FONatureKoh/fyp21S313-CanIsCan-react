import React from 'react'
import { Button, CardContent, CardHeader, Typography, Card, Box, TextField, FormControl, InputLabel, Select, MenuItem} from '@mui/material'

export default function AddSubUser() {
  const [role, setRole] = React.useState('');

  const handleChange = (event) => {
    setRole(event.target.value);
  };

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
                <TextField sx={{width:'100%', mb:'20px'}} id="filled-basic" label="Name:" variant="filled" size="small"/>
                <TextField sx={{width:'100%', mb:'20px'}} id="filled-basic" label="Email:" variant="filled" size="small"/>
                <TextField sx={{width:'100%', mb:'20px'}} id="filled-basic" label="Phone No.:" variant="filled" size="small"/>
                <Typography sx={boldtitle}>Role:</Typography>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={role}
                    label="Role"
                    onChange={handleChange}
                  >
                    <MenuItem value={'DM'}>Deliveries Manager</MenuItem>
                    <MenuItem value={'RM'}>Reservations Manager</MenuItem>
                  </Select>
                </FormControl>

                <Box alignSelf="center" display='flex' flexDirection="row" sx={{mt: '20px'}}>
                  <Button variant="contained" color="inherit" sx={{width: '45%', alignSelf:'flex-start', bgcolor:'#969696'}}>Update</Button>
                  <Box sx={{width:'10%'}}></Box>
                  <Button variant="contained" color="inherit" sx={{width: '45%', alignSelf:'flex-end'}}>Cancel</Button>
                </Box>
              </Box>


          </Box>
        </CardContent>
      </Card>
    </div>
  )
}
