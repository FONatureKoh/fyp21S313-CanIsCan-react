import React, { useEffect, useState } from 'react'
import { Grid, Button, Typography, CardContent, CardHeader, Card } from '@mui/material'
import { Route, Switch, Link } from 'react-router-dom';
import EditProfile from './components/editprofile';
import ChangePassword from './components/changepw';
import { retrieveUserProfile } from './profile_controller';
import { useRouteMatch } from 'react-router';

export default function ViewProfile() {
  // Declaring profile information state
  const [userProfile, setUserProfile] = useState([]);

  const match = useRouteMatch('/:userrole/profile/');

  // Async Functions
  async function getUserInfo() {
    try {
      const userProfile = await retrieveUserProfile();
      return userProfile;
    }
    catch (error) {
      return error;
    }
  }

  // User Profile retrieval
  useEffect(() => {
    console.log("Use effect triggered!");

    // Get userInfo
    getUserInfo()
      .then((response) => {
        // Set the user's profile
        setUserProfile(response);
      })
      .catch(error => console.log(error));     
  },[])
    
  const boldtitle = {
    fontSize:'1 0px', 
    fontWeight:'bold', 
    marginTop:'20px',
    marginBottom:'5px'
  };

  return (
    <Switch>
      <Route exact path="/:userrole/profile">
      <div>
        <Card variant="outlined" sx={{margin:'auto', marginTop:'20vmin', width:'60%', padding:'5px', borderRadius:'10px'}}>
          <CardHeader title="Personal Information" />
            <CardContent>
              <Grid container sx={{margin:'auto', textAlign:'left', width: '70%'}} >
                <Grid item xs={6} sx={{marginTop:'10%;'}}>
                  <img src={userProfile.profile_image_base64} alt="" width="80%"/>
                </Grid>

                <Grid item xs={6} sx={{textAlign:'center'}}>
                  <Typography sx={boldtitle}>Username</Typography>
                  <Typography>
                    {userProfile.username}
                  </Typography>
                  
                  <Typography sx={boldtitle}>Name</Typography>
                  <Typography>
                    {userProfile.first_name} {userProfile.last_name}
                  </Typography>

                  <Typography sx={boldtitle}>Phone Number</Typography>
                  <Typography>
                    {userProfile.phone_no}
                  </Typography>

                  <Typography sx={boldtitle}>Email Address</Typography>
                  <Typography>
                    {userProfile.email}
                  </Typography>

                  <Typography sx={boldtitle}>Address</Typography>
                  <Typography>
                    {userProfile.address}
                  </Typography>
                  <Typography>
                    S({userProfile.postal_code})
                  </Typography>
                </Grid>

                <Grid item xs={12} sx={{textAlign:'center', marginTop:'5%'}}>
                  <Button variant="contained" component={Link} to={`/${match.params.userrole}/profile/editprofile`} color="inherit" sx={{width:'45%', bgcolor:"#969696", textAlign:'flex-start', marginRight:'5%'}}>Edit Information</Button>
                  <Button variant="contained" component={Link} to={`/${match.params.userrole}/profile/changepassword`} color="inherit" sx={{width:'45%', bgcolor:"#CCCCCC", textAlign:'flex-start'}}>Change Password</Button>
                </Grid>
              </Grid>
            </CardContent>
        </Card>
      </div>
      </Route>

      <Route path="/:userrole/profile/editprofile"><EditProfile userProfile={userProfile} setUserProfile={setUserProfile}/></Route>
      <Route path="/:userrole/profile/changepassword"><ChangePassword userProfile={userProfile}/></Route>
    </Switch>
  )
}
