import React, { useState } from 'react'
import { Box, Typography, Divider, Accordion, AccordionSummary, AccordionDetails, Grid, ListItem, Button } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { updateDOStatus, getOrders } from '../dm_controller';

export default function DelAccordion({item, setPendingDO, setAcceptedDO}) {
  
  // ACCORDION CONTROL
  const [accOpen, setAccOpen] = useState(false);
  const [innerAccOpen, setInnerAccOpen] = useState(false);

  const setPreparing = () => {
    // CONTROLLER TO UPDATE STATUS OF ORDER
    updateDOStatus(item.orderID, "Preparing")
      .then((response) => {
        alert(response.api_msg);
        getOrders(1)
          .then((response) => {
            setPendingDO(response);
          })
      })
  }

  const setDelivering = () => {
    // CONTROLLER TO UPDATE STATUS OF ORDER
    updateDOStatus(item.orderID, "Delivering")
      .then((response) => {
        alert(response.api_msg);
        getOrders(2)
          .then((response) => {
            setAcceptedDO(response);
          })
      })
  }

  return (
    <Accordion sx={{border:'1px solid #eeeeee', mt:'20px'}} expanded={accOpen} >
      {/* HEADER OF ACCORDION */}
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="item-details"
        id="item-details"
        sx={{borderBottom:'0.5px solid #eeeeee'}}
        onClick={()=>{setAccOpen(!accOpen)}}
      >
        <Box textAlign="left">
          <Typography sx={{fontSize:'1 0px', fontWeight:'bold'}}>
            {item.orderID}
          </Typography>
          <Typography sx={{fontSize:'1 0px', fontWeight:'bold'}}>
            Status: {item.status}
          </Typography>
        </Box>
      </AccordionSummary>
      {/* INNDER ACCORDION */}
      <AccordionDetails>
      <Box width="80%" sx={{margin:'5px auto', textAlign:"center"}}> 
        <Typography variant="subtitle1" sx={{fontSize:'1 0px', fontWeight:'bold', mb:'5px' }}>
          Order Details
        </Typography>
        <Divider variant="middle"/>
        <Grid container sx={{mt:'10px'}}>
          <Grid item xs={12} md={12} sm={12}>
            <Typography variant="subtitle1" textAlign="left" sx={{fontSize:'1 0px', fontWeight:'bold', }}>
              Order By
            </Typography>
            <Typography variant="subtitle1" textAlign="left">
              {item.customerName}
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} sm={8}>
            <Typography variant="subtitle1" textAlign="left" sx={{fontSize:'1 0px', fontWeight:'bold', }}>
              Address
            </Typography>
            <Typography variant="subtitle1" textAlign="left">
              {item.address}
            </Typography>
          </Grid>
          <Grid item xs={4} md={4} sm={4}>
            <Typography variant="subtitle1" textAlign="left" sx={{fontSize:'1 0px', fontWeight:'bold', }}>
              Total Price
            </Typography>
            <Typography variant="subtitle1" textAlign="left">
              S$ {item.price}
            </Typography>
          </Grid>
        </Grid>

        <Accordion sx={{border:'1px solid #eeeeee', mt:'20px'}} expanded={innerAccOpen} >
          {/* HEADER OF ACCORDION */}
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="item-details"
            id="item-details"
            sx={{borderBottom:'0.5px solid #eeeeee'}}
            onClick={()=>{setInnerAccOpen(!innerAccOpen)}}
          >
            <Typography sx={{fontSize:'1 0px', fontWeight:'bold', }}>
              Item Details
            </Typography>
          </AccordionSummary>
          {/* INNDER ACCORDION */}
          <AccordionDetails>
            {item.items.map(item2 => (
              <ListItem key={item.do_item_ID} sx={{margin:'20px auto'}}>
                <Box width='70%'>
                  <Typography variant="h6">
                    {item2.do_item_name}
                  </Typography>
                  <Typography variant="subtitle">
                    Unit Price: S${item2.do_item_price.toFixed(2)}
                  </Typography>
                </Box>
                <Box width='30%' textAlign='right' sx={{mt:'10px'}}>
                  <Typography variant="subtitle2">
                    Quantity: {item2.do_item_qty}
                  </Typography>
                    <Typography variant="subtitle2">
                      Price: S$ {(item2.do_item_qty * item2.do_item_price).toFixed(2)}
                    </Typography>
                  </Box>
              </ListItem>
            ))}
          </AccordionDetails>
        </Accordion>

        {item.status === 'Pending' ? (
        <>
          <Box m={1} pt={5}>
            < Button onClick={setPreparing} variant="outlined" id="1" color="inherit" fullWidth>Accept</Button>
          </Box>
        </>) : item.status === 'Preparing' ? (
        <>
          <Box m={1} pt={5}>
            < Button onClick={setDelivering} variant="outlined" id="1" color="inherit" fullWidth>Out for delivery</Button>
          </Box>
        </>) : (<></>)}

        </Box>
      </AccordionDetails>
    </Accordion>
  )
}
