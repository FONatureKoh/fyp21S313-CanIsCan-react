import React, {useState} from 'react'
import { InputAdornment, Grid, Button, Typography, TextField, Switch, Card, CardContent, CardHeader, Box, Input} from '@mui/material'
import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles';

export default function AddItem() {

  //form retrieval
  const [itemName, setItemName] = useState();
  const [itemPrice, setItemPrice] = useState();
  const [itemDesc, setItemDesc] = useState();
  const [itemAllergy, setItemAllergy] = useState();

  //function to get state
  function addItem()
  {
    console.log(itemName);
    console.log(itemPrice);
    console.log(itemDesc);
    console.log(itemAllergy);
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
        <label htmlFor="contained-button-file">
          <Input accept="image/*" id="contained-button-file" multiple type="file" />
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
            onChange={(e)=> setItemName(e.target.value)}/>

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
