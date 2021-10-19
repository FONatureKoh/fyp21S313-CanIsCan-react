import React, { useEffect, useState } from 'react'
import { Grid, Button, Typography, Switch, Divider, CardContent, CardHeader, Card, Chip } from '@mui/material'
import bannerpic from '../../../assets/temp/eg-biz1.png'
import { Route, Link, Switch as Switch2 } from 'react-router-dom'
import EditInformation from './editinformation'
import { restaurantProfile } from '../../restaurant_controller'

export default function ViewInfo({isChecked, toggleChecked}) {
  // Declaring use State for Restaurant Profile
  const [restaurantInfo, setRestaurantInfo] = useState([]);

  //Retrieval of Restaurant Information based on Token's username
  useEffect(() => {
    async function getInfo() {
      const testRestaurantProfile = await restaurantProfile();
      setRestaurantInfo(testRestaurantProfile);
      
      console.log(testRestaurantProfile)
    }
    getInfo();
  },[])
    
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
  else if (openTimeA[0] === 12)
  {
    openTime = restaurantinfo.openTime + ' PM';
  }
  else if (openTimeA[0] === 0)
  {
    var hr = 12;
    openTime = hr + ':' + openTimeA[1] + ' AM';
  }
  else
  {
    hr = openTimeA[0] - 12;
    openTime = hr + ':' + openTimeA[1] + ' PM';
  }

  const closeTimeA = restaurantinfo.closeTime.split(':');

  if (closeTimeA[0] < 12 && closeTimeA[0] > 0){
    var closeTime = restaurantinfo.closeTime + ' AM';
  }
  else if (closeTimeA[0] === 12)
  {
    closeTime = restaurantinfo.closeTime + ' PM';
  }
    else if (closeTimeA[0] === 0)
  {
    hr = 12;
    closeTime = hr + ':' + closeTimeA[1] + ' AM';
  }
  else
  {
    hr = closeTimeA[0] - 12;
    closeTime = hr + ':' + closeTimeA[1] + ' PM';
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
                </Grid>

              <Grid item xs={12} sx={{textAlign:'center', marginTop:'2%', marginBottom:'2%'}}>
                  <Divider />
                  <Typography sx={{marginTop:'20px', marginBottom:'20px'}}>Open For Business <Switch checked={isChecked} size="large" onClick={()=>toggleChecked()}/></Typography>
                  <Divider />
              </Grid>
              
              <Grid item xs={12} sx={{textAlign:'center'}}>
                <Typography sx={boldtitle}>Restaurant Name</Typography>
                <Typography>
                  {restaurantInfo.restaurant_name}
                </Typography>

                <Typography sx={boldtitle}>Operating Hours</Typography>
                <Typography>
                  {restaurantInfo.rest_op_hours}
                  {/* {openTime} - {closeTime} */}
                </Typography>

                <Typography sx={boldtitle}>Restaurant Contact Number</Typography>
                <Typography>
                  {restaurantInfo.rest_phone_no}
                </Typography>

                <Typography sx={boldtitle}>Restaurant Address</Typography>
                <Typography>
                  {restaurantInfo.rest_address_info}
                </Typography>
                <Typography>
                  S({restaurantInfo.postal_code})
                </Typography>

                <Typography sx={boldtitle}>Tags</Typography>
                <Typography>
                <Chip label= {restaurantInfo.rest_tag_1} /> 
                </Typography>
              </Grid>
  
              <Grid item xs={12} sx={{textAlign:'center', marginTop:'5%'}}>
                <Button variant="contained" color="inherit"  component={Link} to="/generalmanager/restaurantinformation/edit" sx={{width:'45%', bgcolor:"#969696", textAlign:'flex-start'}}>Edit Information</Button>
              </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Route>
        <Route path="/generalmanager/restaurantinformation/edit"><EditInformation restaurantInfo={restaurantInfo}/></Route>
      </Switch2>
    </div>
  )
}
