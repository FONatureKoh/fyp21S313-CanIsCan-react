import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardContent, Box, Button, Typography, Grid, Modal, CardMedia, IconButton, Tooltip, Accordion, AccordionSummary, AccordionDetails, ListItem } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TestImage from '../../assets/temp/eg-biz1.png'
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import { Divider } from '@mui/material';
import { getPastReservations, getUpcomingReservations } from '../customer_controller';
import ResAcc from './ResAcc';

const themes = {
  textHeader: {
    fontSize:'1 0px', 
    fontWeight:'bold', 
    mt: '20px',
    mb: '10px'
  }
};

// MAPS API
const apiKey = "AIzaSyCZltDQ_C75D3csUGTpHRpfAJhZuPP2bqM"

// ACTUAL PAGE
export default function ReservationHistory() {
  // USETATES FOR BUTTON TAB CONTROL
  const [buttonTab, setButtonTab] = useState(1);
  const [accOpen, setAccOpen] = useState(false);
  
  //MODAL CONTROLS - DIRECTIONS / INFO
  const [openInfo, setOpenInfo] = useState(false);
  const handleOpenInfo = () => setOpenInfo(true);
  const handleCloseInfo = () => setOpenInfo(false);

  // RESERVATIONS DATA USETATES
  const [pastReservations, setPastReservations] = useState([]);
  const [upcomingReservations, setUpcomingReservations] = useState([]);

  useEffect(() => {
    // Async function to draw the data
    async function getAllReservations () {
      try {
        const pastResResponse = await getPastReservations();
        const upcomingResResponse = await getUpcomingReservations();

        setPastReservations(pastResResponse);
        setUpcomingReservations(upcomingResResponse);
      }
      catch (err) {
        console.log(err);
      }
    }
    getAllReservations();
  }, []);

  // NOTE: Please note that the retrieved data will ALWAYS be an array. So if need be it will return
  // an empty array if cannot find anything in the database. The retrieved Schema as follows, and also note
  // that the preOrderItems will be an Array as well, but if no items, it will be "None". Please see console.log
  // for all the reservations from the database
  // {
  //   "cr_resID": 1,
  //   "cr_restName": "Kelvin's Cat Cafe",
  //   "crID": "CR_0001_1635925368918",
  //   "pax": 1,
  //   "date": "Sun, 07 Nov 2021",
  //   "timeslot": "5:00 PM",
  //   "status": "Pending",
  //   "preOrderItems": [
  //     {
  //       "itemID": 2,
  //       "itemName": "Fries",
  //       "itemPrice": 3,
  //       "itemQty": 1,
  //       "itemSO": "NIL",
  //       "item_restItemID": 11
  //     },
  //     {
  //       "itemID": 3,
  //       "itemName": "Cheese Dip",
  //       "itemPrice": 2,
  //       "itemQty": 1,
  //       "itemSO": "NIL",
  //       "item_restItemID": 21
  //     }
  //   ]
  // }
  console.log("past", pastReservations);
  console.log("up", upcomingReservations);

  //GET STATIC MAP
  function getMap(postal){
    const maplink = `http://maps.google.com/maps/api/staticmap?center=${postal}&zoom=17&size=400x300&maptype=roadmap&key=${apiKey}&region=SG&markers=color:red%7C${postal}&scale=2`;
    return maplink;
  }

  return (
      <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px'}}>
        <CardHeader title={`Reservations History - ${buttonTab === 1 ? "Upcoming" : "Past"}`}/>
        <CardContent >
          <Box sx={{margin:'0px 10px 20px', textAlign:'right'}}>
            <Button variant="outlined" color="inherit" sx={{marginRight:'20px'}} onClick={()=> setButtonTab(1)}>upcoming reservation</Button>
            <Button variant="outlined" color="inherit" onClick={()=> setButtonTab(2)}>Past reservations</Button>
          </Box>

          {
            buttonTab === 1 ? (
              <>
              {upcomingReservations.length === 0 ? (<>
                <Box width="80%" sx={{margin:'20px auto', textAlign:'center'}}>
                  <Typography variant="h6">No upcoming reservations! Make one now!</Typography>
                </Box>
                </>) : (<>
                {/* UPCOMING RESERVATION */}
                {upcomingReservations.map((item)=>{
                  return (<>
                    <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px', width:'80%', margin:'0px auto 20px'}}>
                      <CardHeader title="Upcoming Reservation" sx={{textAlign:"center"}}/>
                      <CardContent >
                      <Box width="80%" sx={{margin:'0px auto', textAlign:"center"}}> 
                        <Typography variant="subtitle1"  sx={{fontSize:'1 0px', fontWeight:'bold', }}>
                          Reservation at
                        </Typography>
                        <Typography variant="subtitle1" >
                          {item.cr_restName}
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
                              Reservation Status
                            </Typography>
                            <Typography variant="subtitle1" >
                              {item.status}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={12} md={6}>
                            <Typography variant="subtitle1"  sx={{fontSize:'1 0px', fontWeight:'bold', mt:'20px' }}>
                              Reservation Number
                            </Typography>
                            <Typography variant="subtitle1" >
                              {item.crID}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={12} md={4}>
                            <Typography variant="subtitle1"  sx={{fontSize:'1 0px', fontWeight:'bold', mt:'20px' }}>
                              Reservation Date
                            </Typography>
                            <Typography variant="subtitle1" >
                              {item.date}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={12} md={4}>
                            <Typography variant="subtitle1"  sx={{fontSize:'1 0px', fontWeight:'bold', mt:'20px' }}>
                              Reservation Time
                            </Typography>
                            <Typography variant="subtitle1" >
                              {item.timeslot}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={12} md={4}>
                            <Typography variant="subtitle1"  sx={{fontSize:'1 0px', fontWeight:'bold', mt:'20px' }}>
                              No. of Pax
                            </Typography>
                            <Typography variant="subtitle1" >
                              {item.pax}
                            </Typography>
                          </Grid>
                        </Grid>

                        <Box sx={{mt:'30px'}}>
                          {item.preOrderItems === "None" ? (<><Typography>No item has been pre-ordered</Typography></>) : <><ResAcc itemDetails={item.preOrderItems}/></>}
                        </Box>
                        {/* CONTAINER FOR BUTTONS */}
                        <Grid container sx={{mt:'50px'}}>
                          {/* <Grid item xs={12} sm={12} md={3}>
                            <Button color="inherit" variant="outlined">
                              Edit Reservation
                            </Button>
                          </Grid> */}
                          <Grid item xs={12} sm={12} md={12}>
                            <Button fullWidth color="error" variant="outlined">
                              Cancel Reservation
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                      </CardContent>
                    </Card>
                    {/* END OF UPCOMING RESERVATION */}
                  </>
                )})}
                </>)}             
                
              </>
            ) : (
              <> 
              {pastReservations.length === 0 ? (<>
                <Box width="80%" sx={{margin:'20px auto', textAlign:'center'}}>
                  <Typography variant="h6">No past reservations</Typography>
                </Box>
                </>) : (<>
                              {/* UPCOMING RESERVATION */}
              {pastReservations.map((item)=>{
                return (<>
                  <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px', width:'80%', margin:'0px auto 20px'}}>
                    <CardHeader title="Past Reservation" sx={{textAlign:"center"}}/>
                    <CardContent >
                    <Box width="80%" sx={{margin:'0px auto', textAlign:"center"}}> 
                      <Typography variant="subtitle1"  sx={{fontSize:'1 0px', fontWeight:'bold', }}>
                        Reservation at
                      </Typography>
                      <Typography variant="subtitle1" >
                        {item.cr_restName}
                      </Typography>
                      <Typography variant="subtitle1" >
                        <Tooltip title="Restaurant Information">
                          <IconButton aria-label="info" onClick={handleOpenInfo}>
                            <InfoOutlinedIcon />
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
                            Reservation Status
                          </Typography>
                          <Typography variant="subtitle1" >
                            {item.status}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                          <Typography variant="subtitle1"  sx={{fontSize:'1 0px', fontWeight:'bold', mt:'20px' }}>
                            Reservation Number
                          </Typography>
                          <Typography variant="subtitle1" >
                            {item.crID}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                          <Typography variant="subtitle1"  sx={{fontSize:'1 0px', fontWeight:'bold', mt:'20px' }}>
                            Reservation Date
                          </Typography>
                          <Typography variant="subtitle1" >
                            {item.date}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                          <Typography variant="subtitle1"  sx={{fontSize:'1 0px', fontWeight:'bold', mt:'20px' }}>
                            Reservation Time
                          </Typography>
                          <Typography variant="subtitle1" >
                            {item.timeslot}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                          <Typography variant="subtitle1"  sx={{fontSize:'1 0px', fontWeight:'bold', mt:'20px' }}>
                            No. of Pax
                          </Typography>
                          <Typography variant="subtitle1" >
                            {item.pax}
                          </Typography>
                        </Grid>
                      </Grid>

                      <Box sx={{mt:'30px'}}>
                        {item.preOrderItems === "None" ? (<><Typography>No item has been pre-ordered</Typography></>) : <><ResAcc itemDetails={item.preOrderItems}/></>}
                      </Box>
                      {/* CONTAINER FOR BUTTONS */}
                      <Grid container sx={{mt:'50px'}}>
                        {/* <Grid item xs={12} sm={12} md={3}>
                          <Button color="inherit" variant="outlined">
                            Edit Reservation
                          </Button>
                        </Grid> */}
                        <Grid item xs={12} sm={12} md={12}>
                          <Button fullWidth color="inherit" variant="outlined">
                            Leave review
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                    </CardContent>
                  </Card>
                  {/* END OF UPCOMING RESERVATION */}
                </>
              )})}
                </>)}             
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

            {/* <Box textAlign="center" sx={{mt:'30px'}}>
              <Button fullWidth variant="outlined" color="inherit" >Load More</Button>
            </Box> */}
        </CardContent>
      </Card>
  )
}
