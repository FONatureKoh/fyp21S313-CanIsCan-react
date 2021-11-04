import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardContent, Box, Typography, Button } from '@mui/material'
import { TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { activeCustomers } from '../admin_controller';

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

  return (
    <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px'}}>
      <CardHeader title="Existing Restaurants" />
      <CardContent >
        <Box sx={{width:'90%', margin: '0px auto'}} > 
          {/* SEARCH BAR */}
          {/* <TextField sx={{width:'100%', margin:'10px auto 30px'}} 
            id="filled-basic" 
            label="Search Restaurant.." 
            variant="outlined" 
            InputProps={{
              endAdornment: <InputAdornment position="end"><SearchIcon/></InputAdornment>,
            }}
          /> */}

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
                      {/* <Button variant='outlined' color='inherit'  sx={{mr:'10px', width:'100px'}}>APPROVE</Button> */}
                      <Button variant='outlined' color='error' sx={{ml:'10px', width:'100px'}}>DISABLE</Button>
                    </Box>
                  </AccordionDetails>
                </Accordion>
                )
              })
            }
        </Box>
      </CardContent>
  </Card>
  )
}
