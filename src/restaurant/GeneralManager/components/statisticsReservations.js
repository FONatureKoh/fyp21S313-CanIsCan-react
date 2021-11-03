import React from 'react'
import Chart from "react-google-charts";
import { Card, CardHeader, CardContent, Grid, Box } from '@mui/material';

export default function StatisticsReservations() {       

  const chartData = [
    ['Day', 'Deliveries'],
    ['Mon', 300],
    ['Tues', 150],
    ['Wed', 70],
    ['Thurs', 340],
    ['Fri', 500],
    ['Sat', 420],
    ['Sun', 132]
    ]

  const chartData2 = [
    ['Day', 'Reservations'],
    ['Mon', 10],
    ['Tues', 5],
    ['Wed', 7],
    ['Thurs', 4],
    ['Fri', 9],
    ['Sat', 13],
    ['Sun', 15]
    ]

  return (
    <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px', mt:'20px'}}>
      <CardHeader title="Restaurant Statistics - Reservations" />
      <CardContent >
        <Box sx={{margin:'20px auto', width: '80%'}} >
        <Grid container 
          spacing={{ xs: 2, sm: 10 }} 
          columns={{ xs: 4, sm: 10, md: 10}}
        >
          <Grid item item xs={4} sm={10} md={10} lg={5} xl={5} sx={{marginTop:'2%', marginBottom:'2%'}}>
            <Chart
            width={'600px'}
            height={'300px'}
            chartType="ColumnChart"
            loader={<div>Loading Chart</div>}
            data={chartData2}
            options={{
            title: 'Table Reservations',
            hAxis: { title: 'Day', minValue: 0},
            vAxis: { title: 'Reservations of the Day'},
            chartArea: { width: '55%', height: '70%' },
            }}
            />
          </Grid>
          <Grid item item xs={4} sm={10} md={10} lg={5} xl={5} sx={{marginTop:'2%', marginBottom:'2%'}}>
            <Chart
            width={'600px'}
            height={'300px'}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={chartData2}
            options={{
            title: 'Table Reservations',
            hAxis: { title: 'Day', minValue: 0},
            vAxis: { title: 'Reservations of the Day'},
            chartArea: { width: '55%', height: '70%' },
            }}
            />
          </Grid>
        </Grid>
        </Box>  
      </CardContent>
    </Card>
  )
}
