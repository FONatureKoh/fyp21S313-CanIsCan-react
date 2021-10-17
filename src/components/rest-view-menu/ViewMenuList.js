import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuItem from './MenuItem';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Box } from '@mui/system';

export default function ViewMenuList({menuData, menuList}) {

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

  // NOTE: item_availability values and representation, 1 is true, and 0 is false
  function checkAvail(item){
    if (item.item_availability === 1)
    {
      return <FiberManualRecordIcon color="success" sx={{ fontSize: 10}} /> 
    }
    else
    {
      return ;
    }
  }

  return (
    menuData.map(item =>{
      if (item.ric_name === menuList)
      return( 
        
      <Accordion key={item.ri_item_ID} sx={{margin:0.5}} expanded={expanded === item.ri_item_ID} onChange={handleChange(item.ri_item_ID)}>
        <AccordionSummary sx={{textAlign: 'center', bgcolor: '#bdbdbd', borderRadius: 1, minWidth: 300}}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          
        >
          <Typography sx={{
            textAlign: 'center',
            borderRadius: 1,
            p: 1
          }}>
            {checkAvail(item)} {item.item_name} </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{
          bgcolor: '#eeeeee'
        }}>
          <MenuItem item={item} menuData={menuData}/>
        </AccordionDetails>
      </Accordion>
      )
    })
  )
}
