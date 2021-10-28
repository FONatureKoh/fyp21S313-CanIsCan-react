import React, { useState } from 'react'
import { Card, CardHeader, CardContent, Box, Typography, Stepper, Step, StepLabel, Divider, Accordion, AccordionSummary, AccordionDetails, Grid, ListItem, Button } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const themes = {
  textHeader: {
    fontSize:'1 0px', 
    fontWeight:'bold', 
    mt: '20px',
    mb: '10px'
  }
};


export default function ViewPending() {
// ACCORDION CONTROL
const [accOpen, setAccOpen] = useState(false);

//CART TESTING
const [realCart, setRealCart]= useState([
  {
    id: 1,
    item: 'dog food',
    price: 12.1,
    qty: 3 
  },
  {
    id: 2,
    item: 'cat food',
    price: 13,
    qty: 2
  },
  {
    id: 3,
    item: 'giraffe food',
    price: 23,
    qty: 1
  },
  {
    id: 4,
    item: 'giraffe food',
    price: 23,
    qty: 1
  },
  {
    id: 5,
    item: 'giraffe food',
    price: 23,
    qty: 1
  }
])

  
  return (
    <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px'}}>
    <CardHeader title="Pending Orders" />
    <CardContent>
      <>
      <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px', width:'80%', margin:'0px auto'}}>
        <CardContent >
          <Box width="100%" sx={{margin:'0px auto', textAlign:"center"}}>
            <Accordion sx={{border:'1px solid #eeeeee', mt:'20px'}} expanded={accOpen} >
              {/* HEADER OF ACCORDION */}
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="item-details"
                id="item-details"
                sx={{borderBottom:'0.5px solid #eeeeee'}}
                onClick={()=>{setAccOpen(!accOpen)}}
              >
                <Typography sx={{fontSize:'1 0px', fontWeight:'bold', }}>
                  Order #00001
                </Typography>
              </AccordionSummary>
              {/* INNDER ACCORDION */}
              <AccordionDetails>
                {realCart.map(item => (
                  <ListItem key={item.id} sx={{margin:'20px auto'}}>
                    <Box width='70%'>
                      <Typography variant="h6">
                        {item.item}
                      </Typography>
                      <Typography variant="subtitle">
                        Unit Price: S${item.price.toFixed(2)}
                      </Typography>
                    </Box>
                    <Box width='30%' textAlign='right' sx={{mt:'10px'}}>
                      <Typography variant="subtitle2">
                        Quantity: {item.qty}
                      </Typography>
                        <Typography variant="subtitle2">
                          Price: S$ {(item.qty * item.price).toFixed(2)}
                          
                        </Typography>
                      </Box>
                  </ListItem>
                ))}
                <Box m={1} pt={1}>
                <Button variant="outlined" id="1" color="inherit" fullWidth>Accept
                </Button>
                </Box>
                <Box m={1} pt={1}>
                <Button variant="outlined" id="1" color="error" fullWidth>Decline
                </Button>
                </Box>
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{border:'1px solid #eeeeee', mt:'20px'}} expanded={accOpen} >
              {/* HEADER OF ACCORDION */}
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="item-details"
                id="item-details"
                sx={{borderBottom:'0.5px solid #eeeeee'}}
                onClick={()=>{setAccOpen(!accOpen)}}
              >
                <Typography sx={{fontSize:'1 0px', fontWeight:'bold', }}>
                  Order #11111
                </Typography>
              </AccordionSummary>
              {/* INNDER ACCORDION */}
              <AccordionDetails>
                {realCart.map(item => (
                  <ListItem key={item.id} sx={{margin:'20px auto'}}>
                    <Box width='70%'>
                      <Typography variant="h6">
                        {item.item}
                      </Typography>
                      <Typography variant="subtitle">
                        Unit Price: S${item.price.toFixed(2)}
                      </Typography>
                    </Box>
                    <Box width='30%' textAlign='right' sx={{mt:'10px'}}>
                      <Typography variant="subtitle2">
                        Quantity: {item.qty}
                      </Typography>
                        <Typography variant="subtitle2">
                          Price: S$ {(item.qty * item.price).toFixed(2)}
                        </Typography>
                      </Box>
                  </ListItem>
                ))}
                <Box m={1} pt={1}>
                <Button variant="outlined" id="2" color="inherit" fullWidth>Accept
                </Button>
                </Box>
                <Box m={1} pt={1}>
                <Button variant="outlined" id="2" color="error" fullWidth>Decline
                </Button>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
        </CardContent>
      </Card>
        </>
    </CardContent>
  </Card>
)
}
