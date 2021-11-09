import React, { useState } from 'react'
import { Box, Typography, Divider, Accordion, AccordionSummary, AccordionDetails, Grid, ListItem, Button } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getReservations, updatePOStatus, updateReservationStatus } from '../rm_controller';

export default function ResAccordion({reservation, setReservations}) {
  // ACCORDION CONTROL
  const [accOpen, setAccOpen] = useState(false);
  const [innerAccOpen, setInnerAccOpen] = useState(false);

  // Pre-order State
  const [preOrderStatus, setPreOrderStatus] = useState(reservation.po_status);
  // console.log(reservation);

  // console.log(reservation)
  // Button functions
  const setAbsent = () => {
    // THIS IS THE CONTROLLER TO COMMUNICATE THE STATUS CHANGE TO THE BACKEND API SERVER
    updateReservationStatus(reservation.cust_RID, "No Show")
      .then((response) => {
        alert(response.api_msg);

        // RELOADS DATA
        getReservations(1)
          .then((response) => {
            setReservations(response);
          });
      })
  }

  const setArrived = () => {
    // THIS IS THE CONTROLLER TO COMMUNICATE THE STATUS CHANGE TO THE BACKEND API SERVER
    updateReservationStatus(reservation.cust_RID, "Fulfilled")
      .then((response) => {
        alert(response.api_msg);
        
        // RELOADS DATA
        getReservations(1)
          .then((response) => {
            setReservations(response);
          });
      })
  }

  const setSendToKitchen = () => {
    // THIS IS THE CONTROLLER TO COMMUNICATE THE STATUS CHANGE TO THE BACKEND API SERVER
    updatePOStatus(reservation.po_ID, "Complete")
      .then((response) => {
        alert(response.api_msg);
        if (response.updateStatus === "success") {
          setPreOrderStatus("Complete");
        }
      })
  }

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
        <Box>
          <Typography sx={{fontSize:'1 0px', fontWeight:'bold'}}>
            {reservation.cust_RID}
          </Typography>
          <Typography sx={{fontSize:'1 0px', fontWeight:'bold'}}>
            Status: {reservation.reservation_status}
          </Typography>
        </Box>
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
              Expected Cost
            </Typography>
            <Typography variant="subtitle1" textAlign="left">
              {reservation.po_total_cost}
            </Typography>
          </Grid>

          {/* <Grid item xs={4} md={4} sm={4}>
            <Typography variant="subtitle1" textAlign="left" sx={{fontSize:'1 0px', fontWeight:'bold', }}>
              Status
            </Typography>
            <Typography variant="subtitle1" textAlign="left">
              {reservation.reservation_status}
            </Typography>
          </Grid> */}

          <Grid item xs={8} md={8} sm={8}>
            <Typography variant="subtitle1" textAlign="left" sx={{fontSize:'1 0px', fontWeight:'bold', }}>
              Reservation Timeslot
            </Typography>
            <Typography variant="subtitle1" textAlign="left">
              {reservation.date}{" @ "}{reservation.timeslot}
            </Typography>
          </Grid>
          <Grid item xs={4} md={4} sm={4}>
            <Typography variant="subtitle1" textAlign="left" sx={{fontSize:'1 0px', fontWeight:'bold', }}>
              Total Pax
            </Typography>
            <Typography variant="subtitle1" textAlign="left">
              {reservation.pax} pax
            </Typography>
          </Grid>
        </Grid>

        {reservation.po_items === "none" ? (<>
            <Box width="80%" sx={{margin:'20px auto', textAlign:'center'}}>
              <Typography variant="h6">No pre-ordered items</Typography>
            </Box>
            </>) : (<>
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
                  {reservation.po_items !== "none" ? (
                    reservation.po_items.map(item => (
                    <><ListItem key={reservation.po_ID} sx={{margin:'20px auto'}}>
                      <Box width='70%'>
                        <Typography variant="h6">
                          {item.itemName}
                        </Typography>
                        <Typography variant="subtitle">
                          Unit Price: S${item.itemPrice}
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
                    </ListItem></>))
                  ) : (<></>)}
          </AccordionDetails>
        </Accordion>
            </>)}
        

        {reservation.reservation_status === 'Pending' ? (
        <>
          <Box m={1} pt={5}>
            <Button onClick={setArrived} variant="outlined" id="1" color="inherit" fullWidth>Customer has arrived </Button>
          </Box>
          <Box m={1} pt={1}>
            <Button onClick={setAbsent} variant="outlined" id="1" color="error" fullWidth>Absent or No Show </Button>
          </Box>
        </>) : reservation.reservation_status === 'Fulfilled' ? (
        <>
          {preOrderStatus === 'Pending' ? (
            <>
              <Box m={1} pt={5}>
                <Button onClick={setSendToKitchen} variant="outlined" id="1" color="inherit" fullWidth>Send Order to Kitchen </Button>
              </Box>
            </>):(<></>)}
          
        </>) : (<></>)}

        </Box>
      </AccordionDetails>
    </Accordion>
  )
}
