import React, {useState, useEffect} from 'react';
import { TextField, Grid, Button, Typography, CardContent, CardHeader, Card, Dialog, 
DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useHistory } from 'react-router-dom'
import { editPersonalProfile, getImage } from '../profile_controller';
import { useRouteMatch } from 'react-router';
import { styled } from '@mui/styles';

export default function EditProfile({userProfile}) {
  // USE ROUTE MATCH TO GET USER ROLE
  const match = useRouteMatch('/:userrole/profile/editprofile');

  // Declaring profile information state
  const [profileImage, setProfileImage] = useState('');
  const [imageFile, setImageFile] = useState('');
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
      const response = await editPersonalProfile(profileImage, fName,
        lName, phone, email, address, postalCode);
      return response.api_msg;
    } 
    catch (error) {
      return error;
    }
  }

  // Retrieve profile image
  async function getProfileImage(imageID) {
    try {
      console.log(imageID);
      const response = await getImage(imageID);

      return response;
    }
    catch (error) {
      return error;
    }
  }

  // Image Preivew Stuff  
  const [preview, setPreview] = useState();

  // Getting the profile image
  useEffect(() => {
    console.log("useEffect triggered");

    getProfileImage(userProfile.profile_image)
      .then((response) => {
        console.log(response);
        setPreview(response);
      })
  }, [])

  // Imagefile preview render
  useEffect(() => {
    console.log("Imagefile useEfect triggered");
    if(imageFile){
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
        console.log("1" +preview)
      }
      reader.readAsDataURL(imageFile);
    }
    else{
      setPreview(null);
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
    history.push(`/${match.params.userrole}/profile`);
  };

  function submitChange(){
    editProfileInfo()
      .then((response) => {
        if (response === "Successful!") {          
          alert("Update successful!");
          history.push(`/${match.params.userrole}/profile`);
        }
        else
          alert("Something went wrong: " + response);
      })
      .catch(error => console.log(error));
  }

  const Input = styled('input')({
    display: 'none',
  });

  return (
    <div>
      <Card variant="outlined" sx={{margin:'auto', marginTop:'20vmin', width:'60%', padding:'5px', borderRadius:'10px'}}>
      <CardHeader title="Edit Personal Information" />
        <CardContent >
          <Grid container sx={{margin:'auto', textAlign:'left', width: '70%'}} >
            <Grid item xs={6} sx={{textAlign:'center', marginTop:'10%;'}}>
              <img src={preview} alt="No Preview Available" width="60%"/>
              <label htmlFor="imageFile">
              <Input 
                type="file"
                id="imageFile"
                accept=".png"
                onChange={event => {
                  const imageFile = event.target.files[0];
                  setProfileImage(imageFile);
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
                size="small" 
                value={phone} 
                onChange={(e)=>setPhone(e.target.value)}
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
                value={postalCode} 
                onChange={(e)=>setPostalCode(e.target.value)}
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