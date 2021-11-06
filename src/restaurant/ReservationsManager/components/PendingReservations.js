import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardContent, Box, Typography, Divider } from '@mui/material'
import { getReservations } from '../rm_controller';
import ResAccordion from './ResAccordion';

export default function PendingReservations() {
  // useStates for the orders
  const [reservations, setReservations] = useState([]);
  const [dates, setDates] = useState([]);

  // Async functions for retrieving all the pending orders
  // Async functions for order retrieval
  async function getPendingReservations() {
    try {
      const response = await getReservations(1);
      return response;
    }
    catch (error) {
      return error;
    }
  }

  // useEffect to load the data once
  useEffect(() => {
    getPendingReservations()
      .then((response) => {
        setReservations(response);
        const dates2 = []
        response.map(date => {
          if(dates2.indexOf(date.date) === -1){
            dates2.push(date.date);
          }}
        )
        setDates(dates2);
      })
      .catch(err => {
        console.log("PendingReservations.js error!")
      });
  }, []);

  console.log("reservation mani", dates)
  return (
    <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px'}}>
      <CardHeader title="View Pending Reservations" />
      <CardContent >
        <Box> 
          {
            dates.map(date => {
              return (<>
                <Box textAlign="center" sx={{margin:'20px auto 10px'}}>
                  <Typography variant="subtitle1" sx={{fontSize:'1 0px', fontWeight:'bold'}}>{date}</Typography>
                  <Divider sx={{mt:'10px'}} variant="middle"/>
             
                  <Box textAlign="left" sx={{mb:'30px'}}>
                  {
                    reservations.map(reservation=>{
                      if (reservation.date === date)
                        return <ResAccordion reservation={reservation}/>
                    })
                  }
                  </Box>
                </Box>
              </>
              )
            })
          }
          
        </Box>
      </CardContent>
    </Card>
  )
}
