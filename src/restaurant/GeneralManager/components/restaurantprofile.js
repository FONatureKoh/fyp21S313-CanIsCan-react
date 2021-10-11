import React from 'react'
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
        name: "Default co", 
        phone: '+65 8765 4321',
        address: 'Blk222, Ang Mo Kio Avenue 2 #02-222 S(222222)'
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
                          {restaurantinfo.name}
                      </Typography>

                      <Typography sx={boldtitle}>Restaurant Contact Number</Typography>
                      <Typography>
                          {restaurantinfo.phone}
                      </Typography>

                      <Typography sx={boldtitle}>Restaurant Address</Typography>
                      <Typography>
                          {restaurantinfo.address}
                      </Typography>
                  </Grid>
      
                  <Grid item xs={12} sx={{textAlign:'center', marginTop:'5%'}}>
                      <Button variant="contained" color="inherit"  component={Link} to="/generalmanager/restaurantinformation/edit" sx={{width:'45%', bgcolor:"#969696", textAlign:'flex-start'}}>Edit Information</Button>
                  </Grid>
                  </Grid>
              </CardContent>
            </Card>
        </Route>
        <Route path="/generalmanager/restaurantinformation/edit" component= {EditInformation}/>
      </Switch2>
    </div>
  )
}
