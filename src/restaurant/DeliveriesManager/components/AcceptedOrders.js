import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardContent, Box, Typography, Stepper, Step, StepLabel, Divider, Accordion, AccordionSummary, AccordionDetails, Grid, ListItem, Button } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getPendingDeliveryOrders, getDOItems } from '../dm_controller';

const themes = {
  textHeader: {
    fontSize:'1 0px', 
    fontWeight:'bold', 
    mt: '20px',
    mb: '10px'
  }
};

export default function AcceptedOrders() {
  // useStates for the orders
  const [pendingDO, setPendingDO] = useState([]);

  // Async functions for retrieving all the pending orders
  // Async functions for order retrieval
  async function getPendingOrders() {
    try {
      const response = await getPendingDeliveryOrders();
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
            // console.log(pendingDO);
            // console.log("orderDetailsArray: " + orderDetailsArray);
            getSelectedOrderItems(element.order_ID)
              .then((response) => {
                tempJSON["items"] = response;

                // Now we get the items
                // NOTE: This round by setting the state in here, seem to have worked.
                // I tested blow, you can see that I tried a map. Looks okay. - Thomas (28/10 12:57pm)
                orderDetailsArray.push(tempJSON);
                setPendingDO(orderDetailsArray);

                pendingDO.map(item => console.log(item));
                // setPendingDO(oldArray => [...oldArray, tempJSON]);
              })
              .catch(error => console.log(error));
          } // End of if condition
        });
      })
      .catch(error => console.log(error));
  }, [])

  console.log(pendingDO);

  // ACCORDION CONTROL
  const [accOpen, setAccOpen] = useState(false);

  //CART TESTING
  const [realCart, setRealCart]= useState([
    {
      id: 1,
      item: 'dog food',
      price: 12.1,
      qty: 3 
    },
    {
      id: 2,
      item: 'cat food',
      price: 13,
      qty: 2
    },
    {
      id: 3,
      item: 'giraffe food',
      price: 23,
      qty: 1
    },
    {
      id: 4,
      item: 'giraffe food',
      price: 23,
      qty: 1
    },
    {
      id: 5,
      item: 'giraffe food',
      price: 23,
      qty: 1
    }
  ])

  return (
    <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px'}}>
    <CardHeader title="Pending Orders" />
    <CardContent>
      <>
      <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px', width:'80%', margin:'0px auto'}}>
        <CardContent >
          <Box width="100%" sx={{margin:'0px auto', textAlign:"center"}}>
            <Accordion sx={{border:'1px solid #eeeeee', mt:'20px'}} expanded={accOpen} >
              {/* HEADER OF ACCORDION */}
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="item-details"
                id="item-details"
                sx={{borderBottom:'0.5px solid #eeeeee'}}
                onClick={()=>{setAccOpen(!accOpen)}}
              >
                <Typography sx={{fontSize:'1 0px', fontWeight:'bold', }}>
                  Order #333333
                </Typography>
              </AccordionSummary>
              {/* INNDER ACCORDION */}
              <AccordionDetails>
                {realCart.map(item => (
                  <ListItem key={item.id} sx={{margin:'20px auto'}}>
                    <Box width='70%'>
                      <Typography variant="h6">
                        {item.item}
                      </Typography>
                      <Typography variant="subtitle">
                        Unit Price: S${item.price.toFixed(2)}
                      </Typography>
                    </Box>
                    <Box width='30%' textAlign='right' sx={{mt:'10px'}}>
                      <Typography variant="subtitle2">
                        Quantity: {item.qty}
                      </Typography>
                        <Typography variant="subtitle2">
                          Price: S$ {(item.qty * item.price).toFixed(2)}
                          
                        </Typography>
                      </Box>
                  </ListItem>
                ))}
                <Box m={1} pt={1}>
                <Button variant="outlined" id="1" color="inherit" fullWidth>Completed
                </Button>
                </Box>
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{border:'1px solid #eeeeee', mt:'20px'}} expanded={accOpen} >
              {/* HEADER OF ACCORDION */}
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="item-details"
                id="item-details"
                sx={{borderBottom:'0.5px solid #eeeeee'}}
                onClick={()=>{setAccOpen(!accOpen)}}
              >
                <Typography sx={{fontSize:'1 0px', fontWeight:'bold', }}>
                  Order #555555
                </Typography>
              </AccordionSummary>
              {/* INNDER ACCORDION */}
              <AccordionDetails>
                {realCart.map(item => (
                  <ListItem key={item.id} sx={{margin:'20px auto'}}>
                    <Box width='70%'>
                      <Typography variant="h6">
                        {item.item}
                      </Typography>
                      <Typography variant="subtitle">
                        Unit Price: S${item.price.toFixed(2)}
                      </Typography>
                    </Box>
                    <Box width='30%' textAlign='right' sx={{mt:'10px'}}>
                      <Typography variant="subtitle2">
                        Quantity: {item.qty}
                      </Typography>
                        <Typography variant="subtitle2">
                          Price: S$ {(item.qty * item.price).toFixed(2)}
                        </Typography>
                      </Box>
                  </ListItem>
                ))}
                <Box m={1} pt={1}>
                <Button variant="outlined" id="2" color="inherit" fullWidth>Completed
                </Button>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
        </CardContent>
      </Card>
        </>
    </CardContent>
  </Card>
  )
}