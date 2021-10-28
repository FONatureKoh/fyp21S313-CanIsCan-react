import React, {useState} from 'react'
import { Card, CardHeader, CardContent, Box, TextField, Typography, Button, Grid, Divider} from '@mui/material'
import { TimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

export default function ManageSlots() {
  
  const [timeSlot, setTimeSlot] = useState(new Date());
  const [numberTable, setNumberTable] = useState(1);
  const [int, setInt] = useState(1);
  const [slots, setSlots] = useState([]);

  // function handleAdd()
  // {
  //   const hours = timeSlot.getHours();
  //   const mins = timeSlot.getMinutes();
  //   const newSlots = [...slots, {time_slot: `${hours}:${mins}`, number:number}]
  //   setSlots(newSlots)
  //   console.log(slots)
  // }

  return (
    <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px'}}>
      <CardHeader title="Manage Slots" />
      <CardContent >
        <Box sx={{width:'80%', margin:'20px auto'}} > 
          <Grid container>
          <Grid item xs={12} sm={12} md={6} >
          <Typography sx={{fontSize:'1 0px', fontWeight:'bold', mb:'10px' }}>From</Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="Time (From)" 
                value={timeSlot} 
                onChange={(newValue) => {
                  setTimeSlot(newValue);
                }} 
                renderInput={(params) => 
                  <TextField {...params} />
                }
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Typography sx={{fontSize:'1 0px', fontWeight:'bold', mb:'10px' }}>To</Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            label="Time (To)" 
            value={timeSlot} 
            onChange={(newValue) => {
              setTimeSlot(newValue);
            }} 
            renderInput={(params) => 
              <TextField {...params} />
            }
          />
          </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            
            <TextField
              id="filled-number"
              label="Number of tables"
              type="number"
              value={numberTable}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e)=>setNumberTable(e.target.value)}
              variant="filled"
              sx={{margin:'20px auto 20px'}}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            
            <TextField
              id="filled-number"
              label="Intervals (Hours)"
              type="number"
              value={int}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e)=>setInt(e.target.value)}
              variant="filled"
              sx={{margin:'20px auto 20px'}}
            />
          </Grid>
          
        
          
        
        <Button fullWidth variant="outlined" color="inherit">Add</Button>

        {/* <Box>
          {slots.map(slots => {
            return <Typography>{slots.time_slot} - {slots.number}</Typography>
          })}
        </Box> */}
        </Grid>
        </Box>
      </CardContent>
    </Card>
  )
}
