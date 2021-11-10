import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardContent, Box, Typography } from '@mui/material'
import DelAccordion from './DelAccordion';

// DM_CONTROLLER IMPORT
import { getOrders } from '../dm_controller';

export default function ViewOrderHistory() {
  // useStates for the orders
  const [fulfilledDO, setFulfilledDO] = useState([]);

  // Async functions for retrieving all the pending orders
  // Async functions for order retrieval
  async function getFufilledOrders() {
    try {
      // CONTROLLER MODE 3 TO GET THE FULFILLED ORDERS
      const response = await getOrders(3);
      return response;
    }
    catch (error) {
      return error;
    }
  }

  useEffect(() => {
    // METHOD TO TRIGGER CONTROLLER
    getFufilledOrders()
      .then((response) => {
        setFulfilledDO(response);
      })
      .catch(error => console.log(error));

    // INTERVAL TO RELOAD THE ORDERS EVERY 10 SECONDS
    const ordersInterval = setInterval(() => {
      getFufilledOrders()
        .then((response) => {
          setFulfilledDO(response);
        })
        .catch(error => console.log(error));
    }, 10000)

    return () => clearInterval(ordersInterval);
  }, [])

  return (
    <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px'}}>
    <CardHeader title="Orders History" />
    <CardContent>
      <Box width="90%" sx={{margin:'0px auto', textAlign:"center"}}>
        {fulfilledDO.length === 0 ? (<>
          <Box width="80%" sx={{margin:'20px auto', textAlign:'center'}}>
            <Typography variant="h6">No pending orders</Typography>
          </Box>
          </>) : (<>
          {
            fulfilledDO.map(item=>{
              return <DelAccordion item={item}/>
            })
          }
        </>)}
      </Box>
    </CardContent>
  </Card>
)
}
