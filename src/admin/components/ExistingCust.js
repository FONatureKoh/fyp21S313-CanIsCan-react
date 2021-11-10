import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardContent, Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { activeCustomers, disableAcc } from '../admin_controller';

export default function ExistingCustomer() {
  const themes = {
    textHeader: {
      fontSize:'1 0px', 
      fontWeight:'bold', 
      mt: '5px'
    }
  };

  // LOAD EXISTING Customers AND THEIR DATA
  // async function to load in data 
  async function getCustDetails() {
    const response = await activeCustomers();
    return response;
  }

  // State for the Customer details
  const [custList, setCustList] = useState([]);

  // Deploying useEffect 
  useEffect(() => {
    getCustDetails()
      .then((response) => {
        // console.log(response);
        setCustList(response);
      });
  },[])

  // HANDLING DISABLING OF USER
  // Dialog useStates
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");

  const handleOpenDialog= () => {   
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDisable = () => {
    disableAcc(selectedUser)
      .then((response) => {
        if(response.api_msg === "success") {
          handleCloseDialog();
          alert("Account disabled!");

          // Reload customer data
          getCustDetails()
            .then((response) => {
              // console.log(response);
              setCustList(response);
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
      <CardHeader title="Existing Customers" />
      <CardContent >
        <Box sx={{width:'90%', margin: '0px auto'}} > 
          {/* EXISTING RESTAURANTS */}
          {
              custList.map(item =>{
                return(
                  <Accordion sx={{margin:0.5, borderRadius:1}}>
                  <AccordionSummary sx={{textAlign: 'center', bgcolor: '#bdbdbd', borderRadius: 1, minWidth: 300}}>
                    <Typography sx={{textAlign: 'center'}}>
                      Customer Username: {item.cust_username}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ bgcolor: '#eeeeee'}}>
                    <Box sx={{ width:'100%', textAlign:'center', p:'10px auto'}}>
                    <Typography sx={themes.textHeader}>
                      Customer's Full Name:
                    </Typography>

                    <Typography>
                      {item.first_name} {item.last_name}
                    </Typography>

                    <Typography sx={themes.textHeader}>
                      Phone Number:
                    </Typography>

                    <Typography>
                      {item.phone_no}
                    </Typography>

                    <Typography sx={themes.textHeader}>
                      Email Address:
                    </Typography>

                    <Typography>
                      {item.email}
                    </Typography>
                    </Box>
                    <Box sx={{width:'100%', textAlign:'center', mt:'20px'}}>
                      <Button onClick={() => {
                        setSelectedUser(item.cust_username);
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
