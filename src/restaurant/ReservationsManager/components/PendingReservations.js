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
      // THIS IS THE CONTROLLER TO RETRIEVE THE PENDING RESERVATIONS
      // CONTROLLER TAKES IN A MODE, 1 BEING RETRIEVE PENDING
      const response = await getReservations(1);
      return response;
    }
    catch (error) {
      return error;
    }
  }

  // useEffect to load the data once
  useEffect(() => {
    // FUNCTION TO TRIGGER CONTROLLER
    getPendingReservations()
      .then((reservations) => {
        setReservations(reservations);

        // Construct dates into a tempArray
        const tempDatesArray = []
        reservations.map(reservation => {
          if(tempDatesArray.indexOf(reservation.date) === -1){
            tempDatesArray.push(reservation.date);
          }
          return tempDatesArray;
        })

        // Set the dates
        setDates(tempDatesArray);
      })
      .catch(err => {
        console.log("PendingReservations.js error!")
      });
  }, []);

  console.log("reservation mani", dates);
  return (
    <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px'}}>
      <CardHeader title="View Pending Reservations" />
      <CardContent >
        <Box> 
          {
            dates.map((date) => {
              return (<>
                <Box textAlign="center" sx={{margin:'20px auto 10px'}}>
                  <Typography variant="subtitle1" sx={{fontSize:'1 0px', fontWeight:'bold'}}>{date}</Typography>
                  <Divider sx={{mt:'10px'}} variant="middle"/>
             
                  <Box textAlign="left" sx={{mb:'30px'}}>
                  {
                    reservations.map((reservation) =>{
                      if (reservation.date === date)
                        return <ResAccordion reservation={reservation} setReservations={setReservations}/>
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
