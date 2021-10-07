import React, { useContext } from 'react'
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

export default function MenuItem({item, setItemSelected}) {

  const getItem = () => {
    setItemSelected(item);
  }

  return (
    <div>
      <Grid container spacing={2} padding={5}>
        <Grid item xs={6}>
          <Box height="100%" sx={{textAlign:'center', alignContent: "center" }}><img src={icon}/></Box>
        </Grid>
        <Grid item xs={6}>
        <div className="mi_right">
          <Typography sx={themes.textHeader}>
            Item Name:
          </Typography>

          <Typography>
            {item.name}
          </Typography>

          <Typography sx={themes.textHeader}>
            Price:
          </Typography>

          <Typography>
            ${item.price}
          </Typography>

          <Typography sx={themes.textHeader}>
            Description: 
          </Typography>

          <Typography>
            {item.desc}
          </Typography>

          <Typography sx={themes.textHeader}>
            Allergies Warning: 
          </Typography>
          
          <Typography>
            {item.allergies}
          </Typography>
          </div>
          </Grid>
      </Grid>
      <Box sx={{width:'100%', textAlign:'center'}}>
        <Button variant='outlined' color='inherit' component={ Link } to="/generalmanager/edititem" sx={{mr:'10px', width:'100px'}} onClick={getItem}>EDIT</Button>
        <Button variant='outlined' color='error' sx={{ml:'10px', width:'100px'}}>DELETE</Button>
      </Box>
    </div>
  )
}
