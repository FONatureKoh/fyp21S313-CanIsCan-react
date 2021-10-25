import React, { useState } from 'react'
import { Card, CardHeader, CardContent, Box, Button, Typography, Grid, Modal, CardMedia, IconButton, Tooltip, Accordion, AccordionSummary, AccordionDetails, ListItem } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TestImage from '../../assets/temp/eg-biz1.png'
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Divider } from '@mui/material';

const themes = {
  textHeader: {
    fontSize:'1 0px', 
    fontWeight:'bold', 
    mt: '20px',
    mb: '10px'
  }
};

const apiKey = "AIzaSyCZltDQ_C75D3csUGTpHRpfAJhZuPP2bqM"
export default function ReservationHistory() {
  const [buttonTab, setButtonTab] = useState(1);
  const [accOpen, setAccOpen] = useState(false);
  
  //MODAL CONTROLS - DIRECTIONS / INFO
  const [openInfo, setOpenInfo] = useState(false);
  const handleOpenInfo = () => setOpenInfo(true);
  const handleCloseInfo = () => setOpenInfo(false);

  //GET STATIC MAP
  function getMap(postal){
    const maplink = `http://maps.google.com/maps/api/staticmap?center=${postal}&zoom=17&size=400x300&maptype=roadmap&key=${apiKey}&region=SG&markers=color:red%7C${postal}&scale=2`;
    return maplink;
  }

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
        <CardHeader title="Reservation History" />
        <CardContent >
          <Box sx={{margin:'0px 10px 20px', textAlign:'right'}}>
            <Button variant="outlined" color="inherit" sx={{marginRight:'20px'}} onClick={()=> setButtonTab(1)}>upcoming reservation</Button>
            <Button variant="outlined" color="inherit" onClick={()=> setButtonTab(2)}>Past reservations</Button>
          </Box>

          {
            buttonTab === 1 ? (
              <>
              {/* UPCOMING RESERVATION */}
              <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px', width:'80%', margin:'0px auto'}}>
                <CardHeader title="Upcoming Reservation" sx={{textAlign:"center"}}/>
                <CardContent >
                <Box width="80%" sx={{margin:'0px auto', textAlign:"center"}}> 
                  <Typography variant="subtitle1"  sx={{fontSize:'1 0px', fontWeight:'bold', }}>
                    Reservation at
                  </Typography>
                  <Typography variant="subtitle1" >
                    Restaurant Name
                  </Typography>
                  <Typography variant="subtitle1" >
                    <Tooltip title="Restaurant Information">
                      <IconButton aria-label="info" onClick={handleOpenInfo}>
                        <InfoOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Send Calendar Invite">
                      <IconButton aria-label="calendar">
                        <InsertInvitationIcon />
                      </IconButton>
                    </Tooltip>
                  </Typography>

                  <Divider variant="middle" />

                  <Typography variant="subtitle1"  sx={{fontSize:'1 0px', fontWeight:'bold', mt:'30px' }}>
                    Reservation Details
                  </Typography>
                  <Grid container>
                    <Grid item xs={12} sm={12} md={6}>
                      <Typography variant="subtitle1"  sx={{fontSize:'1 0px', fontWeight:'bold', mt:'20px' }}>
                        Reservation Number
                      </Typography>
                      <Typography variant="subtitle1" >
                        12343
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Typography variant="subtitle1"  sx={{fontSize:'1 0px', fontWeight:'bold', mt:'20px' }}>
                        No. of Pax
                      </Typography>
                      <Typography variant="subtitle1" >
                        2
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Typography variant="subtitle1"  sx={{fontSize:'1 0px', fontWeight:'bold', mt:'20px' }}>
                        Reservation Date
                      </Typography>
                      <Typography variant="subtitle1" >
                        Date placeholder
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Typography variant="subtitle1"  sx={{fontSize:'1 0px', fontWeight:'bold', mt:'20px' }}>
                        Reservation Time
                      </Typography>
                      <Typography variant="subtitle1" >
                        Time slot placeholder
                      </Typography>
                    </Grid>
                  </Grid>
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
                    </AccordionDetails>
                  </Accordion>


                  {/* CONTAINER FOR BUTTONS */}
                  <Grid container sx={{mt:'50px'}}>
                    <Grid item xs={12} sm={12} md={3}>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                      <Button color="inherit" variant="outlined">
                        Edit Reservation
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                      <Button color="error" variant="outlined">
                        Cancel Reservation
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                    </Grid>
                  </Grid>
                </Box>
                </CardContent>
              </Card>
              {/* END OF UPCOMING RESERVATION */}
              </>
            ) : (
              <>
              {/* START OF PAST RESERVATIONS */}
              <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px', width:'80%', margin:'0px auto 20px'}}>
                <Box sx={{float:'right', margin:'5px 10px 0px 0px', position:'absolute', right:'11%'}}>
                  <Button variant='contained' color="inherit" >reserve again</Button>
                </Box>
                <CardContent>
                  <Box width="80%" sx={{margin:'0px auto', textAlign:"center"}}>
                  <Typography variant="subtitle1" sx={{fontSize:'1 0px', fontWeight:'bold', mb:'10px' }}>
                    Reservation number - 123552
                  </Typography>
                  
                  <Divider variant="middle" />
                  <Typography variant="subtitle1" sx={themes.textHeader}>
                    Reservation Details
                  </Typography>

                  <Grid container>
                    <Grid item xs={12} sm={12} md={6}>
                      <Typography variant="subtitle1"  sx={{fontSize:'1 0px', fontWeight:'bold', mt:'20px' }}>
                        Fulfiled by
                      </Typography>
                      <Typography variant="subtitle1" >
                        Restaurant Name
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Typography variant="subtitle1"  sx={{fontSize:'1 0px', fontWeight:'bold', mt:'20px' }}>
                        No. of Pax
                      </Typography>
                      <Typography variant="subtitle1" >
                        2
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Typography variant="subtitle1"  sx={{fontSize:'1 0px', fontWeight:'bold', mt:'20px' }}>
                        Reservation Date
                      </Typography>
                      <Typography variant="subtitle1" >
                        Date placeholder
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Typography variant="subtitle1"  sx={{fontSize:'1 0px', fontWeight:'bold', mt:'20px' }}>
                        Reservation Time
                      </Typography>
                      <Typography variant="subtitle1" >
                        Time slot placeholder
                      </Typography>
                    </Grid>
                  </Grid>

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
                    </AccordionDetails>
                  </Accordion>
                  <Box textAlign="center" sx={{mt:'30px'}}>
                    <Button fullWidth variant="outlined" color="inherit" >LEAVE REVIEW</Button>
                  </Box>
                  </Box>
                </CardContent>
              </Card>
              {/* END OF PAST RESERVATIONS */}

              {/* START OF PAST RESERVATIONS 2*/}
              <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px', width:'80%', margin:'0px auto'}}>
                <Box sx={{float:'right', margin:'5px 10px 0px 0px', position:'absolute', right:'11%'}}>
                  <Button variant='contained' color="inherit" >reserve again</Button>
                </Box>
                <CardContent>
                  <Box width="80%" sx={{margin:'0px auto', textAlign:"center"}}>
                  <Typography variant="subtitle1" sx={{fontSize:'1 0px', fontWeight:'bold', mb:'10px' }}>
                    Reservation number - 123552
                  </Typography>
                  
                  <Divider variant="middle" />
                  <Typography variant="subtitle1" sx={themes.textHeader}>
                    Reservation Details
                  </Typography>

                  <Grid container>
                    <Grid item xs={12} sm={12} md={6}>
                      <Typography variant="subtitle1"  sx={{fontSize:'1 0px', fontWeight:'bold', mt:'20px' }}>
                        Fulfiled by
                      </Typography>
                      <Typography variant="subtitle1" >
                        Restaurant Name
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Typography variant="subtitle1"  sx={{fontSize:'1 0px', fontWeight:'bold', mt:'20px' }}>
                        No. of Pax
                      </Typography>
                      <Typography variant="subtitle1" >
                        2
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Typography variant="subtitle1"  sx={{fontSize:'1 0px', fontWeight:'bold', mt:'20px' }}>
                        Reservation Date
                      </Typography>
                      <Typography variant="subtitle1" >
                        Date placeholder
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Typography variant="subtitle1"  sx={{fontSize:'1 0px', fontWeight:'bold', mt:'20px' }}>
                        Reservation Time
                      </Typography>
                      <Typography variant="subtitle1" >
                        Time slot placeholder
                      </Typography>
                    </Grid>
                  </Grid>
                  <Box sx={{mt:'30px'}}>
                    No items were preordered.
                  </Box>
                  <Box textAlign="center" sx={{mt:'30px'}}>
                    <Button fullWidth variant="outlined" color="inherit" >LEAVE REVIEW</Button>
                  </Box>
                  </Box>
                </CardContent>
              </Card>
              {/* END OF PAST RESERVATIONS */}
              </>
            )
          }

          {/* INFO MODAL */}
          <Modal
              open={openInfo}
              onClose={handleCloseInfo}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Card variant="outlined" sx={{ position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width:"600px",
                maxHeight:'70%',}}>
                <CardMedia
                  component="img"
                  height="140"
                  image={TestImage}
                />
                <CardContent >
                  <Box textAlign="center">
                    <Typography variant="h5">Restaurant Name</Typography>
                    <Typography variant="subtitle2">Tags</Typography>
                  </Box>
                  <Box display="flex" flexDirection="row" sx={{mt:'20px'}}>
                    <Box width='50%' padding="10px 20px">
                      <Typography variant="h6">
                        Address
                      </Typography>
                      <Typography variant="subtitle2">
                        930 Hougang Street 91
                      </Typography>
                      <Typography variant="subtitle2">
                        S (530930)
                      </Typography>
                      <Typography variant="h6" sx={{mt:'10px'}}>
                        Operating Hours
                      </Typography>
                      <Typography variant="subtitle2">
                        Time to time
                      </Typography>
                    </Box>
                    <Box alignContent="flex-end">
                    <img width="300px" height="200px" src={getMap(530930)}/>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Modal>
            {/* END OF INFO MODAL */}

            <Box textAlign="center" sx={{mt:'30px'}}>
              <Button fullWidth variant="outlined" color="inherit" >Load More</Button>
            </Box>
        </CardContent>
      </Card>
  )
}
