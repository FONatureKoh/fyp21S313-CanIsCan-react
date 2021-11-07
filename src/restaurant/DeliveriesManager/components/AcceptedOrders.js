import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardContent, Box, Typography } from '@mui/material'
import DelAccordion from './DelAccordion';

// CONTROLLER IMPORTS
import { getOrders } from '../dm_controller';

export default function AcceptedOrders() {
  // useStates for the orders
  const [acceptedDO, setAcceptedDO] = useState([]);

  // Async functions for retrieving all the pending orders
  // Async functions for order retrieval
  async function getOngoingOrders() {
    try {
      // CONTROLLER TO GET THE ORDERS. MODE 2 RETRIEVES THE ONGOING ORDERS
      // WHICH MEANS PREPARING / DELIVERING
      const response = await getOrders(2);
      return response;
    }
    catch (error) {
      return error;
    }
  }

  useEffect(() => {
    // METHOD FOR CONTROLLER TRIGGER
    getOngoingOrders()
      .then((response) => {
        setAcceptedDO(response);
      })
      .catch(error => console.log(error));
  }, [])

  return (
    <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px'}}>
    <CardHeader title="Ongoing Orders" />
      <CardContent>
        <Box width="90%" sx={{margin:'0px auto', textAlign:"center"}}>
          {acceptedDO.length === 0 ? (<>
            <Box width="80%" sx={{margin:'20px auto', textAlign:'center'}}>
              <Typography variant="h6">No ongoing orders</Typography>
            </Box>
            </>) : (<>
            {
              acceptedDO.map(item=>{
                return <DelAccordion item={item}/>
              })
            }
        </>)}
        </Box>
      </CardContent>
  </Card>
  )
}