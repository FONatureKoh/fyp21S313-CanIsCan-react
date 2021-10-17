import React from 'react'
import { Card, CardHeader, CardContent, Box, Typography, Button } from '@mui/material'
import { TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

export default function ExistingRest({existingList}) {
  const themes = {
    textHeader: {
      fontSize:'1 0px', 
      fontWeight:'bold', 
      mt: '5px'
    }
  };
  return (
    <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px'}}>
      <CardHeader title="Existing Restaurants" />
      <CardContent >
        <Box sx={{width:'90%', margin: '0px auto'}}> 
          {/* SEARCH BAR */}
          <TextField sx={{width:'100%', margin:'10px auto 30px'}} 
            id="filled-basic" 
            label="Search Restaurant.." 
            variant="outlined" 
            InputProps={{
              endAdornment: <InputAdornment position="end"><SearchIcon/></InputAdornment>,
            }}
          />

          {/* EXISTING RESTAURANTS */}
          {
              existingList.map(item =>{
                return(
                  <Accordion sx={{margin:0.5, borderRadius:1}}>
                  <AccordionSummary sx={{textAlign: 'center', bgcolor: '#bdbdbd', borderRadius: 1, minWidth: 300}}>
                    <Typography sx={{textAlign: 'center'}}>
                      {item.rest_name}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ bgcolor: '#eeeeee'}}>
                    <Box sx={{ width:'100%', textAlign:'center', p:'10px auto'}}>
                    <Typography sx={themes.textHeader}>
                      Restaurant Name:
                    </Typography>

                    <Typography>
                      {item.rest_name}
                    </Typography>

                    {/* PUT PHONE NUMBER FOR EMPLOYEES TO CONTACT */}
                    <Typography sx={themes.textHeader}>
                      Phone Number:
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
