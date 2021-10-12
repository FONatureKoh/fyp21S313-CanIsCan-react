import React, {useState} from 'react'
import { TextField, Grid, Button, Typography, CardContent, CardHeader, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack } from '@mui/material'
import bannerpic from '../../../assets/temp/eg-biz1.png'
import { useHistory } from 'react-router-dom'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';

export default function EditProfile({restaurantinfo}) {

  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [rName, setRName] = useState(restaurantinfo.rName);
  const [rPhone, setRPhone] = useState(restaurantinfo.rPhone);
  const [rAddress, setRAddress] = useState(restaurantinfo.rAddress);
  const [openTime, setOpenTime] = useState(restaurantinfo.openTime);
  const [closeTime, setCloseTime] = useState(restaurantinfo.closeTime);
  const [value, setValue] = useState(null);

  const cancelBtn = () => {
    if(rName == restaurantinfo.rName && rPhone == restaurantinfo.rPhone && rAddress == restaurantinfo.rAddress){
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
    console.log(rPhone);
    console.log(rAddress);
  }

  return (
  <div>
    <Card variant="outlined" sx={{margin:'auto', padding:'5px', borderRadius:'10px'}}>
      <CardHeader title="Edit Restaurant Information" />
        <CardContent >
          <Grid container sx={{margin:'auto', textAlign:'left', width: '70%'}} >
            <Grid item xs={12} sx={{textAlign:'center', marginTop:'10%;'}}>
              <img src={bannerpic} width="55%"/>
              <Typography sx={{textAlign:'center', fontSize:'1 0px', textDecoration:'underline', cursor:'pointer'}}>Upload Photo</Typography>
            </Grid>
      
            <Grid item xs={12} sx={{textAlign:'center'}}>
              
              <TextField sx={{width:'100%', margin:'15px'}} id="filled-basic" label="Restaurant Name (Required*):" variant="filled" size="small" defaultValue={restaurantinfo.rName} onChange={(e)=>setRName(e.target.value)}/>

               <Typography  sx={{textAlign:'left', margin:'15px'}}>Operating Hours</Typography>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker value={value} label='Opening Time' onChange={setValue} renderInput={(params) => <TextField {...params} />}/>
               </LocalizationProvider>

              <TextField sx={{width:'100%', margin:'15px'}} id="filled-basic" label="Restaurant Contact Number (Required*):" variant="filled" size="small" defaultValue={restaurantinfo.rPhone} onChange={(e)=>setRPhone(e.target.value)}/>

              <TextField id="filled-multiline-static" label="Restaurant Address (Required*):"  multiline rows={4} variant="filled" sx={{width:'100%', margin:'15px'}} defaultValue={restaurantinfo.rAddress} onChange={(e)=>setRAddress(e.target.value)}/>
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