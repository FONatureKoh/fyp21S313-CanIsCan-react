import React from 'react'
import { Grid, Switch} from '@mui/material'
import Chart from "react-google-charts";

export default function ViewInfo({isChecked, toggleChecked}) {       

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
    <Grid container sx={{margin:'auto', width: '80%'}} >
       <Grid item xs={6} sx={{marginTop:'2%', marginBottom:'2%'}}>
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
      <Grid item xs={6} sx={{marginTop:'2%', marginBottom:'2%'}}>
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
      <Grid item xs={6} sx={{marginTop:'2%', marginBottom:'2%'}}>
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
      <Grid item xs={6} sx={{marginTop:'2%', marginBottom:'2%'}}>
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
  )
}
