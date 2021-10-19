import React from 'react'
import { Card, CardHeader, CardContent, Box, Typography, Button } from '@mui/material'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

export default function ApproveRest({restDetails}) {
  //State for handling accordion open close
  const [expanded, setExpanded] = React.useState(false);

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
  return (
    <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px'}}>
        <CardHeader title="Pending Restaurant Registration" />
        <CardContent >
          <Box sx={{width:'90%', margin: '0px auto'}}> 
            {
              restDetails.map(item =>{
                return(
                  <Accordion sx={{margin:0.5, borderRadius:1}}>
                  <AccordionSummary sx={{textAlign: 'center', bgcolor: '#bdbdbd', borderRadius: 1, minWidth: 300}}>
                    <Typography sx={{textAlign: 'center'}}>
                      {item.rest_name}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ bgcolor: '#eeeeee'}}>
                    <Box sx={{ width:'100%', textAlign:'center', p:'20px auto'}}>
                    <Typography sx={themes.textHeader}>
                      Restaurant Name:
                    </Typography>

                    <Typography>
                      {item.rest_name}
                    </Typography>

                    <Typography sx={themes.textHeader}>
                      UEN Number:
                    </Typography>

                    <Typography>
                      {item.uen}
                    </Typography>

                    <Typography sx={themes.textHeader}>
                      Email Address:
                    </Typography>

                    <Typography>
                      {item.rest_email}
                    </Typography>
                    </Box>
                    <Box sx={{width:'100%', textAlign:'center', mt:'20px'}}>
                      <Button variant='outlined' color='inherit'  sx={{mr:'10px', width:'100px'}}>APPROVE</Button>
                      <Button variant='outlined' color='error' sx={{ml:'10px', width:'100px'}}>REJECT</Button>
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