import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardContent, Box, Typography } from '@mui/material'
import { getOrders, getDOItems } from '../dm_controller';
import DelAccordion from './DelAccordion';

// const themes = {
//   textHeader: {
//     fontSize:'1 0px', 
//     fontWeight:'bold', 
//     mt: '20px',
//     mb: '10px'
//   }
// };

export default function AcceptedOrders() {
  // useStates for the orders
  const [acceptedDO, setAcceptedDO] = useState([]);

  // Async functions for retrieving all the pending orders
  // Async functions for order retrieval
  async function getPendingOrders() {
    try {
      const response = await getOrders(2);
      return response;
    }
    catch (error) {
      return error;
    }
  }

  // Async function for item retrieval
  async function getSelectedOrderItems(orderID) {
    try {
      const response = await getDOItems(orderID);
      return response;
    }
    catch (error) {
      return error;
    }
  }

  useEffect(() => {
    // Get the orders first
    getPendingOrders()
      .then((response) => {
        // console.log(response);
        // Declare a temp array

        var orderDetailsArray = [];

        response.forEach(element => {
          // So if the order isn't fulfilled, then construct
          if(element.order_status !== "fulfilled") {
            // Declare a temp json
            var tempJSON = {};
            
            tempJSON = {
              orderID: element.order_ID,
              restID: element.o_rest_ID,
              customerName: element.o_cust_name,
              address: element.delivery_address + " S(" + element.delivery_postal_code + ")",
              price: element.total_cost,
              status: element.order_status
            }

            // // Console logging 
            // console.log(acceptedDO);
            // console.log("orderDetailsArray: " + orderDetailsArray);
            getSelectedOrderItems(element.order_ID)
              .then((response) => {
                tempJSON["items"] = response;

                // Now we get the items
                // NOTE: This round by setting the state in here, seem to have worked.
                // I tested blow, you can see that I tried a map. Looks okay. - Thomas (28/10 12:57pm)
                orderDetailsArray.push(tempJSON);
                setAcceptedDO(oldArray => [...oldArray, tempJSON]);
                
                // acceptedDO.map(item => console.log(item));
                // setAcceptedDO(orderDetailsArray);
              })
              .catch(error => console.log(error));
          } // End of if condition
        });
      })
      .catch(error => console.log(error));
  }, [])

  console.log(acceptedDO);

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