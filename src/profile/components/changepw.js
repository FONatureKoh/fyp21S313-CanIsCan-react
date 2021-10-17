import React, {useState} from 'react'
import { TextField, Grid, Button, Typography, CardContent, CardHeader, 
Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useHistory } from 'react-router-dom'
import { changePwController, verifyPwController } from '../profile_controller';

export default function ChangePassword({userProfile}) {
  // Test lines
  // console.log(userProfile);
  
  // useHistory
  const history = useHistory();

  // Getting some values into the use states
  const [open, setOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState(userProfile.password);
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

  // handleNo and handleYes are functions for the open dialog when a changepw
  // event is triggered
  const handleNo = () => {
    setOpen(false);
  };

  const handleYes = () => {
    history.push('/generalmanager/profile');
  };

  // Main function for handling the password change. For more security, we avoid
  // storing the password at all in any of the profiles. In this case, we need to 
  // first send the old password to the backend server to verify then approve
  // said change password request
  async function submitChange(){
    // 1. Verify old password
    const verifyOldPassword = await verifyPwController(oldPassword);

    if (verifyOldPassword["api_msg"] == "password match") {
      // 2. Ensure that the two new password fields are identical
      if (newPassword == confirmPassword && newPassword != '') {
        const changePwResponse = await changePwController(oldPassword, newPassword);

        console.log(changePwResponse);

        // Change password should be succesful at this point. We could send back just
        // the userType and feed it into a redirect function? anyway changePwReponse
        // will contain the userType so that we don't need to go and draw out the userType again
      }
      else {
        alert('New Password entries do not match or found to be blank. Please try again.');
      }
      // 3. if all the checks are good, send the request over with the old and new
      // password for final verification, before entering into the database
    }
    else {
      alert('Your old password entry is invalid!');
    }
    

    
    // if(oldPassword == personalinfo.password && newPassword == confirmPassword)
    // {
    //   console.log(newPassword);
    //   console.log('Change password is successful');
    // }
    // else if(oldPassword == personalinfo.password && newPassword != confirmPassword)
    // {
    //   alert('The new passwords does not match!');
    // }
    // else if(oldPassword != personalinfo.password)
    // {
    //   alert('Your old password entry is invalid!');
    // }
  }

  return (
    <div>
        <Card variant="outlined" sx={{margin:'auto', marginTop:'20vmin', width:'60%', padding:'5px', borderRadius:'10px'}}>
          <CardHeader title="Change Password" />
          <CardContent >
            <Grid container sx={{margin:'auto', textAlign:'left', width: '70%'}} >
              <Grid item xs={12} sx={{textAlign:'center'}}>
                <TextField 
                  sx={{width:'100%', margin:'15px'}} 
                  id="outline-password-input" 
                  type="password" 
                  label="Enter Old Password:" 
                  variant="filled" 
                  size="small" 
                  onChange={(e)=>setOldPassword(e.target.value)}
                />

                <TextField 
                  sx={{width:'100%', margin:'15px'}} 
                  id="outline-password-input" 
                  type="password" 
                  label="Enter New Password:" 
                  variant="filled" 
                  size="small" 
                  onChange={(e)=>setNewPassword(e.target.value)}
                />

                <TextField 
                  sx={{width:'100%', margin:'15px'}} 
                  id="outline-password-input" 
                  type="password" 
                  label="Re-enter New Password:" 
                  variant="filled" 
                  size="small" 
                  onChange={(e)=>setConfirmPassword(e.target.value)}
                />
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