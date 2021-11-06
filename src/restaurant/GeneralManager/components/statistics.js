import React from 'react'
import Chart from "react-google-charts";
import { Card, CardHeader, CardContent, Grid, Box } from '@mui/material';
// import CircularProgress from '@mui/material/CircularProgress';

export default function ViewInfo() {       

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
