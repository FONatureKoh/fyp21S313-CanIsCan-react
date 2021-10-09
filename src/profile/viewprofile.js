import React from 'react'
import { Grid, Button, Typography, CardContent, CardHeader, Card } from '@mui/material'
import john from '../assets/temp/johnsmith.png'
import { Route, Switch, Link } from 'react-router-dom';
import EditProfile from './editprofile';
import ChangePassword from './changepw';

export default function ViewProfile() {
    
    const boldtitle = {
       fontSize:'1 0px', 
       fontWeight:'bold', 
       marginTop:'20px',
       marginBottom:'5px'
    };

    const personalinfo = { 
        username: 'johnsmith',
        name: "John Smith", 
        phone: '+65 9876 5432',
        address: 'Blk111, Ang Mo Kio Avenue 1 #01-111 S(111111)'
    };

  return (
    <Switch>
    <Route exact path="/generalmanager/profile">
    <div>
        <Card variant="outlined" sx={{margin:'auto', marginTop:'20vmin', width:'60%', padding:'5px', borderRadius:'10px'}}>
            <CardHeader title="Personal Information" />
            <CardContent >
                <Grid container sx={{margin:'auto', textAlign:'left', width: '70%'}} >
                    <Grid item xs={6} sx={{textAlign:'center', marginTop:'10%;'}}>
                        <img src={john} width="60%"/>
                    </Grid>
      
                <Grid item xs={6} sx={{textAlign:'center'}}>
                    <Typography sx={boldtitle}>Username</Typography>
                    <Typography>
                        {personalinfo.username}
                    </Typography>
                    
                    <Typography sx={boldtitle}>Name</Typography>
                    <Typography>
                        {personalinfo.name}
                    </Typography>

                    <Typography sx={boldtitle}>Phone Number</Typography>
                    <Typography>
                        {personalinfo.phone}
                    </Typography>

                    <Typography sx={boldtitle}>Address</Typography>
                    <Typography>
                        {personalinfo.address}
                    </Typography>
                </Grid>
    
                <Grid item xs={12} sx={{textAlign:'center', marginTop:'5%'}}>
                    <Button variant="contained" component={Link} to="/generalmanager/profile/editprofile" color="inherit" sx={{width:'45%', bgcolor:"#969696", textAlign:'flex-start', marginRight:'5%'}}>Edit Information</Button>
                    <Button variant="contained" component={Link} to="/generalmanager/profile/changepassword" color="inherit" sx={{width:'45%', bgcolor:"#CCCCCC", textAlign:'flex-start'}}>Change Password</Button>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
  </div>
  </Route>
  <Route path="/generalmanager/profile/editprofile" component= {EditProfile}/>
  <Route path="/generalmanager/profile/changepassword" component= {ChangePassword}/>
  </Switch>
  )
}
