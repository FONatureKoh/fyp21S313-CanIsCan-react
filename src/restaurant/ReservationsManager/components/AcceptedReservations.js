import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardContent, Box } from '@mui/material'
import { getReservations } from '../rm_controller';
import ResAccordion from './ResAccordion';

export default function AcceptedReservations() {
  // useStates for the orders
  const [reservations, setReservations] = useState([]);

  // Async functions for retrieving all the pending orders
  // Async functions for order retrieval
  async function getPendingReservations() {
    try {
      const response = await getReservations(2);
      return response;
    }
    catch (error) {
      return error;
    }
  }

  // useEffect to load the data once
  useEffect(() => {
    getPendingReservations()
      .then((response) => setReservations(response))
      .catch(err => {
        console.log("AcceptedReservations.js error!")
      });
  }, []);

  return (
    <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px'}}>
      <CardHeader title="View Accepted Reservations" />
      <CardContent >
        <Box > 
          {
            reservations.map(reservation=>{
              return <ResAccordion reservation={reservation} setReservations={setReservations}/>
            })
          }
        </Box>
      </CardContent>
    </Card>
  )
}
