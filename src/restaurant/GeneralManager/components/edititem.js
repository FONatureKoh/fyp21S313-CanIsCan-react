import React, {useEffect, useState} from 'react';
import { InputAdornment, Grid, Button, Typography, TextField, Switch, Card, 
CardContent, CardHeader, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

// Controller import
import { editRestaurantItem, retrieveCats } from '../../restaurant_controller';
import { styled } from '@mui/styles';
import { getImage } from '../../../components/rest-view-menu/items_controller';

export default function EditItem({menuData}) {
  // Pre drawn values from Database -- Thomas
  const [itemCategoriesList, setItemCategoriesList] = useState([]);

  // Deploying useEffect to get the category list -- Thomas
  useEffect(() => {
    // Function to get all restaurant item category / categories
    async function retrieveCategories() {
      var catData = await retrieveCats();

      // Setting the Category List
      setItemCategoriesList(catData);
      console.log (catData);
    }
    retrieveCategories();
  },[])

  useEffect(() => {
    async function getItemImage() {
      const imageData = await getImage(imageID);
      setPreview(imageData);
      console.log(imageData);
    }
    getItemImage();
  },[])


  const match = useRouteMatch('/generalmanager/editmenu/edititem/:id');
  
  let itemSelected;
    for(const item of menuData)
    {
      if(item.ri_item_ID === parseInt(match.params.id) )
      {
        itemSelected = item;
        console.log(itemSelected);
        break;
      }
    }

  //Setting field to retrieved values
  console.log(itemSelected);
  const [itemID, setItemID] = useState(itemSelected.ri_item_ID);
  const [imageFile, setImageFile] = useState();
  const [itemAvailability, setItemAvailability] = useState(itemSelected.item_availability);
  const [itemName, setItemName] = useState(itemSelected.item_name);
  const [itemPrice, setItemPrice] = useState(itemSelected.item_price);
  const [itemDesc, setItemDesc] = useState(itemSelected.item_desc);
  const [itemAllergy, setItemAllergy] = useState(itemSelected.item_allergen_warning);
  const [itemCategory, setItemCategory] = useState(itemSelected.ri_cat_ID);
  const [imageID, setImageID] = useState(itemSelected.item_png_ID);

  //PREVIEW IMAGE
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
  //END OF PREVIEW IMAGE

  // NOTE: Two hidden data need for updating, but not needed for this page
  const [itemPngID, setItemPngID] = useState(itemSelected.item_png_ID);
  const [itemRestID, setItemRestID] = useState(itemSelected.ri_rest_ID);

  async function submitChange() {
    var testController = await editRestaurantItem(itemID, imageFile, itemAvailability, itemRestID, 
    itemPngID, itemName, itemPrice, itemDesc, itemAllergy, itemCategory);
    
    console.log(testController);
  }
  
  // Input Box config
  const Input = styled('input')({
    display: 'none',
  });

  return (
    <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px'}}>
    <CardHeader title="Edit Item" />
    <CardContent >
    <Grid container sx={{margin:'auto', textAlign:'left', width: '70%'}} >
      <Grid item xs={6}>
        <Box 
        sx={{alignContent:'center'}}>
          <img src={preview} height="200px" width="300px" alt="additem"/>
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
        <TextField sx={{width:'100%', margin:'15px'}} 
          id="filled-basic" 
          label="Item Name (Required*):" 
          variant="filled" 
          size="small" 
          defaultValue={itemName} 
          onChange={(e)=>setItemName(e.target.value)}
        />

        <TextField
          label="Price (Required*)"
          id="filled-start-adornment"
          sx={{width:'100%', margin:'15px'}}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          type="number"
          variant="filled"
          defaultValue={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
        />

        <TextField
          id="filled-multiline-static"
          label="Item Description (Required*): "
          multiline
          rows={4}
          variant="filled"
          sx={{width:'100%', margin:'15px'}}
          defaultValue={itemDesc}
          onChange={(e) => setItemDesc(e.target.value)}
        />

        <TextField 
          sx={{width:'100%', margin:'15px'}} 
          id="filled-basic" 
          label="Allergies Warning:" 
          variant="filled" 
          size="small" 
          defaultValue={itemAllergy}
          onChange={(e) => setItemAllergy(e.target.value)}
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
                return <MenuItem  value={cat.ric_ID}>{cat.ric_name}</MenuItem>
              })
            }
          </Select>
        </FormControl>

        <Button variant="contained" color="inherit" sx={{width:'45%', bgcolor:"#969696", textAlign:'flex-start'}} onClick={submitChange} component={Link} to={"/generalmanager"}>Confirm Changes</Button>
        <Button variant="contained" color="inherit" sx={{width:'45%', float:'right' }} component={Link} to="/generalmanager">Cancel</Button>
      </Grid>

      <Grid item xs={3}>
      </Grid>
    </Grid>
    </CardContent>
    </Card>
  )
}
