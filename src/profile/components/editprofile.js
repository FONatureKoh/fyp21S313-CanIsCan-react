import React, { useState, useEffect, useContext } from 'react';
import { TextField, Grid, Button, Typography, CardContent, CardHeader, Card, Dialog, 
DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useHistory } from 'react-router-dom'
import { editPersonalProfile } from '../profile_controller';
import { useRouteMatch } from 'react-router';
import { styled } from '@mui/styles';
import { retrieveUserProfile } from '../../restaurant/restaurant_controller';
import { UserContext } from '../../store/user_context';

export default function EditProfile({userProfile, setUserProfile}) {
  // USE ROUTE MATCH TO GET USER ROLE
  const match = useRouteMatch('/:userrole/profile/editprofile');
  const userrole = match.params.userrole;

  // USECONTEXT BECAUSE OF IMAGE UPDATE
  const userContext = useContext(UserContext);

  // Declaring profile information state
  const [imageFile, setImageFile] = useState('');
  const [oldImageFile, setOldImageFile] = useState(userProfile.profile_image);
  const [username, setUsername] = useState(userProfile.username);
  const [fName, setFName] = useState(userProfile.first_name);
  const [lName, setLName] = useState(userProfile.last_name);
  const [phone, setPhone] = useState(userProfile.phone_no);
  const [email, setEmail] = useState(userProfile.email);
  const [address, setAddress] = useState(userProfile.address);
  const [postalCode, setPostalCode] = useState(userProfile.postal_code);

  // Async Function to edit profile
  async function editProfileInfo() {
    try {
      const response = await editPersonalProfile(imageFile, fName,
        lName, phone, email, address, postalCode, oldImageFile);
      return response.api_msg;
    } 
    catch (error) {
      return error;
    }
  }

  // Image Preivew Stuff  
  const [preview, setPreview] = useState(userProfile.profile_image_base64);

  // Imagefile preview render
  useEffect(() => {
    // console.log("Imagefile useEfect triggered");
    if(imageFile){
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
        // console.log("1" +preview)
      }
      reader.readAsDataURL(imageFile);
    }
  }, [imageFile, preview])

  const history = useHistory();
  const [open, setOpen] = useState(false);
  
  const cancelBtn = () => {
    // if(name == personalinfo.name && phone == personalinfo.phone && address == personalinfo.address){
    //   history.push('/generalmanager/profile');
    // }
    // else{
    //   cancelBtn1();
    // }
  }

  const cancelBtn1 = () => {
    setOpen(true);
  };

  const handleNo = () => {
    setOpen(false);
  };

  const handleYes = () => {
    history.push(`/${userrole}/profile`);
  };

  function submitChange(){
    // Profile edit validation
    var errorCount = 0;

    if (fName === '' || lName === '') {
      alert("First and last name cannot be blank!");
      errorCount++;
    }

    if (phone === '') {
      alert("Your phone number cannot be blank!");
      errorCount++;
    }

    if(email === '') {
      alert("Email cannot be blank!");
      errorCount++;
    }

    if (address === '' || postalCode === '') {
      alert("Address / Postal code cannot be blank!");
      errorCount++;
    }

    if (errorCount === 0) {
      editProfileInfo()
        .then((response) => {
          if (response === "Successful!") {          
            alert("Update successful!");

            // Update successful! Lets reload the profile
            retrieveUserProfile()
              .then((response) => {
                setUserProfile(response);
                userContext.userFullName[1](response.first_name + " " + response.last_name);
                userContext.profileImage[1](response.profile_image_base64);
              })
              .catch(err => console.log(err));

            // Then we bring the person back to the profile page!
            history.push(`/${userrole}/profile`);
          }
          else
            alert("Something went wrong: " + response);
        })
        .catch(err => console.log(err));
    }
  }

  const Input = styled('input')({
    display: 'none',
  });

  return (
    <div>
      <Card variant="outlined" sx={{margin:'auto', marginTop:'20vmin', width:'70%', padding:'5px', borderRadius:'10px'}}>
      <CardHeader title="Edit Personal Information" />
        <CardContent >
          <Grid container sx={{margin:'auto', textAlign:'left', width: '70%'}} >
            <Grid item xs={6} sx={{textAlign:'center', marginTop:'10%;'}}>
              <img src={preview} alt="No Preview Available" width="90%"/>
              <label htmlFor="imageFile">
              <Input 
                type="file"
                id="imageFile"
                accept=".png"
                onChange={event => {
                  const imageFile = event.target.files[0];
                  setImageFile(imageFile);
                }} />
              <Typography sx={{textAlign:'center', fontSize:'1 0px', textDecoration:'underline', cursor:'pointer'}}>Upload Photo</Typography>
              </label>
            </Grid>

            <Grid item xs={6} sx={{textAlign:'center'}}>
              <TextField sx={{width:'100%', margin:'15px'}} 
                id="filled-basic" 
                label="Username:" 
                variant="filled" 
                size="small" 
                value={username}
                onChange={(e)=>setUsername(e.target.value)} 
                disabled
              />

              <TextField sx={{width:'100%', margin:'15px'}} 
                id="filled-basic" 
                label="First Name (Required*):" 
                variant="filled" 
                size="small" 
                value={fName} 
                onChange={(e)=>setFName(e.target.value)}
              />

              <TextField sx={{width:'100%', margin:'15px'}} 
                id="filled-basic" 
                label="Last Name (Required*):" 
                variant="filled" 
                size="small" 
                value={lName} 
                onChange={(e)=>setLName(e.target.value)}
              />

              <TextField sx={{width:'100%', margin:'15px'}} 
                id="filled-basic" 
                label="Phone Number (Required*):" 
                variant="filled" 
                inputProps={{ maxLength: 8 }}
                size="small" 
                value={phone} 
                onChange={(e)=>setPhone(e.target.value.replace(/[^0-9]/g, ''))}
              />

              <TextField sx={{width:'100%', margin:'15px'}} 
                id="filled-basic" 
                label="Email (Required*):" 
                variant="filled" 
                size="small" 
                value={email} 
                onChange={(e)=>setEmail(e.target.value)}
              />

              <TextField sx={{width:'100%', margin:'15px'}} 
                id="filled-multiline-static" 
                label="Address (Required*):"  
                multiline rows={4} 
                variant="filled" 
                value={address} 
                onChange={(e)=>setAddress(e.target.value)}
              />

              <TextField sx={{width:'100%', margin:'15px'}} 
                id="filled-basic" 
                label="Postal Code (Required*):" 
                variant="filled" 
                size="small" 
                inputProps={{ maxLength: 6 }}
                value={postalCode} 
                onChange={(e)=>setPostalCode(e.target.value.replace(/[^0-9]/g, ''))}
              />
            </Grid>

            <Grid item xs={12} sx={{textAlign:'center', marginTop:'5%'}}>
              <Button variant="contained" onClick={submitChange} color="inherit" sx={{width:'45%', bgcolor:"#969696", textAlign:'flex-start', marginRight:'5%'}}>Confirm</Button>
              <Button variant="contained" onClick={handleYes} color="inherit" sx={{width:'45%', bgcolor:"#CCCCCC", textAlign:'flex-start'}}>Cancel</Button>
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