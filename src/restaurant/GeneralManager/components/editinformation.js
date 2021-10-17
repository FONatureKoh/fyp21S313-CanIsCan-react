import React, {useState} from 'react'
import { TextField, Grid, Button, Typography, CardContent, CardHeader, Card, Dialog, DialogActions, 
DialogContent, DialogContentText, DialogTitle, Stack, Box } from '@mui/material'
import bannerpic from '../../../assets/temp/eg-biz1.png'
import { useHistory } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';
import { Block } from '@mui/icons-material';

// Controller import
//import { editRestaurantInfo } from '../../restaurant_controller';

export default function EditProfile({restaurantinfo}) {

  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState();
  const [rName, setRName] = useState(restaurantinfo.rName);
  const [rPhone, setRPhone] = useState(restaurantinfo.rPhone);
  const [rAddress, setRAddress] = useState(restaurantinfo.rAddress);
  const [openTime, setOpenTime] = useState(restaurantinfo.openTime);
  const [closeTime, setCloseTime] = useState(restaurantinfo.closeTime);

  // Testing purposes
  // ------------------------------------------------------------------- //
  // DRAW ALL TAGS AVAILABLE INTO THIS ARRAY
  // It will set the drop down list
  // The rest are handled by the form and on change

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
  

  {/*async function editRestaurantInfo() {
    var testController = await editRestaurantInfo(imageBanner, rName, rPhone, rAddress, openTime, closeTime);
    console.log (testController);
  }*/}

  const cancelBtn = () => {
    if(rName == restaurantinfo.rName && rPhone == restaurantinfo.rPhone && rAddress == restaurantinfo.rAddress && openTime == restaurantinfo.openTime && closeTime == restaurantinfo.closeTime){
      history.push('/generalmanager/restaurantinformation');
    }
    else{
      cancelBtn1();
    }
  }

  const cancelBtn1 = () => {
    setOpen(true);
  };

  const handleNo = () => {
    setOpen(false);
  };

  const handleYes = () => {
    history.push('/generalmanager/restaurantinformation');
  };

  function submitChange()
  {
    console.log(rName);
    console.log(openTime);
    console.log(closeTime);
    console.log(rPhone);
    console.log(rAddress);
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
            
            <TextField sx={{width:'100%', margin:'15px auto'}} id="filled-basic" label="Restaurant Name (Required*):" variant="filled" size="small" defaultValue={restaurantinfo.rName} onChange={(e)=>setRName(e.target.value)}/>

            <Typography  sx={{textAlign:'left', margin:'15px auto'}}>Operating Hours</Typography>
            <Stack direction="row" spacing={2} sx={{margin:'15px auto'}}>
              <TextField
                id="time"
                label="Start"
                type="time"
                defaultValue={openTime}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ width: 150 }}
                onChange={(e)=>setOpenTime(e.target.value)}
              />

              <TextField
                id="time"
                label="End"
                type="time"
                defaultValue={closeTime}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ width: 150 }}
                onChange={(e)=>setCloseTime(e.target.value)}
              />
            </Stack>

            <TextField sx={{width:'100%', margin:'15px auto'}} id="filled-basic" label="Restaurant Contact Number (Required*):" variant="filled" size="small" defaultValue={restaurantinfo.rPhone} onChange={(e)=>setRPhone(e.target.value)}/>

            <TextField id="filled-multiline-static" label="Restaurant Address (Required*):"  multiline rows={4} variant="filled" sx={{width:'100%', margin:'15px auto'}} defaultValue={restaurantinfo.rAddress} onChange={(e)=>setRAddress(e.target.value)}/>

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
                {names.map((name) => (
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

            <Dialog open={open} onClose={handleNo} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
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