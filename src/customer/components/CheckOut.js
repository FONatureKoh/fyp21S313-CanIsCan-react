import React, { useState } from 'react'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useRouteMatch, useHistory } from 'react-router';
import { ListItem, Backdrop, CircularProgress } from '@mui/material';
import { List, Grid, ButtonGroup, Divider, TextField, Card, CardHeader, CardContent, Box } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import StripeCheckout from 'react-stripe-checkout';

// Controller import
import { customerCheckout, submitCustOrder, verifyAdd } from '../customer_controller';

// Steps for the ordering
const steps = ['Verify your orders', 'Enter Delivery Addres', 'Confirm Order details and Make Payment'];

export default function CheckOut({restInfo, realCart, deleteItem, minusQty, addQty, getsub, subtotal, gst, deliveryFee, total}) {
  // Testing page load
  console.log("Checkout Page loaded!");

  // For the steps through to confirm the delivery
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  // Route matters
  const match = useRouteMatch('/customer/orderdelivery/:id/checkout');
  const restID = match.params.id;
  const history = useHistory();

  const themes = {
    textHeader: {
      fontSize:'1 0px', 
      fontWeight:'bold', 
      margin: '10px'
    },
    boxStyle:{
      margin: '50px auto 0px',
      width: '60%',
      textAlign:'center'
    },
    boxStyle2:{
      margin: '50px auto',
      width: '40%',
      textAlign:'center',
      borderRadius:'5px'
    }
  };

  const boldtitle = {
    fontSize:'1 0px', 
    fontWeight:'bold', 
    marginTop:'20px',
    marginBottom:'5px'
  };

  // useStates for the steps
  // Delivery Details
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryFloorUnit, setDeliveryFloorUnit] = useState('');
  const [deliveryPostalCode, setDeliveryPostalCode] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [noteToDriver, setNoteToDriver] = useState('');

  // Async functions for steps
  async function verifyAddress() {
    try {
      const custAdd = "Singapore " + deliveryPostalCode;

      const response = await verifyAdd(custAdd);
      return response;
    }
    catch (err) {
      return err;
    }
  }

  // Handling steps below 
  // const isStepOptional = (step) => {
  //   return step === 1;
  // };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    if (activeStep === 1) {
      verifyAddress()
        .then((response) => {
          console.log(response);
          if (response.data.status === "OK") {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSkipped(newSkipped);
          }
          else {
            // Please do something about this alert
            alert("You've entered an invalid Singapore address! We don't know where to send your order. Please try again!");
          }
        });    
    }
    else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    };
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    history.push('/customer');
  };

  /***********************************************************************************************
   * Settings for Backdrop
   * *********************************************************************************************
   */
  // Backdrop useStates 
  const [backdropState, setBackDropState] = useState(false);

  // Backdrop functions
  const handleBackdropClose = () => {
    setBackDropState(false);
  };

  const handleBackdropOpen = () => {
    setBackDropState(true);
  };

  /***********************************************************************************************
   * Handling the payment
   * *********************************************************************************************
  */
  // Payment Details
  // const [cardName, setCardName] = useState('');
  // const [cardNumber, setCardNumber] = useState('');
  // const [expiry, setExpiry] = useState('');
  // const [cvc, setCvc] = useState('');

  // Async functions for checkout
  async function submitOrder(doID) {
    try {
      const response = await submitCustOrder(doID, restInfo, realCart, deliveryAddress, deliveryFloorUnit, 
        deliveryPostalCode, companyName, noteToDriver, subtotal, gst, deliveryFee, total);
      
      return response;
    }
    catch (error) {
      return error;
    }
  }

  async function handleTokenAndOrder(token) {
    // Testing the stripe
    // console.log({ token });
    // Open the backdrop
    // handleBackdropOpen();
    // 1. We need to get a payment response from our stripe account and verify this with 
    // our own api server
    // Get some restaurant INFO
    const restID = restInfo.restaurant_ID.toString();

    // Create the Order ID here
    const doID = `DO_${restID.padStart(4, '0')}_${Date.now()}`;

    const response = await customerCheckout(token, doID, total);
    const { paymentStatus, errorMsg } = response;
    
    console.log(paymentStatus);

    // 2. If payment is a success, then send the order to the server proper
    if (paymentStatus === "success") {
      submitOrder(doID)
        .then((response) => {
          // Comment out before submission
          alert(response.api_msg);

          // Close backdrop
          handleBackdropClose();

          // Go to next step
          handleNext();
        });
    }
    else {
      alert("There's an error with your payment: " + errorMsg);
    }
  }  
  // =============================================================================================


  //return right side
  function rightSide(){
    return (
      <Box sx={themes.boxStyle2}>
      <Typography sx={themes.textHeader}>
        Order summary
      </Typography>
      <Divider variant="middle"/>
      <List>
      <ListItem >
      <Box width='70%'>
        <Typography variant="subtitle">
          Subtotal
        </Typography>
      </Box>
      <Box width="30%" sx={{textAlign:'right'}}>
        <Typography variant="subtitle" >
          S$ {subtotal.toFixed(2)}
        </Typography>
      </Box>
    </ListItem>
    <ListItem >
      <Box width='70%'>
        <Typography variant="subtitle">
          Delivery fee
        </Typography>
      </Box>
      <Box width="30%" sx={{textAlign:'right'}}>
        <Typography variant="subtitle">
          S$ {deliveryFee.toFixed(2)}
        </Typography>
      </Box>
    </ListItem>
    <ListItem >
      <Box width='70%'>
        <Typography variant="subtitle">
          GST (7%)
        </Typography>
      </Box>
      <Box width="30%" sx={{textAlign:'right'}}>
        <Typography variant="subtitle">
          S$ {gst.toFixed(2)}
        </Typography>
      </Box>
    </ListItem>
    <ListItem >
      <Box width='70%'>
        <Typography variant="subtitle" sx={{fontWeight:'800'}}>
          Grand total
        </Typography>
      </Box>
      <Box width="30%" sx={{textAlign:'right'}}>
        <Typography variant="subtitle" sx={{fontWeight:'800'}}>
          S$ {total.toFixed(2)}
        </Typography>
      </Box>
    </ListItem>
      </List>
    </Box>
    )
  }

  return <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropState}
      >
      <CircularProgress color="inherit" />
      </Backdrop>
      <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px'}}>
        <CardHeader title="Check Out" />
        <CardContent >
        <Box sx={{ width: '80%', margin:'30px auto'}}>
      <Stepper activeStep={activeStep} alternativeLabel >
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          // if (isStepOptional(index)) {
          //   labelProps.optional = (
          //     <Typography variant="caption">Optional</Typography>
          //   );
          // }
          // if (isStepSkipped(index)) {
          //   stepProps.completed = false;
          // }
          return (
            <Step key={label} {...stepProps}> 
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}

      </Stepper>

      {/* LAST STEP */}
      {activeStep === steps.length ? (
        <React.Fragment>
          <Box sx={themes.boxStyle2}>
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-scooter" width="100" height="100" viewBox="0 0 24 24" stroke-width="1.5" stroke="#597e8d" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <circle cx="18" cy="17" r="2" />
            <circle cx="6" cy="17" r="2" />
            <path d="M8 17h5a6 6 0 0 1 5 -5v-5a2 2 0 0 0 -2 -2h-1" />
          </svg>
          <Typography sx={themes.textHeader}>
            Food is on the way!
          </Typography>
          </Box>
          <Box sx={{ display: 'flex', pt: 2 }}>
            <Button variant="outlined" color="inherit" fontSize="large" sx={{margin:'10px auto'}} onClick={handleReset}>Back to home</Button>
          </Box>
        </React.Fragment>
      ) 
      // FIRST STEP //
      : activeStep === 0 ? (
        <React.Fragment>
          <Box  width="100%" sx={{ display: 'flex', flexDirection: 'row' }}>
            <Box sx={themes.boxStyle}>
              <Typography sx={themes.textHeader}>
                Review your cart
              </Typography>
              <Divider variant='middle' />
              {realCart.map(item => (
                <ListItem key={item.id} sx={{margin:'20px auto'}}>
                  <Box width='70%'>
                    <Typography variant="h6">
                      {item.itemName}
                    </Typography>
                    <Typography variant="subtitle">
                      Unit Price: S${item.itemPrice.toFixed(2)}
                    </Typography>
                  </Box>
                  <Box width='30%' textAlign='right' sx={{mt:'10px'}}>
                    <Typography variant="subtitle2">
                      <ButtonGroup color="inherit" size="small">
                        {item.itemQty === 1 ? <Button onClick={() => deleteItem(item.itemID)}><DeleteOutlineOutlinedIcon fontSize="small" variant="" /></Button> : <Button onClick={()=> minusQty(item.itemID)}>-</Button>}
                        <Button >{item.itemQty}</Button>
                        <Button onClick={()=>addQty(item.itemID)}>+</Button>
                      </ButtonGroup>
                    </Typography>
                    <Typography variant="subtitle2">
                      Price: S${getsub(item)}
                    </Typography>
                  </Box>
                </ListItem>
              ))}
            </Box>
            
            {/* DIVIDER */}
            <Divider orientation="vertical" variant="middle" flexItem />

            {/* RIGHT SIDE */}
            {rightSide()}
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              onClick={handleBack}
              component ={Link}
              to={`/customer/orderdelivery/${restID}`}
              sx={{ mr: 1 }}
              variant="outlined"
            >
              Back to restaurant
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />

            <Button onClick={handleNext} variant="outlined" color="inherit">
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      ) 
      // SECOND STEP //
      : activeStep === 1 ? (
        <React.Fragment>
          <Box display="flex" flexDirection="row">
            <Box sx={themes.boxStyle}>
              <Typography sx={themes.textHeader}>
                Confirm delivery address
              </Typography>

              <Divider variant="middle" />

              <Grid container>
              
              <Grid sx={12} sm={12} md={12}>
              <TextField sx={{width:'90%', margin:'15px auto'}} 
                value={deliveryAddress}
                id="address-street" 
                label="Street" 
                variant="filled" 
                size="small" 
                onChange={(event) => {setDeliveryAddress(event.target.value)}}
              />
              </Grid>
              <Grid sx={12} sm={12} md={6}>
              <TextField sx={{width:'80%', margin:'15px'}} 
                value={deliveryFloorUnit}
                id="address-unit" 
                label="Floor / Unit number" 
                variant="filled" 
                size="small" 
                onChange={(event) => {setDeliveryFloorUnit(event.target.value)}}
              />
              </Grid>

              <Grid sx={12} sm={12} md={6}>
              <TextField sx={{width:'80%', margin:'15px'}} 
                value={deliveryPostalCode} 
                id="address-postal" 
                label="Postal Code" 
                variant="filled" 
                size="small" 
                inputProps={{ maxLength: 6 }}
                onChange={(event) => {setDeliveryPostalCode(event.target.value.replace(/[^0-9]/g, ''))}}
              />
              </Grid>

              <Grid sx={12} sm={12} md={12}>
              <TextField sx={{width:'90%', margin:'15px auto'}} 
                value={companyName} 
                id="company-name" 
                label="Company name (optional)" 
                variant="filled" 
                size="small" 
                onChange={(event) => {setCompanyName(event.target.value)}}
              />
              </Grid>

              <Grid sx={12} sm={12} md={12}>
              <TextField sx={{width:'90%', margin:'15px auto'}} 
                id="driver-note" 
                value={noteToDriver}
                label="Note to driver(optional)" 
                variant="filled" 
                size="small" 
                multiline
                rows={3}
                onChange={(event) => {setNoteToDriver(event.target.value)}}
              />
              </Grid>
              </Grid>
              
            </Box>
        
            <Divider orientation="vertical" variant="middle" flexItem />
            {/* RIGHT SIDE */}
            {rightSide()}
            
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
              variant="outlined"
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />

            {/* Stripe configuration and button */}
            <Button onClick={handleNext} variant="outlined">
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )
      // FINAL STEP
      : (
        <React.Fragment>
          <Box display="flex" flexDirection="row">
            <Box sx={themes.boxStyle}>
              <Typography sx={themes.textHeader}>
                Confirm delivery address
              </Typography>

              <Divider variant="middle" />
              <Grid container textAlign="left" sx={{px:2}}>
                <Grid sx={12} sm={12} md={12}>
                  <Typography textAlign="left" sx={boldtitle}>Address</Typography>
                  <Typography>
                    {deliveryAddress}
                  </Typography>
                </Grid>
                <Grid sx={12} sm={12} md={6}>
                  <Typography sx={boldtitle}>Floor / Unit number</Typography>
                  <Typography>
                    {deliveryFloorUnit}
                  </Typography>
                </Grid>

                <Grid sx={12} sm={12} md={6}>
                  <Typography sx={boldtitle}>Postal Code</Typography>
                  <Typography>
                    {deliveryPostalCode}
                  </Typography>
                </Grid>

                <Grid sx={12} sm={12} md={12}>
                  <Typography sx={boldtitle}>Company Name</Typography>
                  <Typography>
                    {companyName === '' ? 'NIL' : companyName}
                  </Typography>
                </Grid>

                <Grid sx={12} sm={12} md={12}>
                  <Typography sx={boldtitle}>Delivery Note</Typography>
                  <Typography>
                    {noteToDriver === '' ? 'NIL' : noteToDriver}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
        
            <Divider orientation="vertical" variant="middle" flexItem />
            {/* RIGHT SIDE */}
            {rightSide()}
            
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
              variant="outlined"
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />

            {/* Stripe configuration and button */}
            <StripeCheckout 
              name="Make your Payment"
              stripeKey="pk_test_51Jpp1SJIAR4w3qKIP8z8sp1QLA73bua7FJq7Oelz0Ibb37ILFqWOo9xAXbXFM7sl1U2nfq2Hu5QKjR2gmHDJ0lcf00Ev8Q67Ku"
              token={handleTokenAndOrder} 
              billingAddress 
              amount={total * 100} >

              <Button onClick={handleBackdropOpen} variant="outlined">
                {activeStep === steps.length - 1 ? 'Pay and Confirm Order' : 'Next'}
              </Button>
              
            </StripeCheckout>
          </Box>
        </React.Fragment>
      )}
    </Box>
        </CardContent>
      </Card>
  </>
}
