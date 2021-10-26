import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardContent, Box, Typography, Stepper, Step, StepLabel, Divider, Accordion, AccordionSummary, AccordionDetails, Grid, ListItem, Button } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getAllOrderItems, getAllOrders } from '../customer_controller';

const themes = {
  textHeader: {
    fontSize:'1 0px', 
    fontWeight:'bold', 
    mt: '20px',
    mb: '10px'
  }
};

//STEPPER - FOR STATUS
const steps = [
  'Order accepted',
  'Preparing order',
  'Order on the way',
  'Order delivered'
];


export default function DeliveryHistory() {
  // useStates for orders
  const [orderHistory, setOrderHistory] = useState([]);

  // Async functions for order retrieval
  async function getOrders() {
    try {
      const response = await getAllOrders();
      return response;
    }
    catch (error) {
      return error;
    }
  }

  // Async function for item retrieval
  async function getSelectedOrderItems(orderID) {
    try {
      const response = await getAllOrderItems(orderID);
      return response;
    }
    catch (error) {
      return error;
    }
  }

  // useEffect to load all these data in for first render
  useEffect(() => {
    // Get the orders first
    getOrders()
      .then((response) => {
        // Declare a temp array
        var orderDetailsArray = [];

        console.log(response);

        response.forEach(element => {
          // Declare a temp json
          var tempJSON = {};
          
          tempJSON = {
            orderID: element.order_ID,
            restaurantName: element.o_rest_name,
            address: element.delivery_address + " S(" + element.delivery_postal_code + ")",
            price: element.total_cost,
            status: element.order_status
          }

          // Now we get the items
          getSelectedOrderItems(element.order_ID)
            .then((response) => {
              tempJSON["items"] = response;

              orderDetailsArray.push(tempJSON);
            })
            .catch(error => console.log(error));
        });

        setOrderHistory(orderDetailsArray);
        console.log(orderDetailsArray);
      })
      .catch(error => console.log(error));
  }, [])

  // ACCORDION CONTROL
  const [accOpen, setAccOpen] = useState(false);
  const [buttonTab, setButtonTab] = useState(1);
  
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
        <CardHeader title="Orders History" />
        <CardContent >
        <Box sx={{margin:'0px 10px 20px', textAlign:'right'}}>
          <Button variant="outlined" color="inherit" sx={{marginRight:'20px'}} onClick={()=> setButtonTab(1)}>active order</Button>
          <Button variant="outlined" color="inherit" onClick={()=> setButtonTab(2)}>Past Orders</Button>
        </Box>
        
        {
          buttonTab === 1 ? (
          <>
          {/* ACTIVE ORDER DETAILS */}
          <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px', width:'80%', margin:'0px auto'}}>
            <CardHeader title="Active Order" sx={{textAlign:"center"}}/>
            <CardContent >
              <Box width="80%" sx={{margin:'0px auto', textAlign:"center"}}> 
                <Typography variant="subtitle1"  sx={{fontSize:'1 0px', fontWeight:'bold', }}>
                  Your order from
                </Typography>
                <Typography variant="subtitle1" >
                  Restaurant Name
                </Typography>
                <Typography variant="subtitle2" sx={themes.textHeader}>
                  Order Status
                </Typography>
                <Stepper activeStep={1} alternativeLabel sx={{mb:'40px', '&.MuiStepConnector-line':{bgcolor:"#444444"}}}>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                
                <Divider variant="middle" />
                <Typography variant="subtitle1" sx={themes.textHeader}>
                  Order Details
                </Typography>
                
                {/* START OF CONTENT BELOW 'ORDER DETAILS' */}
                <Grid container>
                    <Grid item xs={12} md={12} sm={12}>
                      <Typography variant="subtitle1" textAlign="left" sx={{fontSize:'1 0px', fontWeight:'bold', }}>
                        Order Number
                      </Typography>
                      <Typography variant="subtitle1" textAlign="left">
                        123786
                      </Typography>
                    </Grid>
                    <Grid item xs={8} md={8} sm={8}>
                      <Typography variant="subtitle1" textAlign="left" sx={{fontSize:'1 0px', fontWeight:'bold', }}>
                        Address
                      </Typography>
                      <Typography variant="subtitle1" textAlign="left">
                        930 Hougang Street 91 #12-117 
                      </Typography>
                    </Grid>
                    <Grid item xs={4} md={4} sm={4}>
                      <Typography variant="subtitle1" textAlign="left" sx={{fontSize:'1 0px', fontWeight:'bold', }}>
                        Total Price
                      </Typography>
                      <Typography variant="subtitle1" textAlign="left">
                        S${}
                      </Typography>
                    </Grid>
                </Grid>

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
                      Item Details
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
                  </AccordionDetails>
                </Accordion>
              </Box>
            </CardContent>
          </Card>
          {/* END OF ACTIVE ORDER */}
            </>
          ) : 
          (
            <>
            {/* START OF PAST ORDERS */}
            {
              orderHistory.map(order => {
                <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px', width:'80%', margin:'0px auto'}}>
                  <Box sx={{float:'right', margin:'5px 10px 0px 0px', position:'absolute', right:'11%'}}>
                    <Button variant='contained' color="inherit" >order again</Button>
                  </Box>
                </Card>
              })
            }
            <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px', width:'80%', margin:'0px auto'}}>
              <Box sx={{float:'right', margin:'5px 10px 0px 0px', position:'absolute', right:'11%'}}>
                <Button variant='contained' color="inherit" >order again</Button>
              </Box>
              <CardContent >
              <Box width="80%" sx={{margin:'0px auto', textAlign:"center"}}>
                <Typography variant="subtitle1" sx={{fontSize:'1 0px', fontWeight:'bold', mb:'10px' }}>
                  Order number - 123552
                </Typography>
                
                <Divider variant="middle" />
                <Typography variant="subtitle1" sx={themes.textHeader}>
                  Order Details
                </Typography>
                {/* START OF CONTENT BELOW 'ORDER DETAILS' */}
                <Grid container>
                    <Grid item xs={8} md={8} sm={8}>
                      <Typography variant="subtitle1" textAlign="left" sx={{fontSize:'1 0px', fontWeight:'bold', }}>
                        Fulfilled by
                      </Typography>
                      <Typography variant="subtitle1" textAlign="left">
                        Restaurant Name
                      </Typography>
                    </Grid>
                    <Grid item xs={4} md={4} sm={4}>
                      <Typography variant="subtitle1" textAlign="left" sx={{fontSize:'1 0px', fontWeight:'bold', }}>
                        Status
                      </Typography>
                      <Typography variant="subtitle1" textAlign="left">
                        Fulfilled / Cancelled
                      </Typography>
                    </Grid>
                    <Grid item xs={8} md={8} sm={8}>
                      <Typography variant="subtitle1" textAlign="left" sx={{fontSize:'1 0px', fontWeight:'bold', }}>
                        Address
                      </Typography>
                      <Typography variant="subtitle1" textAlign="left">
                        930 Hougang Street 91 #12-117 
                      </Typography>
                    </Grid>
                    <Grid item xs={4} md={4} sm={4}>
                      <Typography variant="subtitle1" textAlign="left" sx={{fontSize:'1 0px', fontWeight:'bold', }}>
                        Total Price
                      </Typography>
                      <Typography variant="subtitle1" textAlign="left">
                        S${}
                      </Typography>
                    </Grid>
                </Grid>

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
                      Item Details
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
                  </AccordionDetails>
                </Accordion>
                <Box textAlign="center" sx={{mt:'30px'}}>
                  <Button fullWidth variant="outlined" color="inherit" >LEAVE REVIEW</Button>
                </Box>
              </Box>
              
              </CardContent>
            </Card>
            
            <Box textAlign="center" sx={{mt:'30px'}}>
              <Button fullWidth variant="outlined" color="inherit" >Load More</Button>
            </Box>
            {/* END OF PAST ORDERS */}
            </>
          )
          
        }

        </CardContent>
      </Card>
  )
}
