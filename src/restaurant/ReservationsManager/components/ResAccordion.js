import React, { useState } from 'react'
import { Box, Typography, Divider, Accordion, AccordionSummary, AccordionDetails, Grid, ListItem, Button } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { updateDOStatus } from '../dm_controller';

export default function ResAccordion({reservation}) {
  
  // ACCORDION CONTROL
  const [accOpen, setAccOpen] = useState(false);
  const [innerAccOpen, setInnerAccOpen] = useState(false);

  // Button functions
  // const setCancelled = () => {
  //   updateDOStatus(reservation.orderID, "Cancelled")
  //     .then((response) => {
  //       alert(response.api_msg);
  //     })
  // }

  // const setPreparing = () => {
  //   updateDOStatus(reservation.orderID, "Preparing")
  //     .then((response) => {
  //       alert(response.api_msg);
  //     })
  // }

  // const setDelivering = () => {
  //   updateDOStatus(reservation.orderID, "Delivering")
  //     .then((response) => {
  //       alert(response.api_msg);
  //     })
  // }

  return (
    <Accordion sx={{border:'1px solid #eeeeee', mt:'20px'}} expanded={accOpen} >
      {/* HEADER OF ACCORDION */}
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="reservation-details"
        id="reservation-details"
        sx={{borderBottom:'0.5px solid #eeeeee'}}
        onClick={()=>{setAccOpen(!accOpen)}}
      >
        <Typography sx={{fontSize:'1 0px', fontWeight:'bold'}}>
          {reservation.cust_RID}
        </Typography>
      </AccordionSummary>
      {/* INNDER ACCORDION */}
      <AccordionDetails>
      <Box width="80%" sx={{margin:'5px auto', textAlign:"center"}}> 
        <Typography variant="subtitle1" sx={{fontSize:'1 0px', fontWeight:'bold', mb:'5px' }}>
          Reservation Details
        </Typography>
        <Divider variant="middle"/>
        <Grid container sx={{mt:'10px'}}>
          <Grid item xs={8} md={8} sm={8}>
            <Typography variant="subtitle1" textAlign="left" sx={{fontSize:'1 0px', fontWeight:'bold', }}>
              Reserved by
            </Typography>
            <Typography variant="subtitle1" textAlign="left">
              {reservation.cust_name}
            </Typography>
          </Grid>
          <Grid item xs={4} md={4} sm={4}>
            <Typography variant="subtitle1" textAlign="left" sx={{fontSize:'1 0px', fontWeight:'bold', }}>
              Status
            </Typography>
            <Typography variant="subtitle1" textAlign="left">
              {reservation.reservation_status}
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} sm={8}>
            <Typography variant="subtitle1" textAlign="left" sx={{fontSize:'1 0px', fontWeight:'bold', }}>
              Reservation Timeslot
            </Typography>
            <Typography variant="subtitle1" textAlign="left">
              {reservation.date}
            </Typography>
          </Grid>
          <Grid item xs={4} md={4} sm={4}>
            <Typography variant="subtitle1" textAlign="left" sx={{fontSize:'1 0px', fontWeight:'bold', }}>
              Total Price
            </Typography>
            <Typography variant="subtitle1" textAlign="left">
              S$ {reservation.timeslot}
            </Typography>
          </Grid>
        </Grid>

        <Accordion sx={{border:'1px solid #eeeeee', mt:'20px'}} expanded={innerAccOpen} >
          {/* HEADER OF ACCORDION */}
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="reservation-details"
            id="reservation-details"
            sx={{borderBottom:'0.5px solid #eeeeee'}}
            onClick={()=>{setInnerAccOpen(!innerAccOpen)}}
          >
            <Typography sx={{fontSize:'1 0px', fontWeight:'bold', }}>
              Pre-order Details
            </Typography>
          </AccordionSummary>
          {/* INNDER ACCORDION */}
          <AccordionDetails>
            {reservation.po_items !== "none" ? (reservation.po_items.map(item => (
              <><ListItem key={reservation.po_ID} sx={{margin:'20px auto'}}>
                <Box width='70%'>
                  <Typography variant="h6">
                    {item.itemName}
                  </Typography>
                  <Typography variant="subtitle">
                    Unit Price: S${item.itemPrice.toFixed(2)}
                  </Typography>
                </Box>
                <Box width='30%' textAlign='right' sx={{mt:'10px'}}>
                  <Typography variant="subtitle2">
                    Quantity: {item.itemQty}
                  </Typography>
                    <Typography variant="subtitle2">
                      Price: S$ {(item.itemQty * item.itemPrice).toFixed(2)}
                    </Typography>
                  </Box>
              </ListItem></>))) : (<></>)}
          </AccordionDetails>
        </Accordion>

        {reservation.po_status === 'Pending' ? (
        <>
          <Box m={1} pt={5}>
            < Button variant="outlined" id="1" color="inherit" fullWidth>Accept </Button>
          </Box>
          <Box m={1} pt={1}>
            <Button variant="outlined" id="1" color="error" fullWidth>Decline </Button>
          </Box>
        </>) : reservation.po_status === 'Preparing' ? (
        <>
          <Box m={1} pt={5}>
            < Button variant="outlined" id="1" color="inherit" fullWidth>Out for delivery </Button>
          </Box>
        </>) : (<></>)}

        </Box>
      </AccordionDetails>
    </Accordion>
  )
}
