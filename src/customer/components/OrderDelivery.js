import React, {useEffect, useState} from 'react'
import { Card, CardContent, Box, CardMedia, Typography, Divider, Grid, Button, IconButton, Tooltip, Drawer, List,
  ListItem, ButtonGroup } from '@mui/material'
import { Rating } from '@mui/material'
import { ButtonBase } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ReviewsOutlinedIcon from '@mui/icons-material/ReviewsOutlined';
import { Modal } from '@mui/material'
import { Route, Switch } from 'react-router';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useRouteMatch } from 'react-router'
import { retrieveAllRestaurantItems, retrieveSingleRestaurant, getRestReviews, getAvailableRestCategories } from '../customer_controller'
import Cart from './Cart'
import CheckOut from './CheckOut';
import { Link } from 'react-router-dom'

const apiKey = "AIzaSyCZltDQ_C75D3csUGTpHRpfAJhZuPP2bqM"
const drawerWidth = 480;
export default function OrderDelivery() {
  // Added MATCH - Thomas
  const match = useRouteMatch('/customer/orderdelivery/:id');
  const restID = match.params.id;

  const [categories, setCategories] = useState([])
  const [restaurantItems, setRestaurantItems] = useState([])
  const [restaurantInfo, setRestaurantInfo] = useState('');
  const [restReivews, setRestReviews] = useState([]);
  const [rating, setRating] = useState(0)

  //SELECTED ITEM
  const [selItem, setSelItem] = useState([])

  useEffect(() => {
    // CONTROLLER TO GET ALL RESTAURANT ITEMS
    retrieveAllRestaurantItems(restID)
      .then((response) => {
        console.log(response);
        setRestaurantItems(response);
      })
    
    getAvailableRestCategories(restID)
      .then((response) => {
        setCategories(response);
      })
      .catch(err => console.log(err));

    // CONTROLLER TO GET SINGLE RESTAURANT DATA
    retrieveSingleRestaurant(restID)
      .then((response) => {
        setRestaurantInfo(response);
        if(response.rest_rating !== null)
        {
          setRating(response.rest_rating.toFixed(1))
        }
      })

    // Console log to see if the info has been set properly
    console.log(restaurantInfo);  
  }, []);

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


  // CART CALCULATIONS
  // ITEM UNIT PRICE * QTY
  function getsub(item){
    const sub = item.itemQty*item.itemPrice;
    // setSubtotal(subtotal + sub)
    return sub.toFixed(2);
  }

  // USE EFFECT TO SET THE CART DETAILS
  // WILL RUN WHEN STATE IS RERENDERED
  // CART
  const [realCart, setRealCart]= useState([])

  useEffect(() => {
    const subtotal2 = realCart.reduce((total, realCart) => total + (realCart.itemPrice * realCart.itemQty), 0)
    setSubtotal(subtotal2)
    setDeliveryFee(3.50)
    const gst = (subtotal2 + deliveryFee) * 0.07
    setGst(gst)
    setTotal(gst + deliveryFee + subtotal)
  }, [realCart, deliveryFee, subtotal])
  
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
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + 1);

  function getMap(postal){
    const maplink = `http://maps.google.com/maps/api/staticmap?center=${postal}&zoom=17&size=400x300&maptype=roadmap&key=${apiKey}&region=SG&markers=color:red%7C${postal}&scale=2`;
    return maplink;
  }
  return (
    <Switch>
      <Route exact path='/customer/orderdelivery/:id'>
      <Cart openCart={openCart} cart={realCart}/>
      <Card variant="outlined" sx={{ borderRadius:'10px'}}>
        <CardMedia sx={{height:'300px' }}
          component="img"
          image={restaurantInfo.rest_banner}
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

            </Box>

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
                  image={restaurantInfo.rest_banner}
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
                    <img width="300px" height="200px" src={getMap(restaurantInfo.rest_postal_code)} alt="no map data"/>
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
                  image={restaurantInfo.rest_banner}
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
                      Ordering from: {restaurantInfo.restaurant_name}
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
                    <Box width='70%'>
                      <Typography variant="subtitle">
                        Subtotal
                      </Typography>
                    </Box>
                    <Box width="30%" sx={{textAlign:'right'}}>
                      <Typography variant="subtitle" >
                        S$ {subtotal.toFixed(2)}
                      </Typography>
                    </Box>
                  </ListItem>
                  <ListItem >
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
                  </ListItem>
                  <ListItem >
                    <Button sx={{width:'90%', margin:'10px auto'}} variant="outlined" color="inherit" component={ Link } to={`/customer/orderdelivery/${restID}/checkout`} onClick={()=>setCartOpen(false)}> go to checkout</Button>
                  </ListItem>
                </List>
              </Box>
            </Drawer>
            {/* END OF DRAWER */}

          </Box>
        </CardContent>
      </Card>
      </Route>
      <Route path="/customer/orderdelivery/:id/checkout">
        <CheckOut restInfo={restaurantInfo} realCart={realCart} deleteItem={deleteItem} minusQty={minusQty} addQty={addQty} getsub={getsub} subtotal={subtotal} deliveryFee={deliveryFee} gst={gst} total={total} />
      </Route>
    </Switch>
      
  )
}
