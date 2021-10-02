import React from 'react'
import './RestViewMenu.css'
import Typography from '@mui/material/Typography';
import icon from '../../assets/icon-profile.png';
import Grid from '@mui/material/Grid';

export default function MenuItem({name, price, desc, allergies}) {
  return (
    <div className="mi_container">
      <Grid container spacing={2} padding={5}>
        <Grid item xs={6} alignContent="center=">
          <div className="mi_left"><img src={icon}/></div>
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
      <div>
              <button className="vml_mini1">EDIT</button>
              <button className="vml_mini2">DELETE</button>
            </div>
    </div>
  )
}
