import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardContent, Box, Typography, Button } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { existingRestaurants, disableRestaurantAcc } from '../admin_controller';

export default function ExistingRest() {
  const themes = {
    textHeader: {
      fontWeight:'bold', 
      mt: '5px'
    }
  };

  // LOAD EXISTING RESTAURANTS AND THEIR DATA
  // async function to load in data 
  async function getRestDetails() {
    const retrievePendingDetails = await existingRestaurants();
    return retrievePendingDetails;
  }

  // State for the restaurant details
  const [restDetails, setRestDetails] = useState([]);

  // Deploying useEffect 
  useEffect(() => {
    getRestDetails().then((response) => {
      console.log(response);
      setRestDetails(response);
    });
  },[])
  
  // HANDLING DISABLING OF USER
  // Dialog useStates
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");

  const handleOpenDialog = () => {   
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDisable = () => {
    disableRestaurantAcc(selectedUser)
      .then((response) => {
        if(response.api_msg === "success") {
          handleCloseDialog();
          alert("Account disabled!");

          // Reload Restaurant data
          getRestDetails().then((response) => {
            console.log(response);
            setRestDetails(response);
          });
        }
        else {
          handleCloseDialog();
          alert("Something went wrong!");
        }
      })
  }

  return <>
    <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px'}}>
      <CardHeader title="Existing Restaurants" />
      <CardContent >
        <Box sx={{width:'90%', margin: '0px auto'}}> 

          {/* EXISTING RESTAURANTS */}
          {
            restDetails.map(item =>{
              return(
                <Accordion sx={{margin:0.5, borderRadius:1}}>
                <AccordionSummary sx={{textAlign: 'center', bgcolor: '#bdbdbd', borderRadius: 1, minWidth: 300}}>
                  <Typography sx={{textAlign: 'center'}}>
                    {item.restaurant_name}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ bgcolor: '#eeeeee'}}>
                  <Box sx={{ width:'100%', textAlign:'center', p:'10px auto'}}>
                  <Typography sx={themes.textHeader}>
                    Restaurant Name:
                  </Typography>

                  <Typography>
                    {item.restaurant_name}
                  </Typography>

                  <Typography sx={themes.textHeader}>
                    Restaurant General Manager:
                  </Typography>

                  <Typography>
                    {item.rest_rgm_username}
                  </Typography>

                  {/* PUT PHONE NUMBER FOR EMPLOYEES TO CONTACT */}
                  <Typography sx={themes.textHeader}>
                    Phone Number:
                  </Typography>

                  <Typography>
                    {item.rest_phone_no}
                  </Typography>

                  <Typography sx={themes.textHeader}>
                    Email Address:
                  </Typography>

                  <Typography>
                    {item.rest_email}
                  </Typography>
                  </Box>
                  <Box sx={{width:'100%', textAlign:'center', mt:'20px'}}>
                    {/* <Button variant='outlined' color='inherit'  sx={{mr:'10px', width:'100px'}}>APPROVE</Button> */}
                    <Button onClick={() => {
                      setSelectedUser(item.rest_rgm_username);
                      handleOpenDialog();
                    }} variant='outlined' color='error' sx={{ml:'10px', width:'100px'}}>DISABLE</Button>
                  </Box>
                </AccordionDetails>
              </Accordion>
              )
            })
          }
        </Box>
      </CardContent>
  </Card>
  <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
    <DialogTitle id="alert-dialog-title">
      {"Confirm disable user?"}
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        Confirm disable '{selectedUser}'? This action cannot be undone!
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleConfirmDisable} variant="outlined" color="inherit">Confirm</Button>
      <Button onClick={handleCloseDialog} variant="outlined" color="error">
        Cancel
      </Button>
    </DialogActions>
  </Dialog>
  </>
}
