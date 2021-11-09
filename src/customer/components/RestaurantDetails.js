import React, { useEffect, useState } from 'react'
import { Card, CardContent, Box, CardMedia, Typography, Divider, Grid, Button, IconButton, Tooltip } from '@mui/material'
import { ButtonBase, Modal, Rating } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ReviewsOutlinedIcon from '@mui/icons-material/ReviewsOutlined';
import { format } from 'date-fns';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import { useRouteMatch } from 'react-router'
import { Link } from 'react-router-dom'
import Checkbox from '@mui/material/Checkbox';
import { retrieveAllRestaurantItems, retrieveSingleRestaurant, 
  getAvailableSlots, getRestReviews, getAvailableRestCategories } from '../customer_controller'

const apiKey = "AIzaSyCZltDQ_C75D3csUGTpHRpfAJhZuPP2bqM"

export default function RetaurantDetails() {
  console.log("restaurant details reloaded");
  // Added MATCH - Thomas
  const match = useRouteMatch('/customer/restaurantdetails/:id');
  const restID = match.params.id;

  // useStates for setting all the variables
  const [categories, setCategories] = useState([])
  const [restaurantItems, setRestaurantItems] = useState([])
  const [restaurantInfo, setRestaurantInfo] = useState([]);
  const [restReivews, setRestReviews] = useState([]);
  console.log(restReivews);
  const [rating, setRating] = useState(0);
  
  //useStates for all reservation use
  const [preorder, setPreoder] = useState(false);
  const [timeSlot, setTimeSlot] = useState('');
  const [resStep, setResStep] = useState(1);

  // Async function to retrieve all restaurant items
  async function getItems(){
    try {
      const response = await retrieveAllRestaurantItems(restID);

      return response;
    }
    catch (error) {
      return error;
    }
  }

  // Async function to retrieve single restaurant info
  async function getRestInfo() {
    try {
      const response = await retrieveSingleRestaurant(restID);

      return response;
    }
    catch (error) {
      return error;
    }
  }

  // Async function to retrieve single restaurant info
  async function getReviews() {
    try {
      const response = await getRestReviews(restID);

      // Since response is an array of JSON objects just return it
      return response;
    }
    catch (error) {
      return error;
    }
  }

  // Do we need useEffect for this? Not sure if I could just load the damn thing
  // into states. Had a lot of issues of the Array not filtering
  useEffect(() => {
    // Async function trigger to parse data and get the items and its picture
    getItems()
      .then((response) => {
        console.log(response);
        setRestaurantItems(response);
      })
    
    getAvailableRestCategories(restID)
      .then((response) => {
        setCategories(response);
      })
      .catch(err => console.log(err));
    // ===========================================================================
    // Get Restaurant Information
    getRestInfo()
      .then((response) => {
        setRestaurantInfo(response);
        
        if(response.rest_rating !== null)
        {
          setRating(response.rest_rating.toFixed(1))
        }
        // Console log to see if the info has been set properly
        console.log(restaurantInfo);
      });
    // ===========================================================================
  }, []);

  //MODAL CONTROLS - DIRECTIONS / INFO
  const [openInfo, setOpenInfo] = useState(false);
  const handleOpenInfo = () => setOpenInfo(true);
  const handleCloseInfo = () => setOpenInfo(false);

  //MODAL CONTROLS - REVIEWS
  const [openReview, setOpenReview] = useState(false);

  const handleOpenReview = () => {
    getReviews()
      .then((response) => {
        console.log(response);

        setRestReviews(response);
        
        console.log(restReivews);
      })
      .then(() => {
        setOpenReview(true);
      });     
  };

  const handleCloseReview = () => setOpenReview(false);

  //MODAL CONTROLS - REVIEWS
  const [openReserve, setOpenReserve] = useState(false);
  const handleOpenReserve= () => setOpenReserve(true);
  const handleCloseReserve = () => setOpenReserve(false);

  // CALENDAR TESTING
  // NOTE: I changed the values a bit. You had value last time, then i put to selectedDate
  // I changed up wherever necessary already, hopefully its right! :D - Thomas
  const [selectedDate, setSelectedDate] = React.useState(new Date()); 
  const [availableSlots, setAvailableSlots] = useState([]);
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + 1);

  // RESERVATION THINGS - THOMAS
  // 1. Async function to communicate with the backend server
  async function getSlots(restID, selectedDate) {
    try {
      const timeSlots = await getAvailableSlots(restID, selectedDate);

      return timeSlots;
    }
    catch (error) {
      return error;
    }
  }

  // 2. Function to trigger to backend
  // NOTE: The following triggers the getting of the available slots, which is how 
  // we can use the array
  function triggerGetSlots (restID, selectedDate) {
    getSlots(restID, selectedDate)
      .then((response) => {
        console.log(response);
        
        // Trying to set the timeSlots here
        setAvailableSlots(response);

        // Prints out the array to console
        console.log(availableSlots);
      })
  }

  // 3. useEffect to set the slots first on load
  // useEffect(() => {
  //   triggerGetSlots (restID, selectedDate);
    
  //   // Prints out the array to console
  //   // console.log(availableSlots);
  // }, [])
  // availableSlots.map((slot) => console.log(slot));

  // FOOTNOTE: If any of the numbers for the functions are missing (like there should be 1 to 4, 
  // so if you see 1, 2, 4 there might be a missing function), lemme know! 
  // MORE FOOTNOTE: Please take note that I'm just trying to return you the slots for now and
  // trying to see if my concept works! I estimate about 3 to 4 hours to setup the tables backend
  // and work out how to verify and return the dynamic data from the database! Will let you know
  // how it goes! - Thomas :D (as of 28/10 10:32 AM)
  // ===========================================================================================

  function getMap(postal){
    const maplink = `http://maps.google.com/maps/api/staticmap?center=${postal}&zoom=17&size=400x300&maptype=roadmap&key=${apiKey}&region=SG&markers=color:red%7C${postal}&scale=2`;
    return maplink;
  }

  return (
      <Card variant="outlined" sx={{ borderRadius:'10px'}}>
        <CardMedia sx={{height:'300px' }}
          component="img"
          image={restaurantInfo.rest_banner}
        />

        <CardContent >
          <Box sx={{width: "80%", margin: '10px auto'}}> 
            {/* HEADER BOX - REST DETAILS HERE */}
            <Box display="flex" flexDirection="row">
              <Box width="65%">
                <Typography variant="h4"  sx={{}}>
                  {restaurantInfo.restaurant_name} 
                </Typography>
                <Box>{restaurantInfo.rest_tag_1} . {restaurantInfo.rest_tag_2} . {restaurantInfo.rest_tag_3} </Box>
                  <Typography sx={{fontSize:'small', padding:'10px 0px'}}>
                     {rating === 0 ? <Box>No ratings yet</Box> : <Box> <Rating name="read-only" value={rating} readOnly size='small' precision={0.1}/> {rating} / 5</Box>}
                  </Typography>
              </Box>
              
              <Box width='35%' textAlign='right' >
                <Box Box width='100%' >
                    <Button variant="outlined" color="inherit" component={ Link } to={`/customer/orderdelivery/${restID}`}>ORDER Delivery</Button>
                    <Button variant="outlined" color="inherit" component={ Link } to={`/customer/makereservation/${restID}`} sx={{marginLeft:'20px'}} 
                    // onClick={handleOpenReserve}
                    >Reserve Table</Button>
                </Box>
                <Box width='100%' alignSelf="flex-end" sx={{mt:'3px'}} >
                  <Typography>
                  <Tooltip title="Information">
                    <IconButton sx={{margin:'0px 5px 5px' }} onClick={handleOpenInfo}>
                      <InfoOutlinedIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Reviews">
                    <IconButton sx={{margin:'0px 5px 5px'}} onClick={handleOpenReview}>
                      <ReviewsOutlinedIcon/>
                    </IconButton>
                  </Tooltip>
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Divider/>

            <Box sx={{width:'100%', textAlign:'center', mt:'20px', mb:'10px'}}> <Typography variant="h6">Restaurant Details</Typography></Box>
            <Card variant="outlined" sx={{ 
                width:"80%",
                maxHeight:'70%',
                margin:'0px auto',
                mb:'30px'}}>
                <CardContent >
                  <Box display="flex" flexDirection="row" sx={{mt:'20px'}}>
                    <Box width='50%' padding="10px 20px">
                      <Typography variant="h6">
                        Address
                      </Typography>
                      <Typography variant="subtitle2">
                        {restaurantInfo.rest_address_info}
                      </Typography>
                      <Typography variant="subtitle2">
                        S ({restaurantInfo.rest_postal_code})
                      </Typography>
                      <Typography variant="h6" sx={{mt:'10px'}}>
                        Operating Hours
                      </Typography>
                      <Typography variant="subtitle2">
                        {restaurantInfo.rest_op_hours}
                      </Typography>
                    </Box>
                    <Box alignContent="flex-end">
                    <img width="300px" height="200px" src={getMap(restaurantInfo.rest_postal_code)} alt="unable to get map"/>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              <Divider variant="middle" />

            
            {/* MENU BOX - CONTAINER FOR EACH MENU OFFERED BY THE REST */}
            
            <Box sx={{paddingBottom:'20px'}}>
              {
                categories.map((category) =>{
                  return <>
                  {/* HEADER */}
                  <Typography variant="h5" sx={{padding:'20px 0px'}}>
                    {category}
                  </Typography>
                  {/* END OF HEADER */}
                  <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 12, md: 12 }} direction="row" justify="flex-start" alignItems="flex-start">
                    {
                      restaurantItems.map(item =>{
                        if (item.itemCategory === category)
                        return <>
                          <Grid item xs={12} sm={12} md={6}>
                          <ButtonBase sx={{display:'block', textAlign:'initial', width:'100%'}}>
                          <Card sx={{ display: 'flex', width:'100%', height:'130px'}}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', width:'80%'}}>
                            <CardContent sx={{ flex: '1 0 auto'}}>
                              <Typography component="div" variant="h6">
                                {item.itemName}
                              </Typography>
                              <Typography variant="subtitle2" color="text.secondary" component="div">
                                {item.itemDesc}
                              </Typography>
                              <Typography variant="subtitle1">
                              Price: $ {item.itemPrice.toFixed(2)}
                              </Typography>
                            </CardContent>
                            </Box>
                            <CardMedia
                              component="img"
                              sx={{ width: 151, margin:'1%'}}
                              image={item.itemImage}
                              alt="fooditemname"
                            />
                          </Card>
                          </ButtonBase>
                          </Grid>
                      </>
                      })
                    }
                    
                  </Grid>
                  </>
                })
              }

            </Box>

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
                  image={restaurantInfo.rest_bannerURL}
                />
                <CardContent >
                  <Box textAlign="center">
                    <Typography variant="h5">{restaurantInfo.restaurant_name}</Typography>
                    <Typography variant="subtitle2">Tags</Typography>
                  </Box>
                  <Box display="flex" flexDirection="row" sx={{mt:'20px'}}>
                    <Box width='50%' padding="10px 20px">
                      <Typography variant="h6">
                        Address
                      </Typography>
                      <Typography variant="subtitle2">
                        {restaurantInfo.rest_address_info}
                      </Typography>
                      <Typography variant="subtitle2">
                        S ({restaurantInfo.rest_postal_code})
                      </Typography>
                      <Typography variant="h6" sx={{mt:'10px'}}>
                        Operating Hours
                      </Typography>
                      <Typography variant="subtitle2">
                        {restaurantInfo.rest_op_hours}
                      </Typography>
                    </Box>
                    <Box alignContent="flex-end">
                    <img width="300px" height="200px" src={getMap(restaurantInfo.rest_postal_code)} alt="Unable to get map"/>
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
                overflow: "auto",
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width:"50%",
                maxHeight:'70%',}}>
                <CardMedia
                  component="img"
                  height="140"
                  image={restaurantInfo.rest_bannerURL}
                />
                <CardContent >
                  <Box textAlign="center">
                    <Typography variant="h5">{restaurantInfo.restaurant_name}</Typography>
                    <Typography variant="subtitle2">Reviews</Typography>
                  </Box>

                  {restReivews.map((review) => { return <>
                    <Box display="flex" flexDirection="column" width="60%" height="100px" border="1px solid black" margin="10px auto" padding="20px">
                      <Typography variant="h6">{review.title === "NIL" ? "No title :(" : review.title}</Typography>
                      <Typography><Rating value={review.rating} size="small"/></Typography>
                      <Typography variant="subtitle2">{review.desc === "NIL" ? "No review text :(" : review.desc}</Typography>
                      
                      <Typography variant="subtitle" fontSize="12px" alignSelf='flex-end'>Reviewed by: {review.custName}</Typography>
                    </Box>
                    </>
                  })}

                </CardContent>
              </Card>
            </Modal>
            {/* END OF REVIEW MODAL */}

            {/* RESERVATION MODAL */}
            <Modal
              open={openReserve}
              onClose={handleCloseReserve}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Card variant="outlined" sx={{ position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width:"50%",
                maxHeight:'70%',
                overflow:'auto'}}>
                <CardMedia
                  component="img"
                  height="140"
                  image={restaurantInfo.rest_bannerURL}
                />
                <CardContent >
                  <Box textAlign="center">
                    <Typography variant="h5">{restaurantInfo.restaurant_name}</Typography>
                    <Typography variant="subtitle2">Select date / timeslot</Typography>
                  </Box>
                  <Box textAlign="center" sx={{mt:'20px', mb:'10px'}}>
                  <Typography variant="h6">You have selected</Typography>
                  <Typography variant="subtitle1">{format(selectedDate, 'dd MMMM yyyy')}</Typography>
                  <Typography variant="subtitle1">{timeSlot}</Typography>
                  </Box>
                  
                  <Divider variant="middle"/>
                  {
                  resStep === 1 ? (<>
                  <Grid container>
                    <Grid item md={6} sm={12} xs={12} sx={{mt:'15px', minWidth:'300px'}}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <StaticDatePicker
                          openTo="day"
                          showToolbar={false}
                          orientation="landscape"
                          minDate={startDate}
                          value={selectedDate}
                          onChange={(selectedNewDate) => {
                            setSelectedDate(selectedNewDate);
                            triggerGetSlots(restID, selectedNewDate);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item md={6} sm={12} xs={12} sx={{mt:'15px'}}>
                      <Box sx={{m:'20px auto', width:'100%'}}>
                        Slots
                        <Grid container>
                          {/* Was just using this to test to see if the useEffect (reference item 3 function above) 
                          to trigger the slot getting on load is needed. Perhaps its not? This version currently
                          no useEffect. Anws now must think of how to translate the info into values, like button
                          click then set the selected slot or something? */}
                          {
                            availableSlots.map((slot) => {
                              if (slot.available === true) {
                                return <Grid item md={3} sm={4} xs={6} sx={{mt:'15px'}}>
                                  <Button color="inherit" variant='contained' onClick={()=>setTimeSlot(slot.timeslot)} >{slot.timeslot}</Button>
                                </Grid>
                              }
                              else {
                                return <Grid item md={3} sm={4} xs={6} sx={{mt:'15px'}}>
                                  <Button color="inherit" disabled variant='contained' >{slot.timeslot}</Button>
                                </Grid>
                              }
                            })
                          }
                        </Grid>
                      </Box>
                    </Grid>

                  </Grid>

                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2}}>
                    <Button color="inherit" sx={{ mr: 1 }} variant="outlined">Cancel</Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button color="inherit" variant="outlined" onClick={()=>setResStep(resStep + 1)}> NEXT</Button>
                  </Box>
                  </>) : (<>
                  <Box textAlign="center" sx={{mt:'20px', mb:'10px'}}>
                    <Typography>Would you like to pre-order meal?</Typography>
                    
                    <Checkbox inputProps={{ 'aria-label': 'controlled' }} checked={preorder} onChange={(e) => setPreoder(e.target.checked)} color="default" />
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2}}>
                    <Button color="inherit" sx={{ mr: 1 }} variant="outlined" onClick={()=> setResStep(resStep - 1)}>Back</Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button color="inherit" variant="outlined" onClick={()=>setResStep(resStep + 1)}> Finish</Button>
                  </Box>
                  </>)

                  }
                  
                </CardContent>
              </Card>
            </Modal>
            {/* END OF RESERVATION MODAL */}

          </Box>
        </CardContent>
      </Card>
  )
}
