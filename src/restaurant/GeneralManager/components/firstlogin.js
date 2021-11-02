import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
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
import { styled } from '@mui/styles';
import { postChangePW, postPersonalProfile, postRestaurantProfile, retrieveRestaurantTags } from '../../restaurant_controller';

const steps = ['Update your personal profile', 'Update your restaurant profile', 'Change your password'];

// All useful Async Functions
// This one to get the tags
async function getRestaurantTags(){
  try {
    const tags = await retrieveRestaurantTags();
    return tags.restaurantTags;
  }
  catch (error) {
    return error;
  }
}

// The React Function itself
export default function FirstLogin({setFirstLog}) {
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
  });

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
      setProfilePreview(null);
    }
  }, [profileImage])

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
      setBannerPreview(null);
    }
  }, [bannerImage])

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
      const response = await postRestaurantProfile(bannerImage, restAdd, restPostal, tags);
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

  //STYLED INPUT FOR IMAGE UPLOAD WORD
  const Input = styled('input')({
    display: 'none',
  });

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
                  label="First Name:" 
                  variant="filled" 
                  size="small"
                  onChange={(e)=> setFName(e.target.value)}
                />
                <TextField sx={{width:'40%', margin:'15px 2.5%'}} 
                  id="lname-field" 
                  label="Last Name:" 
                  variant="filled" 
                  size="small" 
                  onChange={(e)=> setLName(e.target.value)}
                />

                <TextField sx={{width:'85%', margin:'15px auto'}} 
                  id="phone-field" 
                  label="Phone Number (Required*):" 
                  variant="filled" 
                  size="small" 
                  onChange={(e)=> setPersonalPhone(e.target.value)}
                />

                <TextField sx={{width:'85%', margin:'15px auto'}} 
                  id="email-field" 
                  label="Email (Required*):" 
                  variant="filled" 
                  size="small" 
                  onChange={(e)=> setPersonalEmail(e.target.value)}
                />

                <TextField sx={{width:'85%', margin:'15px auto'}} 
                  id="address-field" 
                  label="Address (Required*):"  
                  multiline rows={2} 
                  variant="filled" 
                  onChange={(e)=> setPersonalAdd(e.target.value)}
                />

                <TextField sx={{width:'85%', margin:'15px auto'}} 
                  id="postal-code-field" 
                  label="Postal Code (Required*):"  
                  variant="filled" 
                  size="small"
                  onChange={(e)=> setPersonalPostal(e.target.value)}
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

            <TextField sx={{width:'85%', margin:'30px auto 15px'}}
              id="rest-address" 
              label="Restaurant Address (Required*):"  
              multiline rows={4} 
              variant="filled" 
              onChange={(e)=> setRestAdd(e.target.value)}
            />

            <TextField sx={{width:'85%', marginBottom:'10px auto'}}
              id="rest-postal" 
              label="Restaurant Postal Code (Required*):"  
              variant="filled" 
              onChange={(e)=> setRestPostal(e.target.value)}
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

            <Button onClick={handleFinish} variant="outlined">
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}