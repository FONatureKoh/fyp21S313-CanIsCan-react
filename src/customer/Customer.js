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
import OrderDelivery from './components/OrderDelivery';
import { Modal } from '@mui/material';
import CustFirstLogin from './components/CustFirstLogin';


export default function Customer() {
  // Other useStates
  const [isVisible, setIsVisible] = useState(true); 
  const [isSelected, setIsSelected] = useState(1);
  const [restaurantsArray, setRestaurantsArray] = useState([]);
  const [tagsArray, setTagsArray] = useState([]);
  
  const [firstLog, setFirstLog] = useState(true);

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
          <Route path='/customer/restaurantdetails'><RetaurantDetails/> </Route>
          <Route path='/customer/orderdelivery'><OrderDelivery/> </Route>


          <Route path='/customer/profile'><ViewProfile/> </Route>
          <Route path='/customer/deliveryhistory'><DeliveryHistory/> </Route>
          <Route path='/customer/reservationhistory'><ReservationHistory/> </Route>
          {/* <Route exact path='/customer/checkout'>
            <CheckOut realCart={realCart} deleteItem={deleteItem} minusQty={minusQty} addQty={addQty} getsub={getsub} subtotal={subtotal} deliveryFee={deliveryFee} gst={gst} total={total} />
          </Route> */}
          <Redirect from='/customer' to='/customer/browserestaurant'/>
        </Switch>
        {/* <Cart openCart={openCart} cart={realCart}/> */}
      </Box>

      <Modal
        open={firstLog}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{bgcolor:'white',position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width:"50%",
          padding: '2%',
          maxHeight:'70%',
          overflow: 'auto',
          borderRadius:'5px'}}>
           <CustFirstLogin setFirstLog={setFirstLog}/>
         </Box>
      </Modal>
    </Box>
  )
}
