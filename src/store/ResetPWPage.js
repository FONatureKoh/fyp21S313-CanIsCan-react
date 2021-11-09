import React, { useState, useEffect } from 'react'
import { Divider, TextField, Typography, Button, StepLabel, Step, Stepper, Box } from '@mui/material';
import { postChangePW, updateAccStatus } from './general_controller';
// import { postChangePW, postPersonalProfile, retrieveUserProfile } from '../../restaurant_controller';

// Steps with regards to the firstlogin
const steps = ['Change your password'];

export default function ResetPasswordModal({setOpenReset}) {
  // Constant Theme
  const themes = {
    textHeader: {
      fontWeight:'bold', 
      margin: '10px'
    },
    boxStyle:{
      margin: '50px auto 0px',
      width: '100%',
      textAlign:'center',
      borderRadius:'5px'
    },
    boxStyle2:{
      margin: '50px auto',
      width: '80%',
      textAlign:'center',
      borderRadius:'5px'
    }
  };
  
  // Step statesfor the first login
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  // Password matters
  const [oldPW, setOldPW] = useState('');
  const [newPW, setNewPW] = useState('');
  const [confirmNewPW, setConfirmNewPW] = useState(''); 

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    console.log(activeStep);
    
    // HANDLES THE FIRST STEP'S VALIDATION
    if (activeStep === 0) {
      // ERROR COUNTER
      var validationError = 0;

      if (oldPW === '' || newPW === '' || confirmNewPW === '') {
        alert("All three fields must be filled!")
        validationError++;
      }

      if (newPW !== confirmNewPW) {
        alert("Please type the same password in the new password and confirm password fields");
        validationError++;
      }

      if (validationError === 0) {
        postChangePW(oldPW, newPW)
          .then((response) => {
            if (response.api_msg === "success") {
              handleFinish();
            }
            else {
              alert("Something went wrong. Please try again");
            }
          })
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Function to handle closing of the form.
  const handleReset = () => {
    setOpenReset(false);
  };

  // HANDLE FINAL SUBMIT 
  // NOTE: This is where we submit the data to the database
  const handleFinish = () => {   
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    // UPDATE ACCOUNT STATUS HERE
    updateAccStatus()
      .then((response) => console.log(response));
  }

  return (
    <Box sx={{ width: '80%', margin:'30px auto'}}>
      <Stepper activeStep={activeStep} alternativeLabel >
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={label} {...stepProps}> 
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}

      </Stepper>

      {activeStep === steps.length ? (
        <React.Fragment>
          <Box sx={themes.boxStyle2}>
          <Typography sx={themes.textHeader}>
            Your password reset was successful!
          </Typography>
          </Box>
          <Box sx={{ display: 'flex', pt: 2 }}>
            <Button variant="outlined" color="inherit" fontSize="large" sx={{margin:'10px auto'}} onClick={handleReset}>Continue</Button>
          </Box>
        </React.Fragment>
      ) 
      //STEP ONE - PERSONAL INFO
      : activeStep === 0 ? (
        <React.Fragment>
          <Box sx={themes.boxStyle}>
            <Typography sx={themes.textHeader}>
              Change your password
            </Typography>
            <Divider/>
            <Typography sx={themes.textHeader}>
            <TextField 
              sx={{width:'80%', margin:'15px auto'}} 
              id="old-pw" 
              defaultValue=""
              type="password" 
              label="Enter Old Password:" 
              variant="filled" 
              size="small" 
              onChange={(e)=> setOldPW(e.target.value)}
            />

            <TextField 
              sx={{width:'80%', margin:'15px auto'}} 
              id="new-pw" 
              defaultValue=""
              type="password" 
              label="Enter New Password:" 
              variant="filled" 
              size="small" 
              onChange={(e)=> setNewPW(e.target.value)}
            />

            <TextField 
              sx={{width:'80%', margin:'15px auto'}} 
              id="confirm-new" 
              defaultValue=""
              type="password" 
              label="Re-enter New Password:" 
              variant="filled" 
              size="small" 
              onChange={(e)=> setConfirmNewPW(e.target.value)}
            />

            </Typography>
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

            <Button 
            onClick={handleNext} 
            variant="outlined">
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment> 
      ) : <></>}
    </Box>
  );
}
