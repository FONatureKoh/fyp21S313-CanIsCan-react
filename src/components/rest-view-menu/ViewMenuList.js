import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuItem from './MenuItem';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export default function ViewMenuList({menu_items, itemSelected, setItemSelected}) {

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

  function checkAvail(item){
    if (item.available == true)
    {
      return <FiberManualRecordIcon color="success" sx={{ fontSize: 10}} /> 
    }
    else
    {
      return ;
    }
  }

  return (
    menu_items.map(item =>{
      return <Accordion sx={{margin:0.5}} expanded={expanded === item.id} onChange={handleChange(item.id)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            textAlign: 'center',
            bgcolor: '#bdbdbd',
            borderRadius: 1,
            minWidth: 300
          }}
        >
          <Typography sx={{
            textAlign: 'center',
            borderRadius: 1,
            p: 1
          }}>
            {checkAvail(item)} {item.name} </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{
          bgcolor: '#eeeeee'
        }}>
          <MenuItem item={item} itemSelected={itemSelected} setItemSelected={setItemSelected}/>
        </AccordionDetails>
      </Accordion>
    })
  )
}
