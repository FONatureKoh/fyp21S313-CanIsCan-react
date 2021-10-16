import React, {useState} from 'react'
import { TextField, Grid, Button, Typography, CardContent, CardHeader, 
Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useHistory } from 'react-router-dom'

export default function ChangePassword({personalinfo}) {

  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState(personalinfo.password);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const cancelBtn = () => {
    if(newPassword == '' && confirmPassword == ''){
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
    if(oldPassword == personalinfo.password && newPassword == confirmPassword)
    {
      console.log(newPassword);
      console.log('Change password is successful');
    }
    else if(oldPassword == personalinfo.password && newPassword != confirmPassword)
    {
      alert('The new passwords does not match!');
    }
    else if(oldPassword != personalinfo.password)
    {
      alert('Your old password entry is invalid!');
    }
  }

  return (
    <div>
        <Card variant="outlined" sx={{margin:'auto', marginTop:'20vmin', width:'60%', padding:'5px', borderRadius:'10px'}}>
          <CardHeader title="Change Password" />
          <CardContent >
            <Grid container sx={{margin:'auto', textAlign:'left', width: '70%'}} >
              <Grid item xs={12} sx={{textAlign:'center'}}>

              <TextField sx={{width:'100%', margin:'15px'}} id="outline-password-input" type="password" label="Enter New Password:" variant="filled" size="small" onChange={(e)=>setNewPassword(e.target.value)}/>

              <TextField sx={{width:'100%', margin:'15px'}} id="outline-password-input" type="password" label="Re-enter New Password:" variant="filled" size="small" onChange={(e)=>setConfirmPassword(e.target.value)}/>

              <TextField sx={{width:'100%', margin:'15px'}} id="outline-password-input" type="password" label="Enter Old Password:" variant="filled" size="small" onChange={(e)=>setOldPassword(e.target.value)}/>
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