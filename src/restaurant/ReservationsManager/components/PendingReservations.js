import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardContent, Box } from '@mui/material'
import { getReservations } from '../rm_controller';
import { response } from 'express';
import ResAccordion from './ResAccordion';

export default function PendingReservations() {
  // useStates for the orders
  const [reservations, setReservations] = useState([]);

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
      .then((response) => setReservations(response))
      .catch(err => {
        console.log("PendingReservations.js error!")
      });
  }, []);

  return (
    <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px'}}>
      <CardHeader title="View Pending Reservations" />
      <CardContent >
        <Box> 
          {
            reservations.map(reservation=>{
              return <ResAccordion reservation={reservation}/>
            })
          }
        </Box>
      </CardContent>
    </Card>
  )
}
