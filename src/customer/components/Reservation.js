import React, {useEffect, useState} from 'react'
import { Accordion, AccordionSummary, AccordionDetails, 
  Box, Button, ButtonGroup, Card, CardContent, CardMedia, Checkbox, Divider, Drawer, 
  Grid,  IconButton, List, ListItem, Tooltip, Typography } from '@mui/material'
import { Rating } from '@mui/material'
import { ButtonBase } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ReviewsOutlinedIcon from '@mui/icons-material/ReviewsOutlined';
import { Modal } from '@mui/material'
import { format } from 'date-fns';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import { Route, Switch } from 'react-router';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useRouteMatch } from 'react-router'
import { retrieveAllRestaurantItems, retrieveSingleRestaurant, getAvailableSlots, 
  getBannerImage, getRestReviews, getAvailableRestCategories, submitCustReservation } from '../customer_controller'
import Cart from './Cart'
import { Link } from 'react-router-dom'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const steps = ['Select timeslot', 'Pre-order food', 'Review your reservation'];
const apiKey = "AIzaSyCZltDQ_C75D3csUGTpHRpfAJhZuPP2bqM"
const drawerWidth = 480;

export default function Reservation() {
  // Added MATCH - Thomas
  const match = useRouteMatch('/customer/makereservation/:id');
  const restID = match.params.id;

  // CONSTANT THEMES
  const themes = {
    textHeader: {
      fontSize:'1 0px', 
      fontWeight:'bold', 
      margin: '10px'
    },
    boxStyle:{
      margin: '50px auto 0px',
      width: '100%',
      textAlign:'center',
      borderRadius:'5px'
    },
    boxStyle2:{
      margin: '50px auto',
      width: '80%',
      textAlign:'center',
      borderRadius:'5px'
    }
  };

  const [innerAccOpen, setInnerAccOpen] = useState(false);
  // Essential states for the react component
  const [activeStep, setActiveStep] = useState(0);

  const [categories, setCategories] = useState([])
  const [restaurantItems, setRestaurantItems] = useState([])
  const [restaurantInfo, setRestaurantInfo] = useState('');
  const [restReivews, setRestReviews] = useState([]);
  const [rating, setRating] = useState(0)

  //useStates for all reservation use
  const [preorder, setPreoder] = useState(false);
  const [timeSlot, setTimeSlot] = useState('');
  const [pax, setPax] = useState(1);
  
  //SELECTED ITEM
  const [selItem, setSelItem] = useState([])

  // CALENDAR TESTING
  // NOTE: I changed the values a bit. You had value last time, then i put to selectedDate
  // I changed up wherever necessary already, hopefully its right! :D - Thomas
  const [selectedDate, setSelectedDate] = React.useState(new Date()); 
  const [availableSlots, setAvailableSlots] = useState([]);
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + 1);

  // Async function to retrieve all restaurant items
  async function getItems(){
    try {
      // CONTROLLER TO GET ALL THE RESTAURANT ITEMS
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
      // CONTROLLER TO GET A SINGLE RESTAURANT DATA BASED ON ID
      var response = await retrieveSingleRestaurant(restID);

      // Since response is the json object, we can use it to produce the blob
      // image url here, and then add to the json
      const imageURL = await getBannerImage(response.rest_banner_ID);

      response["rest_bannerURL"] = imageURL;
      console.log(response);
      return response;
    }
    catch (error) {
      return error;
    }
  }

  // Async function to retrieve single restaurant info
  async function getReviews() {
    try {
      // CONTROLLER TO GET THE REIVEWS FOR THAT RESTAURANT BASED ON ID
      const response = await getRestReviews(restID);

      // Since response is an array of JSON objects just return it
      return response;
    }
    catch (error) {
      return error;
    }
  }

  // RESERVATION THINGS - THOMAS
  // 1. Async function to communicate with the backend server
  async function getSlots(restID, selectedDate) {
    try {
      // CONTROLLER TO GET THE SLOTS DYNAMICALLY
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
    // FUNCTION TRIGGERS CONTROLLER
    getSlots(restID, selectedDate)
      .then((response) => {
        console.log(response);
        
        // Trying to set the timeSlots here
        setAvailableSlots(response);

        // Prints out the array to console
        console.log(availableSlots);
      })
  }


  //CART CALCULATION
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [gst, setGst] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  //CART OPEN
  const [cartOpen, setCartOpen] = useState(false);

  //HANDLE OPEN CART
  const openCart = () => {
    setCartOpen(true);
  };

  //HANDLE CART CHECKOUT
  const finishCart = () => {
    setCartOpen(false);
    setActiveStep(activeStep + 1)
  };

  //HANDLE CLOSE CART
  const closeCart = () => {
    setCartOpen(false);
  }

  function addItemPopup(){
    const newCart = [...realCart]
    const newArray = {
      itemID : selItem.itemID,
      itemName : selItem.itemName,
      itemPrice : selItem.itemPrice,
      itemQty : 1
    }
    const newItem = newCart.find(newItem => newItem.itemID === newArray.itemID)
    if (newItem === undefined)
    {
      setRealCart(oldArray => [...oldArray, newArray]);
      console.log('meow')
    }
    else
    {
      newItem.itemQty += newArray.itemQty
      setRealCart(newCart)
    }
    handleCloseItem()
    openCart()
  }

  //HANDLE NEXT FROM STEP 1
  function handleNext1(){
    if(timeSlot === '')
    {
      alert("Please select an timeslot.")
    }
    else
    {
      setActiveStep(activeStep + 1)
    }
  }

  //HANDLE ADD
  function addQty(id){
    const newCart = [...realCart]
    const newItem = newCart.find(newItem => newItem.itemID === id)
    newItem.itemQty += 1
    setRealCart(newCart)
  }

  function minusQty(id){
    const newCart = [...realCart]
    const newItem = newCart.find(newItem => newItem.itemID === id)
    newItem.itemQty -= 1
    setRealCart(newCart)
  }

  function deleteItem(id){
    const newCart = realCart.filter(item => item.itemID !== id)
    setRealCart(newCart)
  }

  //CART CALCULATIONS
  //ITEM UNIT PRICE * QTY
  function getsub(item){
    const sub = item.itemQty*item.itemPrice;
    // setSubtotal(subtotal + sub)
    return sub.toFixed(2);
  }

  //USE EFFECT TO SET THE CART DETAILS
  //WILL RUN WHEN STATE IS RERENDERED
  // useEffect(() => {
  //   const subtotal2 = realCart.reduce((total, realCart) => total + (realCart.itemPrice * realCart.itemQty), 0)
  //   setSubtotal(subtotal2)
  //   setDeliveryFee(3.50)
  //   const gst = (subtotal2 + deliveryFee) * 0.07
  //   setGst(gst)
  //   setTotal(gst + deliveryFee + subtotal)
  // })

  //CART
  const [realCart, setRealCart]= useState([]);

  // ASYNC FUNCTION TO SUBMIT RESERVATION
  async function submitReservation() {
    // 1. Generate a CR order ID
    const crID = `CR_${restID.padStart(4, '0')}_${Date.now()}`;

    // 2. Then we get some important variables
    // const restEmail = restaurantInfo.rest_email;
    // const restName = restaurantInfo.restaurant_name;
    // const restAdd = restaurantInfo.rest_address_info;
    // const restPostal = restaurantInfo.rest_postal_code;

    // 3. We now try to make the reservation to the system
    try {
      const response = await submitCustReservation(crID, restaurantInfo, pax, selectedDate, timeSlot, 
        preorder, realCart, subtotal);

      console.log(response);
    }
    catch (err) {
      // console.log(err);
    }
  }

  // Do we need useEffect for this? Not sure if I could just load the damn thing
  // into states. Had a lot of issues of the Array not filtering
  useEffect(() => {
    // Getting the restaurant's items and their categories
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

    // Getting the restaurant's information
    getRestInfo()
      .then((response) => {
        setRestaurantInfo(response);
        if(response.rest_rating !== null)
        {
          setRating(response.rest_rating.toFixed(1))
        }
      })
  }, []);

  
  //HANDLE ITEM INFO
  function itemPopup(item){
    setSelItem(item)
    handleOpenItem()
  }

  //MODAL CONTROLS - DIRECTIONS / INFO
  const [openItem, setOpenItem] = useState(false);
  const handleOpenItem = () => setOpenItem(true);
  const handleCloseItem = () => setOpenItem(false);

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

  // CALENDAR TESTING
  // const [value, setValue] = React.useState(new Date());
  // const startDate = new Date();
  // startDate.setDate(startDate.getDate() + 1);

  // GETTING THE STATIC MAP
  function getMap(postal){
    const maplink = `http://maps.google.com/maps/api/staticmap?center=${postal}&zoom=17&size=400x300&maptype=roadmap&key=${apiKey}&region=SG&markers=color:red%7C${postal}&scale=2`;
    return maplink;
  }

  // LOADING PAGE
  return (
    <Switch>
      <Route exact path='/customer/makereservation/:id'>
      {activeStep === 1 && <Cart openCart={openCart} cart={realCart}/>}
      <Card variant="outlined" sx={{ borderRadius:'10px'}}>
        <CardMedia sx={{height:'300px' }}
          component="img"
          image={restaurantInfo.rest_bannerURL}
        />

        <CardContent >
          <Box sx={{width: "80%", margin: '10px auto'}}> 
            {/* HEADER BOX - REST DETAILS HERE */}
            <Box display="flex" flexDirection="row">
              <Box width="55%">
                <Typography variant="h4"  sx={{}}>
                  {restaurantInfo.restaurant_name}
                </Typography>
                <Box>{restaurantInfo.rest_tag_1} . {restaurantInfo.rest_tag_2} . {restaurantInfo.rest_tag_3} </Box>
                <Typography sx={{fontSize:'small', padding:'10px 0px'}}>
                {rating === 0 ? <Box>No ratings yet</Box> : <Box> <Rating name="read-only" value={rating} readOnly size='small' precision={0.1}/> {rating} / 5</Box>}
                </Typography>
              </Box>
              
              <Box width='45%' textAlign='right' >
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
            <Box textAlign="center">
              
            <Typography variant="h6">Reserving table at</Typography>
            <Typography variant="subtitle1">{restaurantInfo.restaurant_name}</Typography>
            <Stepper activeStep={activeStep} alternativeLabel sx={{margin:'30px auto'}}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                // if (isStepOptional(index)) {
                //   labelProps.optional = (
                //     <Typography variant="caption">Optional</Typography>
                //   );
                // }
                // if (isStepSkipped(index)) {
                //   stepProps.completed = false;
                // }
                return (
                  <Step key={label} {...stepProps}> 
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            </Box>
            
            {activeStep === steps.length ? (
              <React.Fragment>
                <Box sx={themes.boxStyle2}>
                <Typography sx={themes.textHeader}>
                  Reservation Confirmed!
                </Typography>
                </Box>
                <Box sx={{ display: 'flex', pt: 2 }}>
                  <Button variant="outlined" color="inherit" fontSize="large" sx={{margin:'10px auto'}}>View reservations</Button>
                </Box>
              </React.Fragment>
            ) : activeStep === 0 ? (
              <>
              <Typography textAlign="center" variant="h6">Select date and timeslot</Typography>
              <Box textAlign="center" display="flex" flexDirection="row" sx={{mt:'10px', mb:'10px'}}>
                <Box textAlign="center" sx={{width:'40%'}}>
                  <Typography variant="subtitle1"  sx={{fontSize:'1 0px', fontWeight:'bold', mt:'10px' }}>Date</Typography>
                  <Typography variant="subtitle1">{format(selectedDate, 'dd MMMM yyyy')}</Typography>
                </Box>
                <Box textAlign="center" sx={{width:'40%'}}>
                  <Typography variant="subtitle1"  sx={{fontSize:'1 0px', fontWeight:'bold', mt:'10px' }}>Timeslot</Typography>
                  <Typography variant="subtitle1">{timeSlot}</Typography>
                </Box>
                <Box textAlign="center" sx={{width:'40%'}}>
                  
                  <Typography variant="subtitle1"  sx={{fontSize:'1 0px', fontWeight:'bold', mt:'10px' }}>Number of pax</Typography>
                  <Typography variant="subtitle1">
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="pax-label">Pax</InputLabel>
                    <Select
                      labelId="pax-label"
                      id="pax-select"
                      value={pax}
                      label="Pax"
                      size="small"
                      onChange={(e)=>setPax(e.target.value)}
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                      <MenuItem value={6}>6</MenuItem>
                    </Select>
                  </FormControl>
                  </Typography>
                </Box>
              </Box>
              <Grid container>
              <Grid item md={6} sm={12} xs={12} sx={{ width:'30px'}}>
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
            <Box sx={{ display: 'flex', flexDirection: 'row'}}>
              <Button
                color="inherit"
                //onClick={handleBack}
                component ={Link}
                to={`/customer/restaurantdetails/${restID}`}
                sx={{ mr: 1 }}
                variant="outlined"
              >
                Back to restaurant
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />

              <Button variant="outlined" color="inherit" onClick={handleNext1}>
                Next
              </Button>
            </Box>
            </>) : activeStep === 1 ? (
            <>
              <Box textAlign="center" sx={{mt:'20px', mb:'10px'}}>
                <Typography>Would you like to pre-order meal? 
                  <Checkbox inputProps={{ 'aria-label': 'controlled' }} checked={preorder} onChange={(e) => setPreoder(e.target.checked)} color="default" />
                </Typography>
                
              </Box>
              {/* MENU BOX - CONTAINER FOR EACH MENU OFFERED BY THE REST */}
              {preorder && <Box sx={{paddingBottom:'20px'}}>
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
                          <ButtonBase onClick={()=>{itemPopup(item)}} sx={{display:'block', textAlign:'initial', width:'100%'}}>
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
              </Box>}

              <Box sx={{ display: 'flex', flexDirection: 'row'}}>
              <Button
                color="inherit"
                onClick={()=> setActiveStep(activeStep - 1)}
                sx={{ mr: 1 }}
                variant="outlined"
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />

              <Button variant="outlined" color="inherit" onClick={()=> setActiveStep(activeStep + 1)}>
                Next
              </Button>
              </Box>
              {/* END OF MENU BOX */}
            </>): (
            <>
              <Typography textAlign="center" variant="h6">Review your reservation</Typography>
              <Box textAlign="center" display="flex" flexDirection="row" sx={{mt:'10px', mb:'10px'}}>
                <Box textAlign="center" sx={{width:'40%'}}>
                  <Typography variant="subtitle1"  sx={{fontSize:'1 0px', fontWeight:'bold', mt:'10px' }}>Date</Typography>
                  <Typography variant="subtitle1">{format(selectedDate, 'dd MMMM yyyy')}</Typography>
                </Box>
                <Box textAlign="center" sx={{width:'40%'}}>
                  <Typography variant="subtitle1"  sx={{fontSize:'1 0px', fontWeight:'bold', mt:'10px' }}>Timeslot</Typography>
                  <Typography variant="subtitle1">{timeSlot}</Typography>
                </Box>
                <Box textAlign="center" sx={{width:'40%'}}>
                  <Typography variant="subtitle1"  sx={{fontSize:'1 0px', fontWeight:'bold', mt:'10px' }}>Number of pax</Typography>
                  <Typography variant="subtitle1">{pax}</Typography>
                </Box>
              </Box>   
              {!preorder && <Box sx={{textAlign:'center', mt:'40px'}}><Typography>No item has been pre-ordered</Typography></Box>}
              {(preorder && realCart === '') && <Box sx={{textAlign:'center', mt:'40px'}}><Typography>No item has been pre-ordered</Typography></Box>}

              {(preorder && realCart !== '') && <Box sx={{textAlign:'center', mt:'40px'}}>
              <Accordion sx={{border:'1px solid #eeeeee', mt:'20px'}} expanded={innerAccOpen} >
              {/* HEADER OF ACCORDION */}
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="item-details"
                id="item-details"
                sx={{borderBottom:'0.5px solid #eeeeee'}}
                onClick={()=>{setInnerAccOpen(!innerAccOpen)}}
              >
                <Typography sx={{fontSize:'1 0px', fontWeight:'bold', }}>
                  Item Details
                </Typography>
              </AccordionSummary>
              {/* INNDER ACCORDION */}
              <AccordionDetails>
                {realCart.map(item => (
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
            </Accordion></Box>}

              <Box sx={{ display: 'flex', flexDirection: 'row', mt:'30px'}}>
              <Button
                color="inherit"
                onClick={()=> setActiveStep(activeStep - 1)}
                sx={{ mr: 1 }}
                variant="outlined"
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />

              <Button variant="outlined" color="inherit" onClick={() => {
                setActiveStep(activeStep + 1);
                submitReservation();
              }}>
                Confirm Reservation
              </Button>
              </Box>
            </>)}

            {/* ITEM INFO MODAL */}
            <Modal
              open={openItem}
              onClose={handleCloseItem}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Card variant="outlined" sx={{ position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width:"50%",
                maxHeight:'70%',}}>
                
                <CardContent align>
                  <Box display="flex" flexDirection="row">
                    <Box width="60%" textAlign="center">
                      <img src={selItem.itemImage} alt="food" height='300px'/>
                    </Box>
                    <Box width="40%">
                      <Typography sx={{mt:'20px'}} variant="h5">{selItem.itemName}</Typography>
                      <Typography variant="subtitle1" sx={{fontSize:'1 0px', fontWeight:'bold', mt:'10px' }}>Description</Typography>
                      <Typography variant="subtitle1">{selItem.itemDesc}</Typography>
                      <Typography variant="subtitle1" sx={{fontSize:'1 0px', fontWeight:'bold', mt:'10px' }}>Price</Typography>
                      <Typography variant="subtitle1">S$ {selItem.itemPrice}</Typography>
                      <Typography variant="subtitle1" sx={{fontSize:'1 0px', fontWeight:'bold', mt:'10px' }}>Allergic Warning</Typography>
                      <Typography variant="subtitle1">{selItem.itemAllergen}</Typography>
                    </Box>
                  </Box>

                  <Box textAlign="center" marginTop="20px">
                    <Button fullWidth variant="outlined" color="inherit"  onClick={()=> addItemPopup()}>Add to Cart</Button>
                  </Box>
                </CardContent>
              </Card>
            </Modal>
            {/* END OF ITEM INFO MODAL */}

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
                    <Box>{restaurantInfo.rest_tag_1} . {restaurantInfo.rest_tag_2} . {restaurantInfo.rest_tag_3} </Box>
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
                    <img width="300px" height="200px" alt="googlemap" src={getMap(restaurantInfo.rest_postal_code)}/>
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
            
            {/* CART DRAWER */}
            <Drawer
              anchor="right"
              open={cartOpen}
              onClose={closeCart}
            >
              <Box sx={{width: drawerWidth}}>
                <List>
                  <ListItem >
                    <Typography variant="h5" sx={{margin:'30px auto 0px'}}>
                      Your cart
                    </Typography>
                  </ListItem>
                  <ListItem >
                    <Typography variant="subtitle2" sx={{margin:'0px auto'}}>
                      Pre-ordering from: {restaurantInfo.restaurant_name}
                    </Typography>
                  </ListItem>
                  <Divider variant='middle' />

                  {realCart.map(item => (
                    <ListItem key={item.id} sx={{margin:'20px auto'}}>
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
                            <ButtonGroup color="inherit" size="small">
                              {item.itemQty === 1 ? <Button onClick={() => deleteItem(item.itemID)}><DeleteOutlineOutlinedIcon fontSize="small" variant="" /></Button> : <Button onClick={()=> minusQty(item.itemID)}>-</Button>}
                              <Button >{item.itemQty}</Button>
                              <Button onClick={()=>addQty(item.itemID)}>+</Button>
                            </ButtonGroup>
                          </Typography>
                          <Typography variant="subtitle2">
                            Price: S${getsub(item)}
                          </Typography>
                        </Box>
                    </ListItem>
                  ))}

                  <Divider variant='middle' />

                  <ListItem >
                    <Box width='70%' sx={{fontWeight:'800'}}>
                      <Typography variant="subtitle">
                        Subtotal
                      </Typography>
                    </Box>
                    <Box width="30%" sx={{textAlign:'right',fontWeight:'800'}}>
                      <Typography variant="subtitle" >
                        S$ {subtotal.toFixed(2)}
                      </Typography>
                    </Box>
                  </ListItem>
                  <ListItem >
                    <Box sx={{width:'70%', margin:'20px auto'}}  textAlign="center">
                      <Typography variant="subtitle">
                        Total is subject to change during actual restaurant visit
                      </Typography>
                    </Box>
                  </ListItem>
                  {/* <ListItem >
                    <Box width='70%'>
                      <Typography variant="subtitle">
                        Delivery fee
                      </Typography>
                    </Box>
                    <Box width="30%" sx={{textAlign:'right'}}>
                      <Typography variant="subtitle">
                        S$ {deliveryFee.toFixed(2)}
                      </Typography>
                    </Box>
                  </ListItem>
                  <ListItem >
                    <Box width='70%'>
                      <Typography variant="subtitle">
                        GST (7%)
                      </Typography>
                    </Box>
                    <Box width="30%" sx={{textAlign:'right'}}>
                      <Typography variant="subtitle">
                        S$ {gst.toFixed(2)}
                      </Typography>
                    </Box>
                  </ListItem>
                  <ListItem >
                    <Box width='70%'>
                      <Typography variant="subtitle" sx={{fontWeight:'800'}}>
                        Grand total
                      </Typography>
                    </Box>
                    <Box width="30%" sx={{textAlign:'right'}}>
                      <Typography variant="subtitle" sx={{fontWeight:'800'}}>
                        S$ {total.toFixed(2)}
                      </Typography>
                    </Box>
                  </ListItem> */}
                  <ListItem >
                    <Button sx={{width:'90%', margin:'10px auto'}} variant="outlined" color="inherit" onClick={finishCart}> go to checkout</Button>
                  </ListItem>
                </List>
              </Box>
            </Drawer>
            {/* END OF DRAWER */}

          </Box>
        </CardContent>
      </Card>
      </Route>
    </Switch>
      
  )
}
