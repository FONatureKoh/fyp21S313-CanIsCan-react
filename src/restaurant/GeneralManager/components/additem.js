import React, { useState, useEffect } from 'react'
import { InputAdornment, Grid, Button, Typography, TextField, Switch, Card, CardContent, CardHeader, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles';

// Controller import
import { addRestaurantItem, retrieveCats } from '../../restaurant_controller';

export default function AddItem() {
  // Pre drawn values from Database
  const [itemCategoriesList, setItemCategoriesList] = useState([]);

  // Form data settings and their setStates
  const [imageFile, setImageFile] = useState();
  const [itemAvailability, setItemAvailability] = useState(1);
  const [itemName, setItemName] = useState();
  const [itemPrice, setItemPrice] = useState();
  const [itemDesc, setItemDesc] = useState();
  const [itemAllergy, setItemAllergy] = useState();
  const [itemCategory, setItemCategory] = useState('');

  // Function to generate a form to send to the backend server
  async function addItem() {
    var addItemController = await addRestaurantItem(
      imageFile, itemAvailability, itemName, itemPrice, itemDesc, 
      itemAllergy, itemCategory
    );
    console.log (addItemController);
  }
  
  // Deploying useEffect to get the category list -- Thomas
  useEffect(() => {
    // Function to get all restaurant item category / categories
    async function retrieveCategories() {
      var catData = await retrieveCats();

      // Setting the Category List
      setItemCategoriesList(catData);
      console.log (catData);
    }
    retrieveCategories()
  },[])

  const Input = styled('input')({
    display: 'none',
  });

  //TESTING PREVIEW
  
  const [preview, setPreview] = useState();

  useEffect(() => {
    if(imageFile){
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
        console.log("1" +preview)
      }
      reader.readAsDataURL(imageFile);
    }
    else
    {
      setPreview(null);
    }
  }, [imageFile])

  return (
    <div>
    <Card>
    <CardHeader title="Add Item" />
    <CardContent >
    <Grid container sx={{margin:'auto', textAlign:'left', width: '70%'}} >
      <Grid item xs={6}>
        <Box width="100%"
        height="80%">
          <img src={preview} height="200px" width="100%" alt="additem"/>
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
        <Typography textAlign="center" paddingTop="20%">
          Availability 
          <Switch defaultChecked onChange={event => {
              setItemAvailability(event.target.checked);
              console.log(itemAvailability);
            }
          } size="large" />  
        </Typography>  
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

        {/* Added Item Category Selection -- Thomas*/}
        <FormControl variant="filled" sx={{width:'100%', margin:'15px' ,textAlign:'left'}}>
          <InputLabel id="cat-dropdown-menu-label">Item Category (Required)</InputLabel>
          <Select
            labelId="cat-dropdown-menu-label"
            id="demo-simple-select-filled"
            value={itemCategory}
            onChange={(e) => setItemCategory(e.target.value)}
          >
            {
              itemCategoriesList.map(cat => {
                return <MenuItem value={cat.ric_ID}>{cat.ric_name}</MenuItem>
              })
            }
          </Select>
        </FormControl>

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
