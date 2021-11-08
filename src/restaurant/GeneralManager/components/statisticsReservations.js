import React, { useState } from 'react'
import Chart from "react-google-charts";
import { Card, CardHeader, CardContent, Grid, Box, Button, TextField, Typography  } from '@mui/material';

// New Imports for the time picker
import { DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { getReservationStats } from '../rgm_controller';

export default function StatisticsReservations() {
  // SOME USESTATES TO GET THE DATE
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [chartData, setChartData] = useState([]);
  const [total, setTotal] = useState(0);
  const [popTimeslot, setPopTimeslot] = useState(["No Data yet"]); // Pop as in Popular

  // SOME USEFUL CONSTANTS
  const dayArray = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  // TRIGGER DRAWING OF DATA
  const setDateRange = () => {

    // THIS IS THE CONTROLLER TO GET THE DATA
    getReservationStats(startDate, endDate)
      .then((response) => {
        // Standard ChartData Array
        var tempChartData = [
          ['Day', 'Reservations'],
          ['Mon', 0],
          ['Tues', 0],
          ['Wed', 0],
          ['Thurs', 0],
          ['Fri', 0],
          ['Sat', 0],
          ['Sun', 0]
        ]

        var totalReservations = 0;                 

        for (let stat of response.dataArray) {
          // First we create a date object
          console.log(stat);
          const newDate = new Date(stat.dateValue);
          console.log(newDate);

          // With that, we can get a day from this
          const selectedDay = dayArray[newDate.getDay()];


          for (let data of tempChartData) {
            if (data[0] === selectedDay) {
              data[1] += stat.count;
              totalReservations += stat.count;
              console.log(data);
            }
          }
        }
        
        setTotal(totalReservations);
        setChartData(tempChartData);
        setPopTimeslot(response.timeslotArray);
      })
  }

  return <>
    <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px', mt:'20px'}}>
      <CardHeader title="Restaurant Statistics - Reservations" />
      <CardContent >
        <Box sx={{margin:'20px auto', width: '80%'}} >
          <Box sx={{width:'100%', margin:"20px auto"}}>
              <Grid container spacing={5}
                alignItems="center"
                justifyContent="center">
                  <Grid item xs={12} sm={12} md={2.5} >
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
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={12} md={1} >
                    <Typography sx={{textAlign:'center', margin:'15px'}}>TO</Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={2.5} >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                </Grid>
              <Grid item xs={12} sm={12} md={2} sx={{display:'flex', flexDirection:'column', justifyContent:'center'}} >
                <Button variant="outlined" color="inherit" onClick={setDateRange}>VIEW DATA</Button> 
              </Grid>
          </Grid>
        </Box>
        <Grid container 
          spacing={{ xs: 2, sm: 10 }} 
          columns={{ xs: 4, sm: 10, md: 10}}
        >
          {/* TOTAL EARNINGS CARD */}
          <Grid item xs={4} sm={10} md={10} lg={5} xl={5} sx={{marginTop:'2%', marginBottom:'2%'}}>
            <Card sx={{bgcolor:"#eeeeee", height:'45%', borderRadius:'15px'}}>
              <CardContent>
                <Typography variant="h5">Total reservations</Typography>
                <Typography variant="subtitle2">from {startDate.toLocaleDateString("en-GB")} to {endDate.toLocaleDateString("en-GB")}</Typography>
                <Box sx={{margin:'5px auto', textAlign:'center'}}>
                  <Typography sx={{fontSize:'1 0px', fontWeight:'bold'}} variant="h5">{total === 0 ? "No data yet" : `${total} reservation(s)`}</Typography>
                </Box>
              </CardContent>
            </Card>

            {/* POPULAR ITEM */}
            <Card sx={{bgcolor:"#eeeeee", height:'45%', mt:'3%', borderRadius:'15px'}}>
              <CardContent>
                <Typography variant="h5">Most popular timeslot</Typography>
                <Typography variant="subtitle2">Reservations</Typography>
                <Box sx={{margin:'5px auto', textAlign:'center'}}>
                  <Typography sx={{fontSize:'1 0px', fontWeight:'bold'}} variant="h5">{popTimeslot.toString()}</Typography>
                </Box>
              </CardContent>
            </Card>
          {/* <Grid item xs={4} sm={10} md={10} lg={5} xl={5} sx={{marginTop:'2%', marginBottom:'2%'}}>
            <Chart
              width={'600px'}
              height={'300px'}
              chartType="AreaChart"
              loader={<div>Loading Chart</div>}
              data={chartData}
              options={{
              title: 'Table Reservations',
              hAxis: { title: 'Day', minValue: 0 },
              vAxis: { title: 'Orders of the Day' },
              chartArea: { width: '50%', height: '70%' },
              }}
            /> */}
          </Grid> 
          <Grid item xs={4} sm={10} md={10} lg={5} xl={5} sx={{marginTop:'2%', marginBottom:'2%'}}>
            <Chart
              width={'600px'}
              height={'300px'}
              chartType="ColumnChart"
              loader={<div>Loading Chart</div>}
              data={chartData}
              options={{
              title: 'Table Reservations',
              hAxis: { title: 'Day', minValue: 0},
              vAxis: { title: 'Reservations of the Day'},
              chartArea: { width: '55%', height: '70%' },
              colors: ['#bdbdbd'],
            }}
            />
          </Grid>
          {/* <Grid item xs={4} sm={10} md={10} lg={5} xl={5} sx={{marginTop:'2%', marginBottom:'2%'}}>
            <Chart
            width={'600px'}
            height={'300px'}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={chartData}
            options={{
            title: 'Table Reservations',
            hAxis: { title: 'Day', minValue: 0},
            vAxis: { title: 'Reservations of the Day'},
            chartArea: { width: '55%', height: '70%' },
            }}
            />
          </Grid> */}
        </Grid>
        </Box>  
      </CardContent>
    </Card>
  </>
}
