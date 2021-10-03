import React from 'react'
import TopNav from '../../components/top-nav/topnav'
import './AddItem.css'
import { Grid, Typography, Switch, TextField, Box} from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';

export default function AddItem() {
  return (
    <div className="main">
      <TopNav />

      <Grid container sx={{margin:'auto', textAlign:'left', width: '70%', marginTop: 10}} >
        <Grid item xs={6}>
          <img src={'asd'} height="200px" width="100%"/>
          <Typography sx={{textAlign:'center', fontSize:'10px', textDecoration:'underline', cursor:'pointer'}}>Upload Photo</Typography>
        </Grid>
        
        <Grid item xs={1}>
        </Grid>

        <Grid item xs={5}>
          <Typography textAlign="center" paddingTop="20%">Availability <Switch defaultChecked size="large" /></Typography>  
        </Grid>

        <Grid item xs={3}>
        </Grid>

        <Grid item xs={6} sx={{textAlign:'center'}}>
            <TextField sx={{width:'100%', margin:'15px'}} id="filled-basic" label="Item Name (Required*):" variant="filled" size="small"/>

            <TextField
            label="Price (Required*)"
            id="filled-start-adornment"
            sx={{width:'100%', margin:'15px'}}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            variant="filled"
            />

          <TextField
          id="filled-multiline-static"
          label="Item Description (Required*): "
          multiline
          rows={4}
          variant="filled"
          sx={{width:'100%', margin:'15px'}}
          />

          <TextField sx={{width:'100%', margin:'15px'}} id="filled-basic" label="Allergies Warning:" variant="filled" size="small"/>

          
          <Button variant="contained" color="inherit" sx={{width:'45%', bgcolor:"#969696", textAlign:'flex-start'}}>Add Item</Button>
          
          <Button variant="contained" color="inherit" sx={{width:'45%', float:'right'}}>Cancel</Button>
        </Grid>

        <Grid item xs={3}>
        </Grid>
      </Grid>

    </div>
  )
}
