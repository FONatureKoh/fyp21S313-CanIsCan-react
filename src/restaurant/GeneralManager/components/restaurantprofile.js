import React, { useEffect, useState } from 'react'
import { Grid, Button, Typography, Switch, Divider, CardContent, CardHeader, Card, Chip } from '@mui/material'
import bannerpic from '../../../assets/temp/eg-biz1.png'
import { Route, Link, Switch as Switch2 } from 'react-router-dom'
import EditInformation from './editinformation'
import { restaurantProfile, retrieveBannerImage } from '../../restaurant_controller'

export default function ViewInfo({isChecked, toggleChecked}) {
  // Declaring use State for Restaurant Profile
  const [restaurantInfo, setRestaurantInfo] = useState([]);
  const [restaurantTags, setRestaurantTags] = useState([]); // Lol. This solved it
  const [restBannerImage, setRestBannerImage] = useState('');

  // Async functions
  async function getInfo() {
    try {
      const restProfile = await restaurantProfile();
      return restProfile;
    }
    catch (error) {
      return error;
    }
  }

  // Async function to get image
  async function getImage(imageID) {
    try {
      const image = await retrieveBannerImage(imageID);
      return image;
    }
    catch (error) {
      return error;
    }
  }

  //Retrieval of Restaurant Information based on Token's username
  useEffect(() => {
    getInfo()
      .then((response) => {
        setRestaurantInfo(response);
        setRestaurantTags(response.rest_tags);

        // Gets the banner image
        getImage(response.rest_banner_ID)
          .then(response => {setRestBannerImage(response)})
          .catch(error => console.log(error));
        
        // console.log(response);
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
    <div>
      <Switch2>
        <Route exact path="/generalmanager/restaurantinformation">
          <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px'}}>
            <CardHeader title="Restaurant Information" />
            <CardContent >
              <Grid container sx={{margin:'auto', textAlign:'left', width: '70%'}} >
                <Grid item xs={12} sx={{textAlign:'center'}}>
                  <img src={restBannerImage} width="60%" alt="banner"/>
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

                <Typography sx={boldtitle}>Restaurant Contact Number</Typography>
                <Typography>
                  {restaurantInfo.rest_email}
                </Typography>

                <Typography sx={boldtitle}>Restaurant Address</Typography>
                <Typography>
                  {restaurantInfo.rest_address_info}
                </Typography>
                <Typography>
                  S({restaurantInfo.rest_postal_code})
                </Typography>

                <Typography sx={boldtitle}>Tags</Typography>
                <Typography>
                  {restaurantTags.map((tag) => (  // Creating a restaurantTags seem to work!
                    <Chip label= {tag} sx={{margin:'3px'}}/> 
                  ))}
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
