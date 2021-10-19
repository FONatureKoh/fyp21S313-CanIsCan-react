import React from 'react'
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
import Chip from '@mui/material/Chip';
import { ListItem } from '@mui/material';
import { ButtonGroup } from '@mui/material';
import { List } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const steps = ['Verify your orders', 'Confirm delivery address', 'Make payment'];
export default function CheckOut({realCart, deleteItem, minusQty, addQty, getsub, subtotal, gst, deliveryFee, total}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  //START OF CHIP DROP DOWNLIST
  const names = [
    'Western',
    'Chinese',
    'Japanese',
    'Italian',
    'Korean',
    'Vietnamese',
    'Thai',
    'Indian',
    'Asian',
    'Fast Food',
    'Fine Dining'
  ];

  //This is the state that will contain all selected item in an array
  const [tags, setTags] = React.useState([]);

  //Drop down item settings
  const ITEM_HEIGHT = 40;
  const ITEM_PADDING_TOP = 5;
  const MenuProps = {
    PaperProps: {
      style: {
        display: Block,
        maxHeight: ITEM_HEIGHT * 3.5 + ITEM_PADDING_TOP,
      },
    },
  };

    
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTags(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  }
  //END OF CHIP DROP DOWNLIST

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
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  //return right side
  function rightSide(){
    return (
      <Box sx={themes.boxStyle2}>
      <Typography sx={themes.textHeader}>
        Review your cart
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
                      {item.item}
                    </Typography>
                    <Typography variant="subtitle">
                      Unit Price: S${item.price.toFixed(2)}
                    </Typography>
                  </Box>
                  <Box width='30%' textAlign='right' sx={{mt:'10px'}}>
                    <Typography variant="subtitle2">
                        <ButtonGroup color="inherit" size="small">
                          {item.qty === 1 ? <Button onClick={() => deleteItem(item.id)}><DeleteOutlineOutlinedIcon fontSize="small" variant="" /></Button> : <Button onClick={()=> minusQty(item.id)}>-</Button>}
                          <Button >{item.qty}</Button>
                          <Button onClick={()=>addQty(item.id)}>+</Button>
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
      // SECOND STEP //
      : activeStep === 1 ? (
        <React.Fragment>
          <Box display="flex" flexDirection="row">
            <Box sx={themes.boxStyle}>
              <Typography sx={themes.textHeader}>
                Confirm delivery address
              </Typography>
              <Divider variant="middle" />
              <TextField sx={{width:'85%', margin:'15px auto'}} 
                id="rest-name-field" 
                label="Restaurant Name (Required*):" 
                variant="filled" 
                size="small" 
              />

              <TextField sx={{width:'85%', margin:'15px auto'}}
                id="rest-address" 
                label="Restaurant Address (Required*):"  
                multiline 
                rows={4} 
                variant="filled" 
              />
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
                Payment Details
              </Typography>
              <Divider variant="middle"/>
              <Typography sx={themes.textHeader}>
              <TextField 
                    sx={{width:'85%', margin:'15px auto'}} 
                    id="outline-password-input" 
                    type="password" 
                    label="Enter Old Password:" 
                    variant="filled" 
                    size="small" 
                  />

                  <TextField 
                    sx={{width:'85%', margin:'15px auto'}} 
                    id="outline-password-input" 
                    type="password" 
                    label="Enter New Password:" 
                    variant="filled" 
                    size="small" 
                  />
              </Typography>
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
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
        </CardContent>
      </Card>
  )
}
