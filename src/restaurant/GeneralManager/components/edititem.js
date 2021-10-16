import React, {useState} from 'react'
import { InputAdornment, Grid, Button, Typography, TextField, Switch, Card, CardContent, CardHeader } from '@mui/material'
import { useRouteMatch } from 'react-router'
import { Link } from 'react-router-dom';

// Controller import
import { editRestaurantItem } from '../../restaurant_controller';

export default function EditItem({menuData}) {
  const match = useRouteMatch('/generalmanager/editmenu/edititem/:id');
  
  let itemSelected;
    for(const item of menuData)
    {
      if(item.ri_item_ID === parseInt(match.params.id) )
      {
        itemSelected = item;
        break;
      }
    }

  //Setting field to retrieved values
  const [itemID, setItemID] = useState(itemSelected.ri_item_ID)
  const [itemName, setItemName] = useState(itemSelected.item_name);
  const [itemPrice, setItemPrice] = useState(itemSelected.item_price);
  const [itemDesc, setItemDesc] = useState(itemSelected.item_desc);
  const [itemAllergy, setItemAllergy] = useState(itemSelected.item_allergen_warning);

  async function submitChange() {
    var testController = await editRestaurantItem(itemID, itemName, itemPrice, itemDesc, itemAllergy);

    console.log(testController);
  }
  
  return (
    <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px'}}>
    <CardHeader title="Edit Item" />
    <CardContent >
    <Grid container sx={{margin:'auto', textAlign:'left', width: '70%'}} >
      <Grid item xs={6}>
        <img src={'asd'} height="200px" width="100%" alt="menu"/>
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

        <Button variant="contained" color="inherit" sx={{width:'45%', bgcolor:"#969696", textAlign:'flex-start'}} onClick={submitChange}>Confirm Changes</Button>
        
        <Button variant="contained" color="inherit" sx={{width:'45%', float:'right' }} component={Link} to="/generalmanager">Cancel</Button>
      </Grid>

      <Grid item xs={3}>
      </Grid>
    </Grid>
    </CardContent>
    </Card>
  )
}
