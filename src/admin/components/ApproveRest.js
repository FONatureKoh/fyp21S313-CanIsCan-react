import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardContent, Box, Typography, Button, Accordion, AccordionSummary, AccordionDetails, Backdrop, CircularProgress } from '@mui/material'
import { approveRestaurant, retrievePending } from '../admin_controller';

export default function ApproveRest() {
  // async function to load in data 
  async function getRestDetails() {
    const retrievePendingDetails = await retrievePending();
    return retrievePendingDetails;
  }

  // async function to send the update
  // NOTE: returns api_msg Successful!
  async function approveFunction(restID) {
    const approveStatus = await approveRestaurant(restID);
    return approveStatus.api_msg;
  }
  
  //State for handling accordion open close
  const [expanded, setExpanded] = React.useState(false);

  // State for the restaurant details
  const [restDetails, setRestDetails] = useState([]);

  // Deploying useEffect 
  useEffect(() => {
    getRestDetails().then((response) => {
      console.log(response);
      setRestDetails(response);
    });
  },[])

  /***********************************************************************************************
   * Settings for Backdrop
   * *********************************************************************************************
   */
  // Backdrop useStates 
  const [backdropState, setBackDropState] = useState(false);

  // Backdrop functions
  const handleBackdropClose = () => {
    setBackDropState(false);
  };

  const handleBackdropOpen = () => {
    setBackDropState(true);
  };

  // Approve button
  function approveAccount(restaurant_ID) {
    handleBackdropOpen();

    approveFunction(restaurant_ID).then((response) => {
      if (response === "Successful!") {
        console.log("Approve function triggered");

        // Refresh the restaurant details state
        getRestDetails().then((response) => {
          console.log(response);
          setRestDetails(response);
        });
        
        // Close the Accordion
        setExpanded(false);
        handleBackdropClose();
      }
    })
  };

  const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

  const themes = {
    textHeader: {
      fontSize:'1 0px', 
      fontWeight:'bold', 
      mt: '5px'
    }
  };

  // NOTE: At the Accordion open bracket, I thought to set the panel name dynamically through
  // using panel and the ID. Since ID is unique, it seem to have worked.
  return <>
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={backdropState}>
      <CircularProgress color="inherit" />
    </Backdrop>
    <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px'}}>
        <CardHeader title="Pending Restaurant Registration" />
        <CardContent >
          <Box sx={{width:'90%', margin: '0px auto'}}> 
          {/* CHECK FOR NO RESTAURANT */}
          {restDetails.length === 0 ? (<>
            <Box width="80%" sx={{margin:'20px auto', textAlign:'center'}}>
              <Typography variant="h6">No pending restaurants registration</Typography>
            </Box>
            </>) : (<>
              {
              restDetails.map(item =>{
                return(
                  <Accordion 
                    expanded={expanded === 'panel' + item.restaurant_ID} 
                    onChange={handleChange('panel' + item.restaurant_ID)} 
                    sx={{margin:0.5, borderRadius:1}}>

                  <AccordionSummary sx={{textAlign: 'center', bgcolor: '#bdbdbd', borderRadius: 1, minWidth: 300}}>
                    <Typography sx={{textAlign: 'center'}}>
                      {item.restaurant_name}
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails sx={{ bgcolor: '#eeeeee'}}>
                    <Box sx={{ width:'100%', textAlign:'center', p:'20px auto'}}>
                    <Typography sx={themes.textHeader}>
                      Restaurant Name:
                    </Typography>

                    <Typography>
                      {item.restaurant_name}
                    </Typography>

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
                      <Button variant='outlined' color='inherit' onClick={() => {approveAccount(item.restaurant_ID)}} sx={{mr:'10px', width:'100px'}}>APPROVE</Button>
                      <Button variant='outlined' color='error' sx={{ml:'10px', width:'100px'}}>REJECT</Button>
                    </Box>
                  </AccordionDetails>
                  </Accordion>
                )
              })
            }
            </>)}
          </Box>
        </CardContent>
      </Card>
  </>
}
