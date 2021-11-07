import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardContent, Box, Typography } from '@mui/material'
import DelAccordion from './DelAccordion';

// DM_CONTROLLER IMPORT
import { getOrders } from '../dm_controller';

export default function ViewPending() {
  // useStates for the orders
  const [pendingDO, setPendingDO] = useState([]);

  // Async functions for retrieving all the pending orders
  // Async functions for order retrieval
  async function getPendingOrders() {
    try {
      // CONTROLLER TO GET THE ORDERS. TAKES IN A MODE, WHICH IS 1 IN THIS CASE
      // TO RETRIEVE THE PENDING ORDERS
      const response = await getOrders(1);

      return response;
    }
    catch (error) {
      return error;
    }
  }

  useEffect(() => {
    // Get the orders first
    // console.log("Use Effect triggered");
    // THIS TRIGGERS THE CONTROLLER
    getPendingOrders()
      .then((response) => {
        setPendingDO(response);
      })
      .catch(error => console.log(error));
  }, [])

  
  
  return (
    <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px'}}>
    <CardHeader title="Pending Orders" />
    <CardContent>
      <Box width="90%" sx={{margin:'0px auto', textAlign:"center"}}>
        {pendingDO.length === 0 ? (<>
            <Box width="80%" sx={{margin:'20px auto', textAlign:'center'}}>
              <Typography variant="h6">No pending orders</Typography>
            </Box>
            </>) : (<>
            {
              pendingDO.map(item=>{
                return <DelAccordion item={item}/>
              })
            }
        </>)}
        
      </Box>
    </CardContent>
  </Card>
)
}
