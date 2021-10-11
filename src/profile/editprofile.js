import React, {useState} from 'react'
import { TextField, Grid, Button, Typography, CardContent, CardHeader, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import john from '../assets/temp/johnsmith.png'
import { useHistory } from 'react-router-dom'

export default function EditProfile({personalinfo}) {

  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState(personalinfo.username)
  const [name, setName] = useState(personalinfo.name);
  const [phone, setPhone] = useState(personalinfo.phone);
  const [address, setAddress] = useState(personalinfo.address);

  const cancelBtn = () => {
    if(name == personalinfo.name && phone == personalinfo.phone && address == personalinfo.address){
      history.push('/generalmanager/profile');
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
    history.push('/generalmanager/profile');
  };

  function submitChange()
  {
    console.log(username);
    console.log(name);
    console.log(phone);
    console.log(address);
  }

  return (
    <div>
      <Card variant="outlined" sx={{margin:'auto', marginTop:'20vmin', width:'60%', padding:'5px', borderRadius:'10px'}}>
      <CardHeader title="Edit Personal Information" />
        <CardContent >
          <Grid container sx={{margin:'auto', textAlign:'left', width: '70%'}} >
            <Grid item xs={6} sx={{textAlign:'center', marginTop:'10%;'}}>
              <img src={john} width="60%"/>
              <Typography sx={{textAlign:'center', fontSize:'1 0px', textDecoration:'underline', cursor:'pointer'}}>Upload Photo</Typography>
            </Grid>

            <Grid item xs={6} sx={{textAlign:'center'}}>
              <TextField sx={{width:'100%', margin:'15px'}} id="filled-basic" label="Username:" variant="filled" size="small" defaultValue={personalinfo.username} onChange={(e)=>setUsername(e.target.value)} disabled/>

              <TextField sx={{width:'100%', margin:'15px'}} id="filled-basic" label="Full Name (Required*):" variant="filled" size="small" defaultValue={personalinfo.name} onChange={(e)=>setName(e.target.value)}/>

              <TextField sx={{width:'100%', margin:'15px'}} id="filled-basic" label="Phone Number (Required*):" variant="filled" size="small" defaultValue={personalinfo.phone} onChange={(e)=>setPhone(e.target.value)}/>

              <TextField id="filled-multiline-static" label="Address (Required*):"  multiline rows={4} variant="filled" sx={{width:'100%', margin:'15px'}} defaultValue={personalinfo.address} onChange={(e)=>setAddress(e.target.value)}/>
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