import React, { useState, useEffect } from 'react'
import { Button, Typography, Box, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
import { getImage } from './items_controller';
import { deleteRestaurantItem } from '../../restaurant/restaurant_controller';

const themes = {
  textHeader: {
    fontSize:'1 0px', 
    fontWeight:'bold', 
    mt: '5px'
  }
};

export default function MenuItem({item, menuData}) {
  // Other stuff
  const history = useHistory();

  // Some useStates
  const [openDialog, setOpenDialog] = useState(false);
  const [itemImage, setItemImage] = useState('');

  // Async Functions so that we can use await
  async function deleteItem() {
    try {
      const response = await deleteRestaurantItem(item.ri_item_ID);
      return response;
    }
    catch (error) {
      return error;
    }
  }

  // NOTE: I used a useEffect here, as I'm not sure how else to set the item path
  // as the item opens up. The idea here is that it will take in the item's png id
  // and generate the image to fetch through the controller and then after that generates
  // a local image link to put into img src
  useEffect(() => {
    async function getItemImage() {
      const imageData = await getImage(item.item_png_ID);
      setItemImage(imageData);
      console.log(itemImage);
    }
    getItemImage();
  },[])

  // Thomas: I changed this up a bit to handle the delete. Let me know if 
  // its the right style! And also if I intepret it correctly
  
  // handleOpenDialog for opening the dialog
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // handleConfirmDialog for when user confirms the delete
  const handleConfirmDialog = () => {
    deleteItem()
      .then((response) => {
        setOpenDialog(false);
        history.push(`/generalmanager/`);
      })
      .catch(error => console.log(error));
  };

  // handleCloseDialog for when user cancels
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Grid container spacing={2} padding={5}>
        <Grid item xs={6}>
          <Box height="100%" sx={{textAlign:'center', alignContent: "center" }}>
            <img width="80%" src={itemImage} alt='Error'/>
          </Box>
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
        <Button variant='outlined' color='inherit' component={Link} to={`/generalmanager/editmenu/edititem/${item.ri_item_ID}`} sx={{mr:'10px', width:'100px'}}>EDIT</Button>
        <Button variant='outlined' color='error' sx={{ml:'10px', width:'100px'}} onClick={handleOpenDialog} >DELETE</Button>
      </Box>

      <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
          {"Confirm item deletion?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm delete '{item.item_name}'?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDialog} variant="outlined" color="inherit">Confirm</Button>
          <Button onClick={handleCloseDialog} variant="outlined" color="error">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
