import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardContent, Box, Typography, Stepper, Step, StepLabel, Divider, Accordion, AccordionSummary, AccordionDetails, Grid, ListItem, 
  Button, Modal, CardMedia, Rating, TextField } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getAllOrderItems, getAllOrders, submitRestaurantReview } from '../customer_controller';

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
  const [reviewRestInfo, setReviewRestInfo] = useState({
    restID: '',
    restName: ''
  });

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
            restID: element.o_rest_ID,
            restaurantName: element.o_rest_name,
            address: element.delivery_address + " S(" + element.delivery_postal_code + ")",
            price: element.total_cost,
            status: element.order_status
          }

          // Now we get the items
          getSelectedOrderItems(element.order_ID)
            .then((response) => {
              tempJSON["items"] = response;

              // NOTE: I moved the setOrderHistory insidse here to test. Apparently that works too!
              // but I left it as what you have here anws :D -Thomas
              setOrderHistory(oldArray => [...oldArray, tempJSON]);
              // orderDetailsArray.push(tempJSON);
              // setOrderHistory(orderDetailsArray);
            })
            .catch(error => console.log(error));
        });        
      
        console.log(orderDetailsArray);
        console.log(orderHistory);
      })
      .catch(error => console.log(error));
  }, [])
  // asdinasd
  //   setOrderHistory([{address: "68 Verde Avenue S(688336)",
  //   orderID: "DO_0001_1635223106227",
  //   items: [{
  //     do_item_ID: 2,
  //     do_item_name: "Elmo",
  //     do_item_price: 323,
  //     do_item_qty: 1,
  //     do_order_ID: "DO_0001_1635230210254",
  //     do_rest_item_ID: 19}],
  //   price: 99.9,
  //   restaurantName: "Kelvin's Cat Cafe",
  //   status: "preparing"}]
  //   )


  // ACCORDION CONTROL
  const [accOpen, setAccOpen] = useState(false);
  const [buttonTab, setButtonTab] = useState(1);

  // ======= MODAL CONTROLS - REVIEWS ==============================
  //    Modal open / close state
  const [openReview, setOpenReview] = useState(false);

  //    Modal values
  var reviewRating = 0;
  var reviewTitle = "";
  var reviewDesc = "";
  // const [reviewRating, setReviewRating] = useState('');
  // const [reviewTitle, setReviewTitle] = useState('');
  // const [reviewDesc, setReviewDesc] = useState('');

  //    Modal open and set info
  const handleOpenReview = (restID, restName) => {
    setReviewRestInfo({
      restID: restID,
      restName: restName
    });
    setOpenReview(true);
  };

  const handleCloseReview = () => setOpenReview(false);

  const submitReview = () => {
    // console.log(reviewRating, reviewTitle, reviewDesc);
    
    // Submit to the server, and then alert if successful
    submitRestaurantReview(reviewRestInfo.restID, reviewRestInfo.restName,
      reviewRating, reviewTitle, reviewDesc)
      .then((response) => {
        alert(response.api_msg);

        // Close the review box
        setOpenReview(false);
      });
  };
  // ================================================================

  console.log(orderHistory)
  return (
      <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px'}}>
        <CardHeader title="Orders History" />
        <CardContent >
        <Box sx={{margin:'0px 10px 20px', textAlign:'right'}}>
          <Button variant="outlined" color="inherit" sx={{marginRight:'20px'}} selected onClick={()=> setButtonTab(1)}>active order</Button>
          <Button variant="outlined" color="inherit" onClick={()=> setButtonTab(2)}>Past Orders</Button>
        </Box>
        
        {
          buttonTab === 1 ? (
          <React.Fragment>
          {orderHistory.map((order)=>{
            if (order.status !== "Fulfilled")
            {
            return <>
              {/* ACTIVE ORDER DETAILS */}
              <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px', width:'80%', margin:'0px auto 20px'}}>
                <CardHeader title="Active Order" sx={{textAlign:"center"}}/>
                <CardContent >
                  <Box width="80%" sx={{margin:'0px auto', textAlign:"center"}}> 
                    <Typography variant="subtitle1"  sx={{fontSize:'1 0px', fontWeight:'bold', }}>
                      Your order from
                    </Typography>
                    <Typography variant="subtitle1" >
                      {order.restaurantName}
                    </Typography>
                    <Typography variant="subtitle2" sx={themes.textHeader}>
                      Order Status
                    </Typography>
                    <Stepper activeStep={order.status === 'Preparing' ?  1 : order.status === 'Accepted' ? 0 : order.status === 'Delivering' ? 3 : -1} alternativeLabel sx={{mb:'40px', '&.MuiStepConnector-line':{bgcolor:"#444444"}}}>
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
                            {order.orderID}
                          </Typography>
                        </Grid>
                        <Grid item xs={8} md={8} sm={8}>
                          <Typography variant="subtitle1" textAlign="left" sx={{fontSize:'1 0px', fontWeight:'bold', }}>
                            Address
                          </Typography>
                          <Typography variant="subtitle1" textAlign="left">
                            {order.address}
                          </Typography>
                        </Grid>
                        <Grid item xs={4} md={4} sm={4}>
                          <Typography variant="subtitle1" textAlign="left" sx={{fontSize:'1 0px', fontWeight:'bold', }}>
                            Total Price
                          </Typography>
                          <Typography variant="subtitle1" textAlign="left">
                            S$ {order.price.toFixed(2)}
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
                        {order.items.map(item => (
                              <ListItem key={item.do_item_ID} sx={{margin:'20px auto'}}>
                                <Box width='70%'>
                                  <Typography variant="h6">
                                    {item.do_item_name}
                                  </Typography>
                                  <Typography variant="subtitle">
                                    Unit Price: S${item.do_item_price.toFixed(2)}
                                  </Typography>
                                </Box>
                                <Box width='30%' textAlign='right' sx={{mt:'10px'}}>
                                  <Typography variant="subtitle2">
                                    Quantity: {item.do_item_qty}
                                  </Typography>
                                    <Typography variant="subtitle2">
                                      Price: S$ {(item.do_item_qty * item.do_item_price).toFixed(2)}
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
            </>}
          })}
            </React.Fragment>
          ) : 
          (
            <>
            {/* START OF PAST ORDERS */}
            {
              orderHistory.map(order => {
                if (order.status === "Fulfilled") {
                  return <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px', width:'80%', margin:'0px auto 20px'}}>
                    <Box sx={{float:'right', margin:'5px 10px 0px 0px', position:'absolute', right:'11%'}}>
                      <Button variant='contained' color="inherit" >order again</Button>
                    </Box>
                    <CardContent >
                      <Box width="80%" sx={{margin:'0px auto', textAlign:"center"}}>
                        <Typography variant="subtitle1" sx={{fontSize:'1 0px', fontWeight:'bold', mb:'10px' }}>
                          Order Number - {order.orderID}
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
                                {order.restaurantName}
                              </Typography>
                            </Grid>
                            <Grid item xs={4} md={4} sm={4}>
                              <Typography variant="subtitle1" textAlign="left" sx={{fontSize:'1 0px', fontWeight:'bold', }}>
                                Status
                              </Typography>
                              <Typography variant="subtitle1" textAlign="left">
                                {order.status}
                              </Typography>
                            </Grid>
                            <Grid item xs={8} md={8} sm={8}>
                              <Typography variant="subtitle1" textAlign="left" sx={{fontSize:'1 0px', fontWeight:'bold', }}>
                                Address
                              </Typography>
                              <Typography variant="subtitle1" textAlign="left">
                                {order.address}
                              </Typography>
                            </Grid>
                            <Grid item xs={4} md={4} sm={4}>
                              <Typography variant="subtitle1" textAlign="left" sx={{fontSize:'1 0px', fontWeight:'bold', }}>
                                Total Price
                              </Typography>
                              <Typography variant="subtitle1" textAlign="left">
                                S${order.price.toFixed(2)}
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
                            {order.items.map(item => (
                              <ListItem key={item.do_item_ID} sx={{margin:'20px auto'}}>
                                <Box width='70%'>
                                  <Typography variant="h6">
                                    {item.do_item_name}
                                  </Typography>
                                  <Typography variant="subtitle">
                                    Unit Price: S${item.do_item_price.toFixed(2)}
                                  </Typography>
                                </Box>
                                <Box width='30%' textAlign='right' sx={{mt:'10px'}}>
                                  <Typography variant="subtitle2">
                                    Quantity: {item.do_item_qty}
                                  </Typography>
                                    <Typography variant="subtitle2">
                                      Price: S$ {(item.do_item_qty * item.do_item_price).toFixed(2)}
                                    </Typography>
                                  </Box>
                              </ListItem>
                            ))}
                          </AccordionDetails>
                        </Accordion>
                        <Box textAlign="center" sx={{mt:'30px'}}>
                          <Button fullWidth variant="outlined" color="inherit" onClick={(e) => {handleOpenReview(order.restID, order.restaurantName)}} >LEAVE REVIEW</Button>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                }
              })
            }
            
            <Box textAlign="center" sx={{mt:'30px'}}>
              <Button fullWidth variant="outlined" color="inherit" >Load More</Button>
            </Box>
            {/* END OF PAST ORDERS */}
            </>
          )
          
        } 

        {/* REVIEW MODAL */}
        <Modal
          open={openReview}
          onClose={handleCloseReview}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Card variant="outlined" sx={{ position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width:"50%",
            maxHeight:'70%',}}>
            <CardContent >
              <Box textAlign="center" sx={{mb:'20px'}}>
                <Typography variant="h6">Let us know your experience</Typography>
                <Typography variant="subtitle1" sx={{fontSize:'1 0px', fontWeight:'bold', }}>Your order from </Typography>
                <Typography variant="subtitle1">{reviewRestInfo.restName}</Typography>
              </Box>
              
              <Divider variant="middle"/>

              <Box textAlign="center" width="60%" margin="10px auto" >
                <Typography  variant="subtitle1" sx={{fontSize:'1 0px', fontWeight:'bold', }}>How was the delivery?</Typography>
                <Typography sx={{mb:'20px'}}>
                  <Rating 
                    size="large"
                    onChange={(event) => {reviewRating = event.target.value}}  
                  />
                </Typography>

                <Typography variant="subtitle1"  sx={{fontSize:'1 0px', fontWeight:'bold', }}>Information about the review</Typography>
                <TextField  
                  fullWidth id="filled-basic" 
                  label="Title (Optional)" 
                  variant="filled" 
                  sx={{mb:'20px'}}
                  onChange={(event) => {reviewTitle = event.target.value}}
                />
                <TextField
                  fullWidth
                  id="filled-textarea"
                  label="Let us know more (Optional)"
                  placeholder="Placeholder"
                  multiline
                  variant="filled"
                  rows="3"
                  onChange={(event) => {reviewDesc = event.target.value}}
                />
              </Box>

              <Box textAlign="center" width="60%" margin="10px auto" >
                <Button variant="outlined" color="error" sx={{margin:'10px 10px'}} onClick={handleCloseReview}>Cancel</Button>
                <Button variant="outlined" color="inherit" sx={{margin:'10px 10px'}} onClick={submitReview} >Submit</Button>
              </Box>
            </CardContent>
          </Card>
        </Modal>
        {/* END OF REVIEW MODAL */}

        </CardContent>
      </Card>
  )
}