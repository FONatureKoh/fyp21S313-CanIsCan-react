import React, { useState } from 'react'
import { Card, CardHeader, CardContent, Box } from '@mui/material'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import { TextField } from '@mui/material';
import { Block } from '@mui/icons-material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import { useRouteMatch, useHistory } from 'react-router';
import { ListItem } from '@mui/material';
import { ButtonGroup } from '@mui/material';
import { List } from '@mui/material';
import { Grid } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

// Controller import
import { submitCustOrder } from '../customer_controller';

const steps = ['Verify your orders', 'Confirm delivery address', 'Make payment'];
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
  
  function backToRest()
  {
    
  }

  // useStates for the steps
  //    Delivery Details
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryFloorUnit, setDeliveryFloorUnit] = useState('');
  const [deliveryPostalCode, setDeliveryPostalCode] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [noteToDriver, setNoteToDriver] = useState('');

  //    Payment Details
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  // Async functions for checkout
  async function submitOrder() {
    try {
      const response = await submitCustOrder(restInfo, realCart, deliveryAddress, deliveryFloorUnit, 
        deliveryPostalCode, companyName, noteToDriver, cardName, cardNumber, expiry, cvc, 
        subtotal, gst, deliveryFee, total);
      
      return response;
    }
    catch (error) {
      return error;
    }
  }

  // Handling steps below 
  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    
    // Hi Kelvin! Not sure if this is the right way to do it, so I just put it in
    // like this to test first! So that I have the functions all constructed and
    // ready. Last step is 2 if I am not wrong? So at 2, it will confirm
    console.log("Handling Next: " + activeStep);
    if (activeStep == 2) {
      console.log("Send Order");
      submitOrder()
        .then((response) => {
          alert(response);
        })
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    // history.push('/customer');
  };

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

  return (
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

            <Button onClick={handleNext} variant="outlined">
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
                onChange={(event) => {setDeliveryPostalCode(event.target.value)}}
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

            <Button onClick={handleNext} variant="outlined">
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )
      : (
        <React.Fragment>
          <Box display="flex" flexDirection="row">
            <Box sx={themes.boxStyle}>
              <Typography sx={themes.textHeader}>
                Payment details
              </Typography>

              <Divider variant="middle"/>
              
              <Grid container>
              
              <Grid sx={12} sm={12} md={12}>
              <TextField sx={{width:'90%', margin:'15px auto'}} 
                id="cardholder-name" 
                value={cardName} 
                label="Name on card" 
                variant="filled" 
                size="small" 
                onChange={(event) => {setCardName(event.target.value)}}
              />
              </Grid>

              <Grid sx={12} sm={12} md={12}>
              <TextField sx={{width:'90%', margin:'15px auto'}} 
                id="card-number" 
                value={cardNumber} 
                label="Card Number" 
                variant="filled" 
                size="small" 
                onChange={(event) => {setCardNumber(event.target.value)}}
              />
              </Grid>

              <Grid sx={12} sm={12} md={6}>
              <TextField sx={{width:'80%', margin:'15px'}} 
                id="card-expiry" 
                value={expiry} 
                label="Expiry (MM/YY)" 
                variant="filled" 
                size="small" 
                onChange={(event) => {setExpiry(event.target.value)}}
              />
              </Grid>

              <Grid sx={12} sm={12} md={6}>
              <TextField sx={{width:'80%', margin:'15px'}} 
                id="card-CVC" 
                value={cvc} 
                label="CVC" 
                variant="filled" 
                size="small" 
                onChange={(event) => {setCvc(event.target.value)}} 
              />
              </Grid>
              
              </Grid>
              
            </Box>

            <Divider orientation="vertical" variant="middle" flexItem />

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

            <Button onClick={handleNext} variant="outlined">
              {activeStep === steps.length - 1 ? 'Confirm Order' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
        </CardContent>
      </Card>
  )
}
