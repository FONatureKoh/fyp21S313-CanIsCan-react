import React, {useState, useEffect} from 'react'
import { TextField, Grid, Button, Typography, CardContent, CardHeader, Card, Dialog, DialogActions, 
DialogContent, DialogContentText, DialogTitle, Stack, Box, OutlinedInput, InputLabel, MenuItem, FormControl, Select, Chip } from '@mui/material'
import bannerpic from '../../../assets/temp/eg-biz1.png'
import { useHistory } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import { Block } from '@mui/icons-material';
import { restaurantProfile, retrieveRestaurantTags } from '../../restaurant_controller'

// New Imports for the time picker
import { TimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
// Controller import
import { editRestaurantInfo } from '../../restaurant_controller';

export default function EditProfile({restaurantInfo}) {
  // Testing purposes
  // ------------------------------------------------------------------- //
  // DRAW ALL TAGS AVAILABLE INTO THIS ARRAY
  // It will set the drop down list
  // The rest are handled by the form and on change
  const [allRestaurantTags, setAllRestaurantTags] = useState([]);

  useEffect(() => {
    async function getTags() {
      const tags = await retrieveRestaurantTags()
      setAllRestaurantTags(tags.restaurantTags);
    }
    getTags();
  },[]);

  // Creating a time to Date object
  function timeToDate (inputTime) {
    let tempTime = inputTime.split(":");
    let dt = new Date();

    // Create the date object accurately to the current date as well
    dt.setDate(dt.getDate());
    dt.setHours(tempTime[0]);
    dt.setMinutes(tempTime[1]);
    dt.setSeconds(tempTime[2]);
    
    return dt;
  }

  // Dialog state
  const [dialogState, setDialogState] = useState(false);

  // Set the things from the restaurantInfo
  const history = useHistory();
  const [restaurantStatus, setRestaurantStatus] = useState(restaurantInfo.rest_status);
  const [imageFile, setImageFile] = useState();
  const [restaurantName, setRestaurantName] = useState(restaurantInfo.restaurant_name);
  const [restaurantPhone, setRestaurantPhone] = useState(restaurantInfo.rest_phone_no);
  const [restaurantEmail, setRestaurantEmail] = useState(restaurantInfo.rest_email);
  const [restaurantAddress, setRestaurantAddress] = useState(restaurantInfo.rest_address_info);
  const [postalCode, setPostalCode] = useState(restaurantInfo.rest_postal_code);
  const [openTime, setOpenTime] = useState(timeToDate(restaurantInfo.rest_opening_time));
  const [closeTime, setCloseTime] = useState(timeToDate(restaurantInfo.rest_closing_time));
  const [tags, setTags] = useState(restaurantInfo.rest_tags);
  
  // Drop down item settings
  // NOTE: I moved the tag up to where all the use states are! 
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
      // On autofill we get a the stringified value
      // Kelvin ah I changed it to ', ' cos i realised array got the 
      // space when I construct it on my end
      typeof value === 'string' ? value.split(', ') : value,
    );
  }
  
  async function editRestInfo() {
    try {
      const response = await editRestaurantInfo(imageFile, restaurantInfo.rest_banner_ID, restaurantName, restaurantPhone, restaurantEmail,
        restaurantAddress, postalCode, openTime, closeTime, tags);
      
      return response.api_msg;
    }
    catch (error) {
      return error;
    }
  }

  const cancelBtn = () => {
    if(restaurantName === restaurantInfo.restaurant_name && 
    restaurantPhone === restaurantInfo.rest_phone_no && 
    restaurantAddress === restaurantInfo.restaurantAddress && openTime === restaurantInfo.openTime && 
    closeTime === restaurantInfo.closeTime){
      history.push('/generalmanager/restaurantinformation');
    }
    else{
      cancelBtn1();
    }
  }

  const cancelBtn1 = () => {
    setDialogState(true);
  };

  const handleNo = () => {
    setDialogState(false);
  };

  const handleYes = () => {
    history.push('/generalmanager/restaurantinformation');
  };

  function submitChange() {
    editRestInfo()
      .then((response) => alert(response))
      .catch(error => alert(error));
    
    history.push('/generalmanager/restaurantinformation');
  }

  const Input = styled('input')({
    display: 'none',
  });

 

  return (
  <div>
    <Card variant="outlined" sx={{margin:'auto', padding:'5px', borderRadius:'10px'}}>
      <CardHeader title="Edit Restaurant Information" />
      <CardContent >
        <Grid container sx={{margin:'auto', textAlign:'left', width: '70%'}} >
          <Grid item xs={12} sx={{textAlign:'center', marginTop:'3%;'}}>
            <Box>
              <img src={bannerpic} width="55%"/>
            </Box>
            <Box> 
            <label htmlFor="imageBanner">
              <Input 
                type="file"
                id="imageBanner"
                accept=".png"
                onChange={event => {
                  const imageFile = event.target.files[0];
                  setImageFile(imageFile);
                }} />
              <Typography sx={{textAlign:'center', textDecoration:'underline', cursor:'pointer'}}>Upload Photo</Typography>
            </label>
            </Box>
          </Grid>
    
          <Grid item xs={12} sx={{textAlign:'center'}}>
            
            <TextField sx={{width:'100%', margin:'15px auto'}} 
              id="filled-basic" 
              label="Restaurant Name (Required*):" 
              variant="filled" 
              size="small" 
              value={restaurantName} 
              onChange={(e)=>setRestaurantName(e.target.value)}
            />

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

            <TextField sx={{width:'100%', margin:'15px auto'}} 
              id="filled-basic" 
              label="Restaurant Contact Number (Required*):" 
              variant="filled" 
              size="small" 
              value={restaurantPhone} 
              inputProps={{ maxLength: 8 }}
              onChange={(e)=>setRestaurantPhone(e.target.value.replace(/[^0-9]/g, ''))}
            />

            <TextField sx={{width:'100%', margin:'15px auto'}} 
              id="filled-basic" 
              label="Restaurant Email (Required*):" 
              variant="filled" 
              size="small" 
              value={restaurantEmail} 
              onChange={(e)=>setRestaurantEmail(e.target.value)}
            />

            <TextField sx={{width:'100%', margin:'15px auto'}}
              id="filled-multiline-static" 
              label="Restaurant Address (Required*):"  
              multiline 
              rows={3} 
              variant="filled" 
              value={restaurantAddress} 
              onChange={(e)=>setRestaurantAddress(e.target.value)}
            />

            <TextField sx={{width:'100%', margin:'15px auto'}} 
              id="filled-basic" 
              label="Postal Code:" 
              variant="filled" 
              size="small" 
              value={postalCode} 
              inputProps={{ maxLength: 6 }}
              onChange={(e)=>setPostalCode(e.target.value.replace(/[^0-9]/g, ''))}
            />
            <FormControl sx={{ m:"1px", width: '100%' }}>
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
                {allRestaurantTags.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sx={{textAlign:'center', marginTop:'5%'}}>
            <Button variant="contained" onClick={submitChange} color="inherit" sx={{width:'45%', bgcolor:"#969696", textAlign:'flex-start', marginRight:'5%'}}>Confirm</Button>
            <Button variant="contained" onClick={cancelBtn} color="inherit" sx={{width:'45%', bgcolor:"#CCCCCC", textAlign:'flex-start'}}>Cancel</Button>

            <Dialog open={dialogState} onClose={handleNo} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
              {"Unsaved Changes"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Do you want to continue?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleYes} autoFocus>Yes</Button>
              <Button onClick={handleNo}>No</Button>
            </DialogActions>
            </Dialog>

          </Grid>
        </Grid>
      </CardContent>
    </Card>
  </div>
  )
}