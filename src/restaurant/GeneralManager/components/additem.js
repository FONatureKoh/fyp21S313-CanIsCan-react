import React, { useState } from 'react'
import { InputAdornment, Grid, Button, Typography, TextField, Switch, Card, CardContent, CardHeader, Box, Input} from '@mui/material'
import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import axios from 'axios';

export default function AddItem() {

  // Form data settings and their setStates
  const [imageFile, setImageFile] = useState();
  const [itemName, setItemName] = useState();
  const [itemPrice, setItemPrice] = useState();
  const [itemDesc, setItemDesc] = useState();
  const [itemAllergy, setItemAllergy] = useState();

  // Function to generate a form to send to the backend server
  const addItem = event => {
    const addItemForm = new FormData();
    addItemForm.append("imageFile", imageFile);
    addItemForm.append("itemName", itemName);
    addItemForm.append("itemPrice", itemPrice);
    addItemForm.append("itemDesc", itemDesc);
    addItemForm.append("itemAllergy", itemAllergy);

    axios.post("http://localhost:5000/restaurant/addmenuitem", addItemForm)
      .then(res => {
        // In here we can choose what we want to do with the response of the request
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      });
  }

  const Input = styled('input')({
    display: 'none',
  });

  return (
    <div>
    <Card>
    <CardHeader title="Add Item" />
    <CardContent >
    <Grid container sx={{margin:'auto', textAlign:'left', width: '70%'}} >
      <Grid item xs={6}>
        <Box width="100%"
        height="80%">
          <img src={'asd'} height="200px" width="100%" alt="additem"/>
        </Box>
        <Box>
        <label htmlFor="imageFile">
          <Input 
            type="file"
            id="imageFile"
            accept=".png"
            onChange={event => {
              const imageFile = event.target.files[0];
              setImageFile(imageFile);
            }} />
          <Typography sx={{textAlign:'center', fontSize:'10px', textDecoration:'underline', cursor:'pointer'}}>Upload Photo</Typography>
        </label>
        </Box>
      </Grid>
      
      <Grid item xs={1}>
      </Grid>

      <Grid item xs={5}>
        <Typography textAlign="center" paddingTop="20%">Availability <Switch defaultChecked size="large" /></Typography>  
      </Grid>

      <Grid item xs={3}>
      </Grid>
      
      <Grid item xs={6} sx={{textAlign:'center'}}>
        <TextField 
          sx={{width:'100%', margin:'15px'}} 
          id="filled-basic" 
          label="Item Name (Required*):" 
          variant="filled" 
          size="small"
          onChange={(e)=> setItemName(e.target.value)}
        />

        <TextField
          label="Price (Required*)"
          type="number"
          id="filled-start-adornment"
          sx={{width:'100%', margin:'15px'}}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          variant="filled"
          onChange={(e)=> setItemPrice(e.target.value)}
        />

        <TextField
          id="filled-multiline-static"
          label="Item Description (Required*): "
          multiline
          rows={4}
          variant="filled"
          sx={{width:'100%', margin:'15px'}}
          onChange={(e)=> setItemDesc(e.target.value)}
        />

        <TextField sx={{width:'100%', margin:'15px'}} 
          id="filled-basic" 
          label="Allergies Warning:" 
          variant="filled" 
          size="small"
          onChange={(e)=> setItemAllergy(e.target.value)}
        />

        <Button variant="contained" color="inherit" sx={{width:'45%', bgcolor:"#969696", textAlign:'flex-start'}} onClick={addItem}>Add Item</Button>
        
        <Button variant="contained" color="inherit" sx={{width:'45%', float:'right'}} component={Link} to="/generalmanager">Cancel</Button>
      </Grid>

      <Grid item xs={3}>
      </Grid>
    </Grid>
    </CardContent>
    </Card>
  </div>
  )
}
