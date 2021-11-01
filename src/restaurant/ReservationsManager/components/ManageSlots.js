import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardContent, Box, TextField, Typography, Button, Grid, Divider } from '@mui/material'
import { TimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { getResSettings, saveResSettings } from '../rm_controller';
import { set } from 'date-fns';

export default function ManageSlots() {
  // useful useStates
  const [settingsID, setSettingsID] = useState(0);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [noOfTables, setNoOfTables] = useState(1);
  const [reservationIntervals, setReservationsIntervals] = useState(1);
  // const [slots, setSlots] = useState([]);

  // Creating a time to Date object
  function timeToDate (inputTime) {
    let tempTime = inputTime.split(":");
    let dt = new Date();

    // Create the date object accurately to the current date as well
    dt.setDate(dt.getDate());
    dt.setHours(tempTime[0]);
    dt.setMinutes(tempTime[1]);
    dt.setSeconds(tempTime[2]);
    
    return dt;
  }

  // Async function to load the settings
  async function getReservationSettings() {
    try {
      const response = await getResSettings();

      return response;
    }
    catch (err) {
      console.log(err);
      return err;
    }
  }

  // UseEffect to load the existing settings
  useEffect(() => {
    getReservationSettings()
      .then((response) => {
        const resSettings = response;

        setSettingsID(resSettings.rrs_ID);
        setStartTime(timeToDate(resSettings.reservation_starttime));
        setEndTime(timeToDate(resSettings.reservation_endtime));
        setReservationsIntervals(resSettings.reservation_interval);
        setNoOfTables(resSettings.max_tables);
      })
      .catch(err => {
        console.log(err);
        alert("Something went wrong");
      })
  }, [])

  // Function to save settings
  async function saveSettings() {
    try {
      const response = await saveResSettings(settingsID, startTime, endTime, reservationIntervals, noOfTables);
    }
    catch (err) {
      console.log (err);
      alert("Something went wrong.");
    }
  }

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
            <Typography sx={{fontSize:'1 0px', fontWeight:'bold', mb:'10px' }}>
              From
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="Time (From)" 
                value={startTime} 
                onChange={(newValue) => {
                  setStartTime(newValue);
                }} 
                renderInput={(params) => 
                  <TextField {...params} />
                }
              />
            </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Typography sx={{fontSize:'1 0px', fontWeight:'bold', mb:'10px' }}>
                To
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="Time (To)" 
                value={endTime} 
                onChange={(newValue) => {
                  setEndTime(newValue);
                }} 
                renderInput={(params) => 
                  <TextField {...params} />
                }
              />
            </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <TextField
                id="table-field"
                label="Number of tables"
                type="number"
                value={noOfTables}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e)=>setNoOfTables(e.target.value)}
                variant="outlined"
                sx={{margin:'20px auto 20px'}}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <TextField
                id="interval-field"
                label="Intervals (Hours)"
                type="number"
                value={reservationIntervals} 
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e)=>setReservationsIntervals(e.target.value)}
                variant="outlined"
                sx={{margin:'20px auto 20px'}}
              />
            </Grid>
            <Button onClick={saveSettings} fullWidth variant="outlined" color="inherit">Save Settings</Button>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  )
}
/* <Box>
  {slots.map(slots => {
    return <Typography>{slots.time_slot} - {slots.number}</Typography>
  })}
</Box> */
