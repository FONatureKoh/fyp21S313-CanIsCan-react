import React, { useState} from 'react'
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, ListItem } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ResAcc({itemDetails}) {
  
  // ACCORDION CONTROL
  const [accOpen, setAccOpen] = useState(false);

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
      <Typography sx={{fontSize:'1 0px', fontWeight:'bold', }}>
        Preordered item details
      </Typography>
    </AccordionSummary>
    {/* INNDER ACCORDION */}
    <AccordionDetails>
      {itemDetails.map(item => (
        <ListItem key={item.itemID} sx={{margin:'20px auto'}}>
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
        </ListItem>
      ))}
    </AccordionDetails>
  </Accordion>
  )
}
