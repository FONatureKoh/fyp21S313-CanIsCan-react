import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardContent, Box, TextField, Typography, Button, Grid, Divider } from '@mui/material'
import { TimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { getResSettings, saveResSettings } from '../rm_controller';
import { set } from 'date-fns';
import { useHistory } from 'react-router';

export default function ManageSlots() {
  // Declaring history
  const history = useHistory();

  // useful useStates
  const [resSettings, setResSettings] = useState({});
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
        setResSettings(response)
        setStartTime(timeToDate(response.reservation_starttime));
        setEndTime(timeToDate(response.reservation_endtime));
        setReservationsIntervals(response.reservation_interval);
        setNoOfTables(response.max_tables);
      })
      .catch(err => {
        console.log(err);
        alert("Something went wrong");
      })
  }, [])

  // Function to save settings
  async function saveSettings() {
    try {
      // We do the verification here first, since it is rather simple to validate the timestring
      // First we convert the times to string
      const convertedStartTime = startTime.toLocaleTimeString('en-GB');
      const convertedEndTime = endTime.toLocaleTimeString('en-GB');

      // Then we get the restaurant's opening closing hours
      const openingTime = resSettings.rest_opening_time;
      const closingTime = resSettings.rest_closing_time;

      console.log(openingTime, closingTime);
      // We first validate that the start time is earlier than the end time
      if (convertedStartTime < convertedEndTime) {
        if (convertedStartTime < openingTime || convertedEndTime > closingTime) {
          var alertMsg = "Your chosen start or end time is invalid, please note your opening and closing hours.\n\n"
          alertMsg += `Opening Hours: ${openingTime}\n`;
          alertMsg += `Closing Hours: ${closingTime}`;

          alert(alertMsg);
        }
        else {
          const response = await saveResSettings(resSettings.rrs_ID, resSettings.rrs_rest_ID, 
            startTime, endTime, reservationIntervals, noOfTables);

          if (response.api_msg == "success") {
            alert("You have successfully set your restaurant's reservations settings. Redirecting you to pending reservations.");
            history.push('/reservationsmanager');
          }
        }
      }
      else {
        alert("You have chosen a later start time then the end time, please try again!")
      }

      
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
