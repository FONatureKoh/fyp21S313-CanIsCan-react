import React, { useState, useEffect } from 'react';
import { Stepper, Box, Step, StepLabel, Button, Typography,  Divider, Stack, TextField, InputLabel, MenuItem, FormControl, Select, Chip, OutlinedInput } from '@mui/material';
import { Block } from '@mui/icons-material';
import { postChangePW, postPersonalProfile, postRestaurantProfile, retrieveRestaurantTags } from '../../restaurant_controller';
import DefaultProfile from '../../../assets/default-profile.png'
import DefaultShopfront from '../../../assets/default-shopfront.png'
// New Imports for the time picker
import { TimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

const steps = ['Update your personal profile', 'Update your restaurant profile', 'Change your password'];

// All useful Async Functions
// This one to get the tags
async function getRestaurantTags(){
  try {
    // CONTROLLER TO RETRIEVE THE RESTAURANT TAGS
    const tags = await retrieveRestaurantTags();
    return tags.restaurantTags;
  }
  catch (error) {
    return error;
  }
}

// The React Function itself
export default function FirstLogin({setFirstLog}) {
  // CONSTANT THEME
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

  // Essential variables
  const [restaurantTags, setRestaurantTags] = useState([]);

  // Essential states for the react component
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

  //This is the state that will contain all selected item in an array
  const [bannerImage, setBannerImage] = useState();
  const [restAdd, setRestAdd] = useState('');
  const [restPostal, setRestPostal] = useState('');
  const [tags, setTags] = useState([]);

  // NOTE: ADDITION STEP FOR DATE OBJECT HERE TO OMMIT THE SECONDS
  const tempDateObj = new Date();
  const dateObject = new Date(1970, 1, 1, tempDateObj.getHours(), tempDateObj.getMinutes(), 0, 0);
  const [openTime, setOpenTime] = useState(dateObject);
  const [closeTime, setCloseTime] = useState(dateObject);

  // Password matters
  const [oldPW, setOldPW] = useState('');
  const [newPW, setNewPW] = useState('');
  const [confirmNewPW, setConfirmNewPW] = useState('');

  // useEffect to initialise some important data
  useEffect(() => {
    // Setting the restaurant tags
    getRestaurantTags()
      .then((response) => {
        setRestaurantTags(response);
      });
  }, []);

  // Creating a time to Date object
  // function timeToDate (inputTime) {
  //   let tempTime = inputTime.split(":");
  //   let dt = new Date();

  //   // Create the date object accurately to the current date as well
  //   dt.setDate(dt.getDate());
  //   dt.setHours(tempTime[0]);
  //   dt.setMinutes(tempTime[1]);
  //   dt.setSeconds(tempTime[2]);
    
  //   return dt;
  // }

  // Preview Images
  const [profilePreview, setProfilePreview] = useState();
  const [bannerPreview, setBannerPreview] = useState();

  // Image profilePreview for Profile Picture
  useEffect(() => {
    if(profileImage){
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePreview(reader.result);
        console.log("1" + profilePreview)
      }
      reader.readAsDataURL(profileImage);
    }
    else {
      setProfilePreview(DefaultProfile);
    }
  }, [profileImage, profilePreview])

  // Image preivew for Restaurant Banner
  useEffect(() => {
    if(bannerImage){
      const reader = new FileReader();
      reader.onload = () => {
        setBannerPreview(reader.result);
        console.log("Preivew: " + bannerPreview);
      }
      reader.readAsDataURL(bannerImage);
    }
    else {
      setBannerPreview(DefaultShopfront);
    }
  }, [bannerImage, profilePreview, bannerPreview])

  // Some useful async functions that goes with the component to make things easier
  
  // This one to post the user data to the server
  async function postPersonal(){
    console.log(profileImage);
    try {
      const response = await postPersonalProfile(profileImage, fName, lName, personalPhone,
        personalEmail, personalAdd, personalPostal);
      return response.api_msg;
    }
    catch (error) {
      return error;
    }
  }

  async function postRestaurant(){
    try {
      const response = await postRestaurantProfile(bannerImage, restAdd, restPostal, tags, openTime, closeTime);
      return response.api_msg;
    }
    catch (error) {
      return error;
    }
  }

  async function postPassword(){
    try {
      const response = await postChangePW(oldPW, newPW);
      return response.api_msg;
    }
    catch (error) {
      return error;
    }
  }

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
    
    // HANDLE STEP 1 VALIDATION (PERSONAL PROFILE VALIDATION)
    if (activeStep === 0) {
      // VALIDATION FOR DETAILS
      var validationErr = 0;
      // Ensure that the first name / last name isn't blank
      if (fName === '' || lName === '') {
        alert ("First name / last name cannot be blank!");
        validationErr++;
      }

      // Ensure that phone number isn't blank
      if (personalPhone === '') {
        alert ("Phone number cannot be blank!");
        validationErr++;
      }

      // ensure that email isn't blank
      if (personalEmail === '') {
        alert("Email cannot be blank!");
        validationErr++;
      }

      // ensure that address isn't blank
      if (personalAdd === '' || personalPostal === '') {
        alert("Address and Postal code cannot be blank!");
        validationErr++;
      }

      if (validationErr === 0) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
      };
    }
    
    // HANDLE STEP 2 VALIDATION (RESTAURANT INFORMATIONN)
    if (activeStep === 1) {
      // VALIDATION FOR DETAILS
      var validationErr2 = 0;

      const convertedOpeningTime = openTime.toLocaleTimeString('en-GB');
      const convertedClosingTime = closeTime.toLocaleTimeString('en-GB');
      // console.log(convertedOpeningTime, convertedClosingTime)

      if (restAdd === '' || restPostal === '') {
        alert("Restaurant Address cannot be blank!");
        validationErr2++;
      }

      if (tags.length === 0 || tags.length > 3) {
        alert("You must choose at least 1 tag and a maximum of 3 tags!");
        validationErr2++;
      }

      if (convertedOpeningTime > convertedClosingTime) {
        alert("Opening time cannot be later than closing time. Please double check your settings!");
        validationErr2++;
      }

      if (validationErr2 === 0) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
      };
    }
    
    // HANDLE STEP 3 VALIDATION (PASSWORD)
    if (activeStep === 2) {
      if (newPW !== confirmNewPW) {
        alert("Please type the same password in the new password and confirm password fields. You must change your password to continue");
      }
      else {
        // NO FURTHER STEPS. HANDLE FINISH
        handleFinish();
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Function to handle closing of the form.
  const handleReset = () => {
    setFirstLog(false);
  };

  // HANDLE FINAL SUBMIT 
  // NOTE: This is where we submit the data to the database
  const handleFinish = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    
    // Post the personal profile
    postPersonal()
      .then((response) => {
        console.log(response);
      })
      .catch(error => console.log(error));
    
    // Post the restaurant profile
    postRestaurant()
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
  }

  return (
    <Box sx={{ width: '95%', margin:'30px auto'}}>
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
                <Box sx={{position:'relative', top:'10px', textAlign:'center', alignContent: "center"}}>
                  <img width="80%" src={profilePreview} alt="additem" />
                  <Box sx={{position:'relative', top:'10px', textAlign:'center', alignContent: "center"}}>
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
                      }} />
                    <Typography sx={{textAlign:'center', fontSize:'16px', textDecoration:'underline', cursor:'pointer'}}>Upload Photo</Typography>
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
              variant="outlined"
            >
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
      : activeStep === 1 ? (
        <React.Fragment>
          <Box sx={themes.boxStyle}>
            <Typography sx={themes.textHeader}>
              Update your restaurant information
            </Typography>
            <Divider variant="middle" />
            <Box sx={{height:'300px'}}>
              <Typography sx={{textAlign:'center', fontSize:'15px', mt:'5px', fontWeight:'bold'}}>Banner Photo</Typography>
                <Box sx={{position:'relative', top:'10px', textAlign:'center', alignContent: "center"}}>
                  <img height="220px" src={bannerPreview} alt="banner" />
                    <Box sx={{position:'relative', top:'10px'}}>
                      <label htmlFor="bannerImage">
                      <input
                        hidden 
                        type="file" 
                        id="bannerImage" 
                        accept=".png" 
                        onChange={event => {
                          const imageFile = event.target.files[0];
                          console.log(imageFile);
                          setBannerImage(imageFile);
                        }} 
                        />
                        <Typography sx={{textAlign:'center', fontSize:'16px', textDecoration:'underline', cursor:'pointer'}}>Upload Photo</Typography>
                      </label>
                    </Box>
                </Box>
            </Box>

            <Box sx={{height:'auto'}}>
              <Divider variant="middle" />
            </Box>

            <TextField sx={{width:'85%', margin:'30px auto 10px'}}
              id="rest-address" 
              value={restAdd}
              label="Restaurant Address (Required*):"  
              multiline rows={3} 
              variant="filled" 
              onChange={(e)=> setRestAdd(e.target.value)}
            />
            
            <TextField sx={{width:'85%', marginBottom:'10px auto'}}
              id="rest-postal" 
              value={restPostal}
              label="Restaurant Postal Code (Required*):"  
              variant="filled" 
              inputProps={{ maxLength: 6 }}
              onChange={(e)=> setRestPostal(e.target.value.replace(/[^0-9]/g, ''))}
            />

            <FormControl sx={{ m:"15px auto", width: '85%' }}>
              <InputLabel color='primary' id="restaurant-tags">Tags</InputLabel>
              <Select
                labelId="tags"
                id="restaurant-tags"
                multiple
                value={tags}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {restaurantTags.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{width:'85%', margin:'0px auto 15px'}}>
            <Typography  sx={{textAlign:'left', margin:'15px auto'}}>Operating Hours</Typography>
            <Stack direction="row" spacing={2} sx={{margin:'15px auto'}}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  label="Opening Time" 
                  value={openTime} 
                  onChange={(openingTimeValue) => {
                    setOpenTime(openingTimeValue);
                  }} 
                  renderInput={(params) => 
                    <TextField {...params} />
                  }
                />
                <TimePicker
                  label="Closing Time" 
                  value={closeTime} 
                  onChange={(closingTimeValue) => {
                    setCloseTime(closingTimeValue);
                  }} 
                  renderInput={(params) => 
                    <TextField {...params} />
                  }
                />
              </LocalizationProvider>
            </Stack>
            </Box>

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

            <Button onClick={handleNext} variant="outlined">
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}