import React, { useState, useEffect } from 'react'
import Topbar from '../components/top-nav/topbar'
import NavigationCustomer from '../components/top-nav/NavigationCustomer'
import { Box } from '@mui/system';
import { Redirect, Route, Switch } from 'react-router-dom';
import BrowseRestaurant from './components/BrowseRestaurant';
import BrowseRestaurantCat from './components/BrowseRestaurantCat';
import RetaurantDetails from './components/RestaurantDetails';
import Cart from './components/Cart';
import { Button, Drawer, Typography } from '@mui/material';
import { List, ListItem } from '@mui/material';
import { Divider } from '@mui/material';
import { ButtonGroup } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CheckOut from './components/CheckOut';
import { Link } from 'react-router-dom';
import ViewProfile from '../profile/viewprofile';
import DeliveryHistory from './components/DeliveryHistory';
import ReservationHistory from './components/ReservationHistory';
import { retrieveAllRestaurants, retrieveRestaurantTags } from './customer_controller';

const drawerWidth = 480;

export default function Customer() {
  // Other useStates
  const [isVisible, setIsVisible] = useState(true); 
  const [isSelected, setIsSelected] = useState(1);
  const [restaurantsArray, setRestaurantsArray] = useState([]);
  const [tagsArray, setTagsArray] = useState([]);

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

  // Async functions for customers
  // For Categories
  async function getAllRestaurantTags() {
    try{
      const response = await retrieveRestaurantTags();
      return response.restaurantTags;
    }
    catch (error) {
      return error;
    }
  }

  // For restaurant Info
  async function getAllRestaurants() {
    try {
      const response = await retrieveAllRestaurants();
      return response;
    }
    catch (error) {
      return error;
    }
  }

  // useEffect to load the restaurants once on mount
  useEffect(() => {
    getAllRestaurantTags()
      .then((response) => {
        console.log(response);
        setTagsArray(response);  
      })
      .catch(error => console.log(error));

    getAllRestaurants()
      .then((response) => {
        console.log(response);
        setRestaurantsArray(response);
      })
      .catch(error => console.log(error));
  }, [])

  const catData=['Cafe', 'Japanese', 'Indian', 'Chinese', 'Malay'];

  const restData = [{
    id: 1,
    name: "Default co", 
    phone: '+65 8765 4321',
    address: 'Blk222, Ang Mo Kio Avenue 2 #02-222 S(222222)',
    rating: 4.5,
    category: 'Cafe'
  },
  {
    id: 2,
    name: "Kelvin co", 
    phone: '+65 8765 4321',
    address: 'Blk222, Ang Mo Kio Avenue 2 #02-222 S(222222)',
    rating: 4,
    category: 'Japanese'
  },
  {
    id: 3,
    name: "Train Cafe", 
    phone: '+65 8765 4321',
    address: 'Blk222, Ang Mo Kio Avenue 2 #02-222 S(222222)',
    rating: 4.5,
    category: 'Indian'
  },
  {
    id: 4,
    name: "Koi The", 
    phone: '+65 8765 4321',
    address: 'Blk222, Ang Mo Kio Avenue 2 #02-222 S(222222)',
    rating: 4,
    category: 'Cafe'
  },
  {
    id: 5,
    name: "Shooting Star Cafe", 
    phone: '+65 8765 4321',
    address: 'Blk222, Ang Mo Kio Avenue 2 #02-222 S(222222)',
    rating: 4.2,
    category: 'Thai'
  },
  {
    id: 6,
    name: "Default co", 
    phone: '+65 8765 4321',
    address: 'Blk222, Ang Mo Kio Avenue 2 #02-222 S(222222)',
    rating: 4.5,
    category: 'Chinese'
  },
  {
    id: 7,
    name: "Default co", 
    phone: '+65 8765 4321',
    address: 'Blk222, Ang Mo Kio Avenue 2 #02-222 S(222222)',
    rating: 4.5,
    category: 'Chinese'
  },
  {
    id: 8,
    name: "Default co", 
    phone: '+65 8765 4321',
    address: 'Blk222, Ang Mo Kio Avenue 2 #02-222 S(222222)',
    rating: 4.5,
    category: 'Chinese'
  },
  {
    id: 9,
    name: "Default co", 
    phone: '+65 8765 4321',
    address: 'Blk222, Ang Mo Kio Avenue 2 #02-222 S(222222)',
    rating: 4.5,
    category: 'Chinese'
  },
  {
    id: 10,
    name: "Default co", 
    phone: '+65 8765 4321',
    address: 'Blk222, Ang Mo Kio Avenue 2 #02-222 S(222222)',
    rating: 4.5,
    category: 'Chinese'
  },
  {
    id: 11,
    name: "Default co", 
    phone: '+65 8765 4321',
    address: 'Blk222, Ang Mo Kio Avenue 2 #02-222 S(222222)',
    rating: 4.5,
    category: 'Chinese'
  },
  {
    id: 12,
    name: "Default co", 
    phone: '+65 8765 4321',
    address: 'Blk222, Ang Mo Kio Avenue 2 #02-222 S(222222)',
    rating: 4.5,
    category: 'Chinese'
  },
  {
    id: 13,
    name: "Default co", 
    phone: '+65 8765 4321',
    address: 'Blk222, Ang Mo Kio Avenue 2 #02-222 S(222222)',
    rating: 4.5,
    category: 'Chinese'
  },
  {
    id: 14,
    name: "Default co", 
    phone: '+65 8765 4321',
    address: 'Blk222, Ang Mo Kio Avenue 2 #02-222 S(222222)',
    rating: 4.5,
    category: 'Chinese'
  }
]

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

//HANDLE ADD
function addQty(id){
  const newCart = [...realCart]
  const newItem = newCart.find(newItem => newItem.id === id)
  newItem.qty += 1
  setRealCart(newCart)
}

function minusQty(id){
  const newCart = [...realCart]
  const newItem = newCart.find(newItem => newItem.id === id)
  newItem.qty -= 1
  setRealCart(newCart)
}

function deleteItem(id){
  const newCart = realCart.filter(item => item.id !== id)
  setRealCart(newCart)
}

// CART DUMMY
  const cart = [
    {
      'id': 1,
      'item': 'dog food',
      'price': 12.1,
      'qty': 3 
    },
    {
      'id': 2,
      'item': 'cat food',
      'price': 13,
      'qty': 2
    },
    {
      'id': 3,
      'item': 'giraffe food',
      'price': 23,
      'qty': 1
    },
    {
      'id': 4,
      'item': 'mouse food',
      'price': 3.5,
      'qty': 2
    },
    {
      'id': 5,
      'item': 'cockroach food',
      'price': 1,
      'qty': 22
    }
  ]

  //CART CALCULATIONS
  //ITEM UNIT PRICE * QTY
  function getsub(item){
    const sub = item.qty*item.price;
    // setSubtotal(subtotal + sub)
    return sub.toFixed(2);
  }

  //USE EFFECT TO SET THE CART DETAILS
  //WILL RUN WHEN STATE IS RERENDERED
  useEffect(() => {
    const subtotal2 = realCart.reduce((total, realCart) => total + (realCart.price * realCart.qty), 0)
    setSubtotal(subtotal2)
    setDeliveryFee(3.50)
    const gst = (subtotal2 + deliveryFee) * 0.07
    setGst(gst)
    setTotal(gst + deliveryFee + subtotal)
  })

 

  const toggleVisibility = () => {
    if (isVisible)
    {
      setIsVisible(false)
    }
    else
    {
      setIsVisible(true)
    }
  }

  return (
    <Box sx={{ padding:'1% 2%', bgcolor:'#f5f5f5', display:'block'}}>
      <Topbar toggleVisibility={toggleVisibility}/>
      <NavigationCustomer isVisible={isVisible} isSelected={isSelected} setIsSelected={setIsSelected} />
      <Box sx={{mt:'80px',  ml:isVisible ? '240px' : '', transition: 'margin 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;'}}>
        <Switch>
          {/* DELIVERY */}
          <Route exact path='/customer/browserestaurant'><BrowseRestaurant restData={restaurantsArray}/> <BrowseRestaurantCat restData={restaurantsArray} catData={tagsArray}/></Route>
          <Route path='/customer/browserestaurant/restaurantdetails'><RetaurantDetails/> </Route>

          <Route path='/customer/profile'><ViewProfile/> </Route>
          <Route path='/customer/deliveryhistory'><DeliveryHistory/> </Route>
          <Route path='/customer/reservationhistory'><ReservationHistory/> </Route>
          <Route exact path='/customer/checkout'>
            <CheckOut realCart={realCart} deleteItem={deleteItem} minusQty={minusQty} addQty={addQty} getsub={getsub} subtotal={subtotal} deliveryFee={deliveryFee} gst={gst} total={total} />
          </Route>
          <Redirect from='/customer' to='/customer/browserestaurant'/>
        </Switch>
        <Cart openCart={openCart} cart={realCart}/>
      </Box>

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
                    {item.item}
                  </Typography>
                  <Typography variant="subtitle">
                    Unit Price: S${item.price.toFixed(2)}
                  </Typography>
                </Box>
                <Box width='30%' textAlign='right' sx={{mt:'10px'}}>
                  <Typography variant="subtitle2">
                      <ButtonGroup color="inherit" size="small">
                        {item.qty === 1 ? <Button onClick={() => deleteItem(item.id)}><DeleteOutlineOutlinedIcon fontSize="small" variant="" /></Button> : <Button onClick={()=> minusQty(item.id)}>-</Button>}
                        <Button >{item.qty}</Button>
                        <Button onClick={()=>addQty(item.id)}>+</Button>
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
              <Button sx={{width:'90%', margin:'10px auto'}} variant="outlined" color="inherit" component={ Link } to="/customer/checkout" onClick={()=>setCartOpen(false)}> go to checkout</Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      {/* END OF DRAWER */}
    </Box>
  )
}
