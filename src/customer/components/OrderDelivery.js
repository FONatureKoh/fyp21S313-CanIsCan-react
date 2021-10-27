import React, {useEffect, useState} from 'react'
import { Card, CardHeader, CardContent, Box, CardMedia, Typography, Divider, Grid, CardActionArea, Button, IconButton, Tooltip, Drawer, List,
  ListItem, ButtonGroup } from '@mui/material'
import TestImage from '../../assets/temp/eg-biz1.png'
import { Rating } from '@mui/material'
import test from '../../assets/icon-profile.png'
import { ButtonBase } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ReviewsOutlinedIcon from '@mui/icons-material/ReviewsOutlined';
import { Modal } from '@mui/material'
import { Route, Switch } from 'react-router';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { useRouteMatch } from 'react-router'
import { retrieveAllRestaurantItems, getItemImage, retrieveSingleRestaurant, getBannerImage } from '../customer_controller'
import Cart from './Cart'
import CheckOut from './CheckOut';
import { Link } from 'react-router-dom'

const apiKey = "AIzaSyCZltDQ_C75D3csUGTpHRpfAJhZuPP2bqM"
const drawerWidth = 480;
export default function OrderDelivery() {
  // Added MATCH - Thomas
  const match = useRouteMatch('/customer/orderdelivery/:id');
  const restID = match.params.id;

  const [menusState, setMenusState] = useState([])
  const [itemMenusState, setItemMenusState] = useState([])
  const [restaurantInfo, setRestaurantInfo] = useState('');
  const [rating, setRating] = useState(0)

  // Useful variables at the start
  var itemMenusArray = [];
  var itemsArray = [];
  
  //SELECTED ITEM
  const [selItem, setSelItem] = useState([])

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
  
  // Simple function to filter out only distinct values
  async function removeusingSet(arr) {
    try {
      let outputArray = Array.from(new Set(arr));
      return outputArray;
    }
    catch (error) {
      return error;
    }
  }

  // Async function to retrieve single restaurant info
  async function getRestInfo() {
    try {
      var response = await retrieveSingleRestaurant(restID);

      // Since response is the json object, we can use it to produce the blob
      // image url here, and then add to the json
      const imageURL = await getBannerImage(response.rest_banner_ID);

      response["rest_bannerURL"] = imageURL;
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


  //CART CALCULATIONS
  //ITEM UNIT PRICE * QTY
  function getsub(item){
    const sub = item.itemQty*item.itemPrice;
    // setSubtotal(subtotal + sub)
    return sub.toFixed(2);
  }

  //USE EFFECT TO SET THE CART DETAILS
  //WILL RUN WHEN STATE IS RERENDERED
  useEffect(() => {
    const subtotal2 = realCart.reduce((total, realCart) => total + (realCart.itemPrice * realCart.itemQty), 0)
    setSubtotal(subtotal2)
    setDeliveryFee(3.50)
    const gst = (subtotal2 + deliveryFee) * 0.07
    setGst(gst)
    setTotal(gst + deliveryFee + subtotal)
  })

  //CART TESTING
  const [realCart, setRealCart]= useState([])

  // Do we need useEffect for this? Not sure if I could just load the damn thing
  // into states. Had a lot of issues of the Array not filtering
  useEffect(() => {
    // Async function trigger to parse data 
    getItems()
      .then((response) => {
        console.log(response);
        response.forEach(item => {
          // We got to transform the picture here already, so we call the async
          // controller here directly
          let tempItemImageURL = '';

          getItemImage(item.item_png_ID)
            .then((response) => {
              // Temp imageURL
              tempItemImageURL = response;
              console.log(tempItemImageURL);

              const tempJson = {
                itemID: item.ri_item_ID,
                itemImage: tempItemImageURL,
                itemName: item.item_name,
                itemDesc: item.item_desc,
                itemAllergen: item.item_allergen_warning,
                itemPrice: item.item_price,
                itemMenu: item.ric_name
              }
              itemsArray.push(tempJson);
              setItemMenusState(oldArray => [...oldArray, tempJson]);
            })
            .catch(error => console.log(error));
          itemMenusArray.push(item.ric_name);
        })
      
        // Trigger array filter async function
        removeusingSet(itemMenusArray)
          .then((response) => {
            itemMenusArray = response;
            setMenusState(itemMenusArray)
            console.log(itemMenusArray);
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));

      getRestInfo()
      .then((response) => {
        setRestaurantInfo(response);
        if(response.rest_rating !== null)
        {
          setRating(response.rest_rating.toFixed(1))
        }

        // Console log to see if the info has been set properly
        console.log(restaurantInfo);
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
  const handleOpenReview = () => setOpenReview(true);
  const handleCloseReview = () => setOpenReview(false);

  //MODAL CONTROLS - REVIEWS
  const [openReserve, setOpenReserve] = useState(false);
  const handleOpenReserve= () => setOpenReserve(true);
  const handleCloseReserve = () => setOpenReserve(false);

  // CALENDAR TESTING
  const [value, setValue] = React.useState(new Date());
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

            
            {/* MENU BOX - CONTAINER FOR EACH MENU OFFERED BY THE REST */}
            
            <Box sx={{paddingBottom:'20px'}}>
              {
                menusState.map((item) =>{
                  return <>
                  {/* HEADER */}
                  <Typography variant="h5" sx={{padding:'20px 0px'}}>
                    {item}
                  </Typography>
                  {/* END OF HEADER */}
                  <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 12, md: 12 }} direction="row" justify="flex-start" alignItems="flex-start">
                    {
                      itemMenusState.map(item2 =>{
                        if (item2.itemMenu === item)
                        return <>
                          <Grid item xs={12} sm={12} md={6}>
                          <ButtonBase onClick={()=>{itemPopup(item2)}} sx={{display:'block', textAlign:'initial', width:'100%'}}>
                          <Card sx={{ display: 'flex', width:'100%', height:'130px'}}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', width:'80%'}}>
                            <CardContent sx={{ flex: '1 0 auto'}}>
                              <Typography component="div" variant="h6">
                                {item2.itemName}
                              </Typography>
                              <Typography variant="subtitle2" color="text.secondary" component="div">
                                {item2.itemDesc}
                              </Typography>
                              <Typography variant="subtitle1">
                              Price: $ {item2.itemPrice.toFixed(2)}
                              </Typography>
                            </CardContent>
                            </Box>
                            <CardMedia
                              component="img"
                              sx={{ width: 151, margin:'1%'}}
                              image={item2.itemImage}
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
                  <Box textAlign="center">
                    <Box>
                      <img src={selItem.itemImage} alt="food" height='300px'/>
                    </Box>
                    <Typography sx={{mt:'20px'}} variant="h5">{selItem.itemName}</Typography>
                    <Typography variant="subtitle1" sx={{fontSize:'1 0px', fontWeight:'bold', mt:'10px' }}>Description</Typography>
                    <Typography variant="subtitle1">{selItem.itemDesc}</Typography>
                    <Typography variant="subtitle1" sx={{fontSize:'1 0px', fontWeight:'bold', mt:'10px' }}>Price</Typography>
                    <Typography variant="subtitle1">S$ {selItem.itemPrice}</Typography>
                    <Typography variant="subtitle1" sx={{fontSize:'1 0px', fontWeight:'bold', mt:'10px' }}>Allergic Warning</Typography>
                    <Typography variant="subtitle1">{selItem.itemAllergen}</Typography>
                  </Box>

                  <Box textAlign="center" marginTop="20px">
                    <Button variant="outlined" color="inherit"  onClick={()=> addItemPopup()}>Add to Cart</Button>
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
                    <img width="300px" height="200px" src={getMap(restaurantInfo.rest_postal_code)}/>
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
                  image={TestImage}
                />
                <CardContent >
                  <Box textAlign="center">
                    <Typography variant="h5">Restaurant Name</Typography>
                    <Typography variant="subtitle2">Reviews</Typography>
                  </Box>

                  <Box display="flex" flexDirection="column" width="60%" height="100px" border="1px solid black" margin="10px auto" padding="20px">
                    <Typography variant="h6">Title</Typography>
                    <Typography><Rating value={3} size="small"/></Typography>
                    <Typography variant="subtitle2">Information about the review</Typography>
                    
                    <Typography variant="subtitle" fontSize="12px" alignSelf='flex-end'>Reviewed by: Kelvin K.</Typography>
                  </Box>
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
                      Ordering from: placeholder
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
        <CheckOut realCart={realCart} deleteItem={deleteItem} minusQty={minusQty} addQty={addQty} getsub={getsub} subtotal={subtotal} deliveryFee={deliveryFee} gst={gst} total={total} />
      </Route>
    </Switch>
      
  )
}
