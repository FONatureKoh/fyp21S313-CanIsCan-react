import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import { TextField } from '@mui/material';
import { postChangePW, postPersonalProfile, retrieveUserProfile } from '../../restaurant_controller';

// Steps for the first login
const steps = ['Update your profile', 'Change your password'];

// Async function to return the user's profile
async function getProfile() {
  try {
    const response = await retrieveUserProfile();

    return response;
  }
  catch (err) {
    console.log(err);
  }
}

export default function ResFirstLogin({setFirstLog}) {
  // Page Theme constants
  const themes = {
    textHeader: {
      fontSize:'1 0px', 
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

  // Steps states
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  // STATES TO DRAW INFORMATION TO USE FOR SUBMISSION
  const [profileImage, setProfileImage] = useState();
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [personalPhone, setPersonalPhone] = useState('');
  const [personalEmail, setPersonalEmail] = useState('');
  const [personalAdd, setPersonalAdd] = useState('');
  const [personalPostal, setPersonalPostal] = useState('');

  // Password matters
  const [oldPW, setOldPW] = useState('');
  const [newPW, setNewPW] = useState('');
  const [confirmNewPW, setConfirmNewPW] = useState('');

  // useEffect to load whatever that can be loaded from the database
  useEffect(() => {
    getProfile()
      .then((response) => {
        setFName(response.first_name);
        setLName(response.last_name);
        setPersonalPhone(response.phone_no);
        setPersonalEmail(response.email);
      })
  }, []);

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

  // Function to handle closing of the form.
  const handleReset = () => {
    setFirstLog(false);
  };

  // Async function to save personal details
  async function postPersonal(){
    try {
      const response = await postPersonalProfile(profileImage, fName, lName, personalPhone,
        personalEmail, personalAdd, personalPostal);
      return response.api_msg;
    }
    catch (error) {
      return error;
    }
  }

  // Async function to change password 
  async function postPassword(){
    try {
      const response = await postChangePW(oldPW, newPW);
      return response.api_msg;
    }
    catch (error) {
      return error;
    }
  }

  // HANDLE FINAL SUBMIT 
  // NOTE: This is where we submit the data to the database
  const handleFinish = () => {
    if (newPW !== confirmNewPW) {
      alert("Please type the same password in the new password and confirm password fields");

      return;
    }
    else {
      // Post the personal profile
      postPersonal()
        .then((response) => {
          console.log(response);
        })
        .catch(error => console.log(error));

      // Post RGM password update 
      postPassword()
        .then((response) => {
          console.log(response);
        })
        .catch(error => console.log(error));

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  }

  // Preview Images
  const [profilePreview, setProfilePreview] = useState();

  // A useEffect to handle the profile image preview
  useEffect(() => {
    if(profileImage){
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePreview(reader.result);
        // console.log("1" + profilePreview)
      }
      reader.readAsDataURL(profileImage);
    }
    else {
      setProfilePreview(null);
    }
  }, [profileImage, profilePreview])

  return (
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

      {activeStep === steps.length ? (
        <React.Fragment>
          <Box sx={themes.boxStyle2}>
          {/* <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-confetti" width="100" height="100" viewBox="0 0 24 24" stroke-width="2" stroke="#597e8d" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M4 5h2" />
            <path d="M5 4v2" />
            <path d="M11.5 4l-.5 2" />
            <path d="M18 5h2" />
            <path d="M19 4v2" />
            <path d="M15 9l-1 1" />
            <path d="M18 13l2 -.5" />
            <path d="M18 19h2" />
            <path d="M19 18v2" />
            <path d="M14 16.518l-6.518 -6.518l-4.39 9.58a1.003 1.003 0 0 0 1.329 1.329l9.579 -4.39z" />
          </svg> */}
          <Typography sx={themes.textHeader}>
            You are all set up!
          </Typography>
          </Box>
          <Box sx={{ display: 'flex', pt: 2 }}>
            <Button variant="outlined" color="inherit" fontSize="large" sx={{margin:'10px auto'}} onClick={handleReset}>Start using Food on Click now!</Button>
          </Box>
        </React.Fragment>
      ) 
      //STEP ONE - PERSONAL INFO
      : activeStep === 0 ? (
        <>
          <Box sx={themes.boxStyle}>
            <Typography sx={themes.textHeader}>
              Update your personal information
            </Typography>

            <Divider variant="middle"/>

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              
              <Box sx={{width:'40%'}}>
                <Typography sx={{textAlign:'center', fontSize:'15px', mt:'20px', fontWeight:'bold'}}>Profile Photo</Typography>
                <Box sx={{position:'relative', top:'100px'}}>
                  <img 
                  src={profilePreview} 
                  height="200px" width="300px" alt="additem" />
                  <Box sx={{position:'relative', top:'10px'}}>
                    <label htmlFor="profileImage">
                    <input 
                      hidden 
                      type="file"
                      id="profileImage"
                      accept=".png"
                      onChange={event => {
                        const imageFile = event.target.files[0];
                        setProfileImage(imageFile);
                        console.log("meow")
                      }} 
                      />
                    <Typography sx={{textAlign:'center', fontSize:'10px', textDecoration:'underline', cursor:'pointer'}}>Upload Photo</Typography>
                    </label>
                  </Box>
                </Box>
              </Box>

              <Divider orientation="vertical" variant="middle" flexItem />

              <Box sx={{width:'60%'}}>
                <TextField sx={{width:'40%', margin:'15px 2.5%'}} 
                  id="fname-field" 
                  value={fName}
                  label="First Name:" 
                  variant="filled" 
                  size="small"
                  onChange={(e)=> setFName(e.target.value)}
                />
                <TextField sx={{width:'40%', margin:'15px 2.5%'}} 
                  id="lname-field" 
                  value={lName}
                  label="Last Name:" 
                  variant="filled" 
                  size="small" 
                  onChange={(e)=> setLName(e.target.value)}
                />

                <TextField sx={{width:'85%', margin:'15px auto'}} 
                  id="phone-field" 
                  value={personalPhone}
                  label="Phone Number (Required*):" 
                  variant="filled" 
                  size="small" 
                  inputProps={{ maxLength: 8 }}
                  onChange={(e)=> setPersonalPhone(e.target.value.replace(/[^0-9]/g, ''))}
                />

                <TextField sx={{width:'85%', margin:'15px auto'}} 
                  id="email-field" 
                  value={personalEmail}
                  label="Email (Required*):" 
                  variant="filled" 
                  size="small" 
                  onChange={(e)=> setPersonalEmail(e.target.value)}
                />

                <TextField sx={{width:'85%', margin:'15px auto'}} 
                  id="address-field" 
                  value={personalAdd}
                  label="Address (Required*):"  
                  multiline rows={2} 
                  variant="filled" 
                  onChange={(e)=> setPersonalAdd(e.target.value)}
                />

                <TextField sx={{width:'85%', margin:'15px auto'}} 
                  id="postal-code-field" 
                  value={personalPostal}
                  label="Postal Code (Required*):"  
                  variant="filled" 
                  size="small" 
                  inputProps={{ maxLength: 6 }}
                  onChange={(e)=> setPersonalPostal(e.target.value.replace(/[^0-9]/g, ''))}
                />
              </Box>
            </Box>
          </Box>  
          
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
              variant="outlined">
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />

            <Button onClick={handleNext} variant="outlined">
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </>
      ) 
       //STEP TWO - RESTAURANT INFO
      : (
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
              type="password" 
              label="Enter Old Password:" 
              variant="filled" 
              size="small" 
              onChange={(e)=> setOldPW(e.target.value)}
            />

            <TextField 
              sx={{width:'80%', margin:'15px auto'}} 
              id="new-pw" 
              type="password" 
              label="Enter New Password:" 
              variant="filled" 
              size="small" 
              onChange={(e)=> setNewPW(e.target.value)}
            />

            <TextField 
              sx={{width:'80%', margin:'15px auto'}} 
              id="confirm-new" 
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
            onClick={handleFinish} 
            variant="outlined">
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment> 
      )}
    </Box>
  );
}
