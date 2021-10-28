import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardContent, Box, Typography, Stepper, Step, StepLabel, Divider, Accordion, AccordionSummary, AccordionDetails, Grid, ListItem, Button } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DelAccordion from './DelAccordion';

// DM_CONTROLLER IMPORT
import { getDOItems, getOrders } from '../dm_controller';

const themes = {
  textHeader: {
    fontSize:'1 0px', 
    fontWeight:'bold', 
    mt: '20px',
    mb: '10px'
  }
};


export default function ViewOrderHistory() {
  // useStates for the orders
  const [fulfilledDO, setFulfilledDO] = useState([]);

  // Async functions for retrieving all the pending orders
  // Async functions for order retrieval
  async function getPendingOrders() {
    try {
      const response = await getOrders(3);
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
          if(element.order_status != "fulfilled") {
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
            // console.log(fulfilledDO);
            // console.log("orderDetailsArray: " + orderDetailsArray);
            getSelectedOrderItems(element.order_ID)
              .then((response) => {
                tempJSON["items"] = response;

                // Now we get the items
                // NOTE: This round by setting the state in here, seem to have worked.
                // I tested blow, you can see that I tried a map. Looks okay. - Thomas (28/10 12:57pm)
                orderDetailsArray.push(tempJSON);
                setFulfilledDO(oldArray => [...oldArray, tempJSON]);
                fulfilledDO.map(item => console.log(item));
                // setFulfilledDO(oldArray => [...oldArray, tempJSON]);
              })
              .catch(error => console.log(error));
          } // End of if condition
        });
      })
      .catch(error => console.log(error));
  }, [])

  console.log(fulfilledDO);

  
  return (
    <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px'}}>
    <CardHeader title="Orders History" />
    <CardContent>
      <Box width="90%" sx={{margin:'0px auto', textAlign:"center"}}>
        {
          fulfilledDO.map(item=>{
            return <DelAccordion item={item}/>
          })
        }
      </Box>
    </CardContent>
  </Card>
)
}
