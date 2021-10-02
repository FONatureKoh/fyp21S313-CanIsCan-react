import React from 'react'
import './RestViewMenu.css'
import Typography from '@mui/material/Typography';
import icon from '../../assets/icon-profile.png'
import Grid from '@mui/material/Grid';

export default function MenuItem({name, price, desc, allergies}) {
  return (
    <div>
        <img src={icon}/>
        <Typography>
          Item Name: {name}
        </Typography>
        <Typography>
          Price: {price}
        </Typography>
        <Typography>
          Description: {desc}
        </Typography>
        <Typography>
          Allergies Warning: {allergies}
        </Typography>
          <div>
            <button className="vml_mini1">EDIT</button>
            <button className="vml_mini2">DELETE</button>
          </div>
    </div>
  )
}
