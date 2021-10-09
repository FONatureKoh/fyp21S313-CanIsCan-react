import React from 'react'
import Typography from '@mui/material/Typography';
import icon from '../../assets/icon-profile.png';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const themes = {
  textHeader: {
    fontSize:'1 0px', 
    fontWeight:'bold', 
    mt: '5px'
  }
};

export default function MenuItem({item, menuData}) {
  return (
    <div>
      <Grid container spacing={2} padding={5}>
        <Grid item xs={6}>
          <Box height="100%" sx={{textAlign:'center', alignContent: "center" }}><img src={icon} alt="Profile picture"/></Box>
        </Grid>
        <Grid item xs={6}>
        <div className="mi_right">
          <Typography sx={themes.textHeader}>
            Item Name:
          </Typography>

          <Typography>
            {item.item_name}
          </Typography>

          <Typography sx={themes.textHeader}>
            Price:
          </Typography>

          <Typography>
            ${item.item_price}
          </Typography>

          <Typography sx={themes.textHeader}>
            Description: 
          </Typography>

          <Typography>
            {item.item_desc}
          </Typography>

          <Typography sx={themes.textHeader}>
            Allergies Warning: 
          </Typography>
          
          <Typography>
            {item.item_allergen_warning}
          </Typography>
          </div>
          </Grid>
      </Grid>
      <Box sx={{width:'100%', textAlign:'center'}}>
        <Button variant='outlined' color='inherit' component={ Link } to={`/generalmanager/editmenu/edititem/${item.menu_item_ID}`} sx={{mr:'10px', width:'100px'}}>EDIT</Button>
        <Button variant='outlined' color='error' sx={{ml:'10px', width:'100px'}}>DELETE</Button>
      </Box>
    </div>
  )
}
