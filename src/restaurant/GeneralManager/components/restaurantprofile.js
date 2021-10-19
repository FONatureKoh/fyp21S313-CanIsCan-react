import React, { useEffect, useState } from 'react'
import { Grid, Button, Typography, Switch, Divider, CardContent, CardHeader, Card, Chip } from '@mui/material'
import bannerpic from '../../../assets/temp/eg-biz1.png'
import { Route, Link, Switch as Switch2 } from 'react-router-dom'
import EditInformation from './editinformation'
import { restaurantProfile } from '../../restaurant_controller'

export default function ViewInfo({isChecked, toggleChecked}) {
  // Declaring use State for Restaurant Profile
  const [restaurantInfo, setRestaurantInfo] = useState([]);
  const [restaurantTags, setRestaurantTags] = useState([]); // Lol. This solved it

  //Retrieval of Restaurant Information based on Token's username
  useEffect(() => {
    async function getInfo() {
      const restProfile = await restaurantProfile();
      setRestaurantInfo(restProfile);
      setRestaurantTags(restProfile.rest_tags);
      
      console.log(restProfile);
    }
    getInfo();
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
                  S({restaurantInfo.rest_postal_code})
                </Typography>

                <Typography sx={boldtitle}>Tags</Typography>
                <Typography>
                  {restaurantTags.map((tag) => (  // Creating a restaurantTags seem to work!
                    <Chip label= {tag} /> 
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
