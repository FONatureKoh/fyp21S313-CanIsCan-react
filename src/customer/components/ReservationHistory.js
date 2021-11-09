import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardHeader, CardContent, CardMedia, Grid, Modal, IconButton, Rating, Tooltip, TextField, Typography, Backdrop, CircularProgress, DialogContentText } from '@mui/material'
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import { Divider } from '@mui/material';
import { getPastReservations, getUpcomingReservations, retrieveSingleRestaurant, cancelReservation, submitRestaurantReview, sendEmailReminder } from '../customer_controller';
import ItemDetailsAcc from './ItemDetailsAcc';

// MAPS API
const apiKey = "AIzaSyCZltDQ_C75D3csUGTpHRpfAJhZuPP2bqM"

// ACTUAL PAGE
export default function ReservationHistory() {
  // USETATES FOR BUTTON TAB CONTROL
  const [buttonTab, setButtonTab] = useState(1);
  
  //MODAL CONTROLS - DIRECTIONS / INFO
  const [openInfo, setOpenInfo] = useState(false);
  const [restInfo, setRestInfo] = useState({});

  const handleOpenInfo = (restID) => {
    retrieveSingleRestaurant(restID)
      .then((response) => {
        setRestInfo(response);
        setOpenInfo(true);
      })
  };
  const handleCloseInfo = () => setOpenInfo(false);

  // RESERVATIONS DATA USETATES
  const [pastReservations, setPastReservations] = useState([]);
  const [upcomingReservations, setUpcomingReservations] = useState([]);

  //REVIEW DATA USETATES
  const [reviewRestInfo, setReviewRestInfo] = useState({
    restID: '',
    restName: ''
  });

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

  // console.log("past", pastReservations);
  // console.log("up", upcomingReservations);

  //GET STATIC MAP
  function getMap(postal){
    const maplink = `http://maps.google.com/maps/api/staticmap?center=${postal}&zoom=17&size=400x300&maptype=roadmap&key=${apiKey}&region=SG&markers=color:red%7C${postal}&scale=2`;
    return maplink;
  }

  /********************************************************************************************************************
   * EVERYTHING TO HANDLE CANCELLING OF A RESERVATION
   ********************************************************************************************************************
   * INCLUDES DIALOG HANDLERS AND STATES
   */
  // STATES FOR DELETE MENU
  const [openCancel, setOpenCancel] = useState(false);
  const [selectedResID, setSelectedResID] = useState('');

  // HANDLES DELETE MENU DIALOG 
  const handleCancelClose = () => {
    setOpenCancel(false);
  };

  const handleReservationOpen = (crID) => {
    setOpenCancel(true);
    setSelectedResID(crID);
  };

  // Handles when we DELETE the menu's name
  function handleCancelReservation() {
    handleCancelClose();
    handleBackdropOpen();
    
    // CANCEL RESERVATIONS CONTROLLER
    cancelReservation(selectedResID)
      .then(response => {
        if (response.api_msg === "success"){
          handleBackdropClose();
          // RELOAD RESERVATIONS
          getUpcomingReservations()
            .then(response => {
              alert("Reservation successfully cancelled! You will receive an email confirmation shortly.");
              setUpcomingReservations(response);
            })   
        }
        else {
          handleBackdropClose();
          alert("Something went wrong, your reservation was not cancelled.")
        }
      })
  }
  //=======================================================================
  // ======= MODAL CONTROLS - REVIEWS ==============================
  //    Modal open / close state
  const [openReview, setOpenReview] = useState(false);

  //    Modal values
  var reviewRating = 0;
  var reviewTitle = "";
  var reviewDesc = "";

  const handleOpenReview = (restID, restName) => {
    setReviewRestInfo({
      restID: restID,
      restName: restName
    });
    setOpenReview(true);
  };

  const handleCloseReview = () => setOpenReview(false);

  const submitReview = () => {
    // console.log(reviewRating, reviewTitle, reviewDesc);
    
    // Submit to the server, and then alert if successful
    submitRestaurantReview(reviewRestInfo.restID, reviewRestInfo.restName,
      reviewRating, reviewTitle, reviewDesc)
      .then((response) => {
        // Close the review box
        setOpenReview(false);

        alert(response.api_msg);
      });
  };
  // ======= END OF MODAL CONTROLS - REVIEWS ==============================
  // HANDLE REMINDERS =====================================================================
  const [openReminder, setOpenReminder] = useState(false);
  const [reservationID, setReservationID] = useState("");
  const [mailToEmail, setCustEmail] = useState("");

  const handleOpenReminder = (crID, mailToEmail) => {
    setOpenReminder(true);
    setCustEmail(mailToEmail);
    setReservationID(crID)
  }

  // console.log(editedName);

  // HANDLES EDIT MENU DIALOG 
  const handleCloseReminder = () => {
    setOpenReminder(false);
  };

  // Handles when we edit the menu's name
  function sendReminder() {
    // VALIDATE THAT WE'RE NOT SENDING TO A BLANK EMAIL
    if (mailToEmail === "") {
      alert("Email cannot be blank! A valid Email Address!");
    }
    else {
      handleCloseReminder();
      handleBackdropOpen();

      // CONTROLLER HERE TO SEND THE EMAIL
      sendEmailReminder(reservationID, mailToEmail)
        .then((response) => {
          handleBackdropClose();
          if (response.api_msg === "success") {
            alert("Reminder sent to the stated email!");
          }
          else {
            alert("Something went wrong");
          }
        });
    }
  }

  // Backdrop useStates ======================================================================
  const [backdropState, setBackDropState] = useState(false);

  // Backdrop functions
  const handleBackdropClose = () => {
    setBackDropState(false);
  };

  const handleBackdropOpen = () => {
    setBackDropState(true);
  };

  //================================================================================================

  return <>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={backdropState}>
        <CircularProgress color="inherit" />
      </Backdrop>
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
                            <IconButton aria-label="info" onClick={() => handleOpenInfo(item.cr_restID)}>
                              <InfoOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Send Calendar Invite">
                            <IconButton aria-label="calendar" onClick={() => handleOpenReminder(item.crID, item.custEmail)}>
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
                          {
                            item.preOrderItems === "None" ? (<><Typography>No item has been pre-ordered</Typography></>) : 
                            <><ItemDetailsAcc itemDetails={item.preOrderItems} accTitle="Preorder Items Details"/></>
                          }
                        </Box>
                        {/* CONTAINER FOR BUTTONS */}
                        <Grid container sx={{mt:'50px'}}>
                          {/* <Grid item xs={12} sm={12} md={3}>
                            <Button color="inherit" variant="outlined">
                              Edit Reservation
                            </Button>
                          </Grid> */}
                          <Grid item xs={12} sm={12} md={12}>
                            <Button fullWidth color="error" variant="outlined" onClick={() => handleReservationOpen(item.crID)}>
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
              {/* PAST RESERVATION */}
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
                          <IconButton aria-label="info" onClick={() => handleOpenInfo(item.cr_restID)}>
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
                        {
                          item.preOrderItems === "None" ? (<><Typography>No item has been pre-ordered</Typography></>) : 
                          <><ItemDetailsAcc itemDetails={item.preOrderItems} accTitle="Preorder Items Details"/></>
                        }
                      </Box>
                      {/* CONTAINER FOR BUTTONS */}
                      <Grid container sx={{mt:'50px'}}>
                        {/* <Grid item xs={12} sm={12} md={3}>
                          <Button color="inherit" variant="outlined">
                            Edit Reservation
                          </Button>
                        </Grid> */}
                        <Grid item xs={12} sm={12} md={12}>
                          <Button fullWidth color="inherit" variant="outlined" onClick={(e) => {handleOpenReview(item.cr_restID, item.cr_restName)}}>Leave review</Button>
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
          <Modal open={openInfo} onClose={handleCloseInfo} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Card variant="outlined" sx={{ position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width:"600px",
              maxHeight:'70%',}}>
              <CardMedia
                component="img"
                height="140"
                image={restInfo.rest_banner}
              />
              <CardContent >
                <Box textAlign="center">
                  <Typography variant="h5">{restInfo.restaurant_name}</Typography>
                </Box>
                <Box display="flex" flexDirection="row" sx={{mt:'20px'}}>
                  <Box width='50%' padding="10px 20px">
                    <Typography variant="h6">
                      Address
                    </Typography>
                    <Typography variant="subtitle2">
                      {restInfo.rest_address_info}
                    </Typography>
                    <Typography variant="subtitle2">
                      S ({restInfo.rest_postal_code})
                    </Typography>
                    <Typography variant="h6" sx={{mt:'10px'}}>
                      Operating Hours
                    </Typography>
                    <Typography variant="subtitle2">
                      {restInfo.rest_op_hours}
                    </Typography>
                  </Box>
                  <Box alignContent="flex-end">
                  <img width="300px" height="200px" src={getMap(restInfo.rest_postal_code)}/>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Modal>
        {/* END OF INFO MODAL */}

        {/* REVIEW MODAL */}
        <Modal
          open={openReview}
          onClose={handleCloseReview}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Card variant="outlined" sx={{ position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width:"50%",
            maxHeight:'70%',}}>
            <CardContent >
              <Box textAlign="center" sx={{mb:'20px'}}>
                <Typography variant="h6">Let us know your experience</Typography>
                <Typography variant="subtitle1" sx={{fontSize:'1 0px', fontWeight:'bold', }}>Your reservation at </Typography>
                <Typography variant="subtitle1">{reviewRestInfo.restName}</Typography>
              </Box>
              
              <Divider variant="middle"/>

              <Box textAlign="center" width="60%" margin="10px auto" >
                <Typography  variant="subtitle1" sx={{fontSize:'1 0px', fontWeight:'bold', }}>How was the reservation?</Typography>
                <Typography sx={{mb:'20px'}}>
                  <Rating 
                    size="large"
                    onChange={(event) => {reviewRating = event.target.value}}  
                  />
                </Typography>

                <Typography variant="subtitle1"  sx={{fontSize:'1 0px', fontWeight:'bold', }}>Information about the review</Typography>
                <TextField  
                  fullWidth id="filled-basic" 
                  label="Title (Optional)" 
                  variant="filled" 
                  sx={{mb:'20px'}}
                  onChange={(event) => {reviewTitle = event.target.value}}
                />
                <TextField
                  fullWidth
                  id="filled-textarea"
                  label="Let us know more (Optional)"
                  placeholder="Placeholder"
                  multiline
                  variant="filled"
                  rows="3"
                  onChange={(event) => {reviewDesc = event.target.value}}
                />
              </Box>

              <Box textAlign="center" width="60%" margin="10px auto" >
                <Button variant="outlined" color="inherit" sx={{margin:'10px 10px'}} onClick={submitReview}>Submit</Button>
                <Button variant="outlined" color="error" sx={{margin:'10px 10px'}} onClick={handleCloseReview}>Cancel</Button>
              </Box>
            </CardContent>
          </Card>
        </Modal>
        {/* END OF REVIEW MODAL */}
        {/* DIALOG TO PROMPT CANCEL RESERVATION CONFIRMATION */}
        <Dialog open={openCancel} onClose={handleCancelClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">
            {"Cancel Reservation"}
          </DialogTitle>
          <DialogContent>
            <Typography sx={{textAlign: 'left', display:'inline-block'}}>
              Are you sure you want to cancel your reservation? Your reservation ID: {selectedResID}
            </Typography>
          </DialogContent>
          <DialogActions>
          <Button onClick={handleCancelReservation} variant="outlined" color="inherit">Confirm</Button>
          <Button onClick={handleCancelClose} variant="outlined" color="error">Cancel</Button>
          </DialogActions>
        </Dialog>
        {/* END OF CONFIRMATION PROMPT */}
        {/* DIALOG TO EDIT MENU */}
          <Dialog open={openReminder} onClose={handleCloseReminder} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
              {"Sending an Email Reminder"}
            </DialogTitle>
            <DialogContent>
              <Typography sx={{textAlign: 'left', display:'inline-block'}}>
                You are requesting for a reminder email, please enter your email below:
              </Typography>
              <DialogContentText id="alert-dialog-description">
              <TextField sx={{width:'90%', margin:'15px'}} 
                defaultValue={mailToEmail}
                id="filled-basic" 
                label="Email Address:" 
                variant="filled" 
                size="small"
                onChange={(e)=> setCustEmail(e.target.value)}
              />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={sendReminder}>Send Reminder Email</Button>
              <Button onClick={handleCloseReminder} >Cancel</Button>
            </DialogActions>
          </Dialog>
        {/* END OF REMINDER DIALOG */}
        
        </CardContent>
      </Card>
  </>
}
