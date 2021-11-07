import React, { useState } from 'react'
import Chart from "react-google-charts";
import { Card, CardHeader, CardContent, Grid, Box, Button, TextField, Typography } from '@mui/material';
// import CircularProgress from '@mui/material/CircularProgress';

// New Imports for the time picker
import { DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { getOrderStats } from '../rgm_controller';

export default function ViewInfo() { 
  // SOME USESTATES TO GET THE DATE
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [chartData, setChartData] = useState([]);

  // SOME USEFUL CONSTANTS
  const dayArray = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  // TRIGGER DRAWING OF DATA
  const setDateRange = () => {
    getOrderStats(startDate, endDate)
      .then((response) => {
        // Standard ChartData Array
        var tempChartData = [
          ['Day', 'Deliveries'],
          ['Mon', 0],
          ['Tues', 0],
          ['Wed', 0],
          ['Thurs', 0],
          ['Fri', 0],
          ['Sat', 0],
          ['Sun', 0]
        ]

        for (let stat of response) {
          // First we create a date object
          console.log(stat);
          const newDate = new Date(stat.dateValue);
          console.log(newDate);

          // With that, we can get a day from this
          const selectedDay = dayArray[newDate.getDay()];

          for (let data of tempChartData) {
            if (data[0] === selectedDay) {
              data[1] += stat.count
              console.log(data);
            }
          }
        }
        
        setChartData(tempChartData);
      })
  }

  // const chartData = [
  //   ['Day', 'Deliveries'],
  //   ['Mon', 300],
  //   ['Tues', 150],
  //   ['Wed', 70],
  //   ['Thurs', 340],
  //   ['Fri', 500],
  //   ['Sat', 420],
  //   ['Sun', 132]
  //   ]

  // const chartData2 = [
  //   ['Day', 'Reservations'],
  //   ['Mon', 10],
  //   ['Tues', 5],
  //   ['Wed', 7],
  //   ['Thurs', 4],
  //   ['Fri', 9],
  //   ['Sat', 13],
  //   ['Sun', 15]
  //   ]

  return (
    <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px'}}>
      <CardHeader title="Restaurant Statistics - Delivery" />
      <CardContent >
        <Box sx={{margin:'20px auto', width: '80%'}} >
        <Grid container>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="First Date" 
              value={startDate} 
              inputFormat="dd-MMM-yyyy"
              onChange={(starDateValue) => {
                setStartDate(starDateValue);
              }} 
              renderInput={(params) => 
                <TextField {...params} />
              }
            />
            <Typography sx={{textAlign:'center', margin:'15px'}}>TO</Typography>
            <DatePicker
              label="End Date" 
              value={endDate} 
              inputFormat="dd-MMM-yyyy"
              onChange={(endDateValue) => {
                setEndDate(endDateValue);
              }} 
              renderInput={(params) => 
                <TextField {...params} />
              }
            />
          </LocalizationProvider>
          <Button variant="outlined" color="inherit" onClick={setDateRange}>VIEW DATA</Button>
        </Grid>
        <Grid container 
          spacing={{ xs: 2, sm: 10 }} 
          columns={{ xs: 4, sm: 10, md: 10}}
        >

            
          <Grid item xs={4} sm={10} md={10} lg={5} xl={5} sx={{marginTop:'2%', marginBottom:'2%'}}>
            <Chart
              width={'600px'}
              height={'300px'}
              chartType="AreaChart"
              loader={<div>Loading Chart</div>}
              data={chartData}
              options={{
              title: 'Orders Delivered',
              hAxis: { title: 'Day', minValue: 0 },
              vAxis: { title: 'Orders of the Day' },
              chartArea: { width: '50%', height: '70%' },
              }}
              />
          </Grid> 
          <Grid item xs={4} sm={10} md={10} lg={5} xl={5} sx={{marginTop:'2%', marginBottom:'2%'}}>
            <Chart
              width={'600px'}
              height={'300px'}
              chartType="BarChart"
              loader={<div>Loading Chart</div>}
              data={chartData}
              options={{
              title: 'Orders Delivered',
              hAxis: { title: 'Day', minValue: 0 },
              vAxis: { title: 'Orders of the Day' },
              chartArea: { width: '50%', height: '70%' },
              }}
              />
          </Grid>
        </Grid>
        </Box>  
      </CardContent>
    </Card>

    
  )
}
