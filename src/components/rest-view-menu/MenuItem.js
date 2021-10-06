import React from 'react'
import Typography from '@mui/material/Typography';
import icon from '../../assets/icon-profile.png';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
import { Button } from '@mui/material';

export default function MenuItem({name, price, desc, allergies}) {
  return (
    <div className="mi_container">
      <Grid container spacing={2} padding={5}>
        <Grid item xs={6}>
          <Box height="100%" sx={{textAlign:'center', alignContent: "center" }}><img src={icon}/></Box>
        </Grid>
        <Grid item xs={6}>
        <div className="mi_right">
          <Typography className="mi_title">
            Item Name:
          </Typography>

          <Typography>
            {name}
          </Typography>

          <Typography className="mi_title">
            Price:
          </Typography>

          <Typography>
            ${price}
          </Typography>

          <Typography className="mi_title">
            Description: 
          </Typography>

          <Typography>
            {desc}
          </Typography>

          <Typography className="mi_title">
            Allergies Warning: 
          </Typography>
          
          <Typography>
            {allergies}
          </Typography>
          </div>
          </Grid>
      </Grid>
      <Box sx={{width:'100%', textAlign:'center'}}>
        <Button variant='outlined' color='inherit' sx={{mr:'10px', width:'100px'}}>EDIT</Button>
        <Button variant='outlined' color='error' sx={{ml:'10px', width:'100px'}}>DELETE</Button>
      </Box>
    </div>
  )
}
