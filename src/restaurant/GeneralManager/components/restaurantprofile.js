import React, {useState} from 'react'
import { Grid, Button, Typography, Switch, Divider, CardContent, CardHeader, Card } from '@mui/material'
import bannerpic from '../../../assets/temp/eg-biz1.png'
import { Route, Link, Switch as Switch2 } from 'react-router-dom'
import EditInformation from './editinformation'

export default function ViewInfo({isChecked, toggleChecked}) {
    
    const boldtitle = {
       fontSize:'1 0px', 
       fontWeight:'bold', 
       marginTop:'20px',
       marginBottom:'5px'
    };

    const restaurantinfo = { 
        rName: "Default co", 
        rPhone: '+65 8765 4321',
        rAddress: 'Blk222, Ang Mo Kio Avenue 2 #02-222 S(222222)',
        openTime: '10:00', 
        closeTime: '00:00'
    };

    const openTimeA = restaurantinfo.openTime.split(':');

    if (openTimeA[0] < 12 && openTimeA[0] > 0){
      var openTime = restaurantinfo.openTime + ' AM';
    }
    else if (openTimeA[0] == 12)
    {
      var openTime = restaurantinfo.openTime + ' PM';
    }
    else if (openTimeA[0] == 0)
    {
      var hr = 12;
      var minutes = openTimeA[1];
      var openTime = hr + ':' + minutes + ' AM';
    }
    else
    {
      var hr = openTimeA[0] - 12;
      var minutes = openTimeA[1];
      var openTime = hr + ':' + minutes + ' PM';
    }

    const closeTimeA = restaurantinfo.closeTime.split(':');

    if (closeTimeA[0] < 12 && closeTimeA[0] > 0){
      var closeTime = restaurantinfo.closeTime + ' AM';
    }
    else if (closeTimeA[0] == 12)
    {
      var closeTime = restaurantinfo.closeTime + ' PM';
    }
     else if (closeTimeA[0] == 0)
    {
      var hr = 12;
      var minutes = closeTimeA[1];
      var closeTime = hr + ':' + minutes + ' AM';
    }
    else
    {
      var hr = closeTimeA[0] - 12;
      var minutes = closeTimeA[1];
      var closeTime = hr + ':' + minutes + ' PM';
    }

  return (
    <div>
      <Switch2>
        <Route exact path="/generalmanager/restaurantinformation">
            <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px'}}>
              <CardHeader title="Restaurant Information" />
              <CardContent >
                  <Grid container sx={{margin:'auto', textAlign:'left', width: '70%'}} >
                      <Grid item xs={12} sx={{textAlign:'center'}}>
                          <img src={bannerpic} width="60%" alt="banner"/>
                          <Typography sx={{textAlign:'center', fontSize:'1 0px', textDecoration:'underline', cursor:'pointer'}}>Upload Photo</Typography>
                      </Grid>

                  <Grid item xs={12} sx={{textAlign:'center', marginTop:'2%', marginBottom:'2%'}}>
                      <Divider />
                      <Typography sx={{marginTop:'20px', marginBottom:'20px'}}>Open For Business <Switch checked={isChecked} size="large" onClick={()=>toggleChecked()}/></Typography>
                      <Divider />
                  </Grid>
                  
                  <Grid item xs={12} sx={{textAlign:'center'}}>
                      <Typography sx={boldtitle}>Restaurant Name</Typography>
                      <Typography>
                          {restaurantinfo.rName}
                      </Typography>

                      <Typography sx={boldtitle}>Operating Hours</Typography>
                      <Typography>
                          {openTime} - {closeTime}
                      </Typography>

                      <Typography sx={boldtitle}>Restaurant Contact Number</Typography>
                      <Typography>
                          {restaurantinfo.rPhone}
                      </Typography>

                      <Typography sx={boldtitle}>Restaurant Address</Typography>
                      <Typography>
                          {restaurantinfo.rAddress}
                      </Typography>
                  </Grid>
      
                  <Grid item xs={12} sx={{textAlign:'center', marginTop:'5%'}}>
                      <Button variant="contained" color="inherit"  component={Link} to="/generalmanager/restaurantinformation/edit" sx={{width:'45%', bgcolor:"#969696", textAlign:'flex-start'}}>Edit Information</Button>
                  </Grid>
                  </Grid>
              </CardContent>
            </Card>
        </Route>
        <Route path="/generalmanager/restaurantinformation/edit" component= {EditInformation}><EditInformation restaurantinfo={restaurantinfo}/></Route>
      </Switch2>
    </div>
  )
}
