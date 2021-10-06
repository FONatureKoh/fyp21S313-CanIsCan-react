import React from 'react'
import { Grid, Button, Typography, Switch, Divider } from '@mui/material'
import bannerpic from '../../../assets/temp/eg-biz1.png'

export default function AddItem() {

    const boldtitle = {
       fontSize:'1 0px', 
       fontWeight:'bold', 
       marginTop:'20px',
       marginBottom:'5px'
    };

    const restaurantinfo = { 
        name: "Lucifer's Kitchen", 
        phone: '+65 6666 9999',
        address: 'Blk666, Ang Mo Kio Avenue 6 #06-666 S(666666)'
    };

  return (
    <div className="main3">
    <Grid container sx={{margin:'auto', textAlign:'left', width: '70%', marginTop: 10}} >
      <Grid item xs={12} sx={{textAlign:'center'}}>
        <img src={bannerpic} width="60%"/>
        <Typography sx={{textAlign:'center', fontSize:'1 0px', textDecoration:'underline', cursor:'pointer'}}>Upload Photo</Typography>
      </Grid>

      <Grid item xs={5} sx={{marginTop:'2%', marginBottom:'2%'}}>
        <Divider />
        <Typography sx={{marginTop:'20px', marginBottom:'20px'}}>Open For Business <Switch defaultChecked size="large" /></Typography>
        <Divider />
      </Grid>

      
      <Grid item xs={12} sx={{textAlign:'left'}}>
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
        <Button variant="contained" color="inherit" sx={{width:'45%', bgcolor:"#969696", textAlign:'flex-start'}}>Edit Information</Button>
        
        <Button variant="contained" color="inherit" sx={{width:'45%', float:'right'}}>Change Password</Button>
      </Grid>

      <Grid item xs={3}>
      </Grid>
    </Grid>

  </div>
  )
}
