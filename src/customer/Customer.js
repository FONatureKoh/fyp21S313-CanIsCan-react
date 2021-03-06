import React, { useState, useEffect } from 'react'
import Topbar from '../components/top-nav/topbar'
import NavigationCustomer from '../components/top-nav/NavigationCustomer'
import { Box } from '@mui/system';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import BrowseTopRestaurant from './components/BrowseTopRestaurant';
import BrowseRestaurantCat from './components/BrowseRestaurantCat';
import RetaurantDetails from './components/RestaurantDetails';
import ViewProfile from '../profile/viewprofile';
import DeliveryHistory from './components/DeliveryHistory';
import ReservationHistory from './components/ReservationHistory';
import { retrieveAllRestaurants, retrieveRestaurantTags, retrieveTopRestaurants } from './customer_controller';
import { getAccStatus } from '../store/general_controller';
import OrderDelivery from './components/OrderDelivery';
import { Modal } from '@mui/material';
import CustFirstLogin from './components/CustFirstLogin';
import Reservation from './components/Reservation';
import { getUserType } from '../store/general_controller';
import ResetPasswordModal from '../store/ResetPWPage';

export default function Customer() {
  // CHECKING OF USER TYPE 
  const history = useHistory();
  
  useEffect(() => {
    // ASYNC FUNCTION TO RETRIEVE THE USER TYPE THROUGH THE TOKEN
    async function retrieverUserType() {
      try {
        const response = await getUserType();

        const userType = response.user_type;
        return userType;
      }
      catch (err) {
        return "Invalid User"
      }
    }

    // TRIGGER THE ASYNC FUNCTION AND PUSH IF ITS A BAD RESPONSE
    retrieverUserType()
      .then((response) => {
        // console.log(response);

        if(response !== "Customer") {
          history.push("/unauthorised");
        }
      })
  }, [history]);
  // END OF CHECKING

  // Other useStates
  const [isVisible, setIsVisible] = useState(true); 
  const [isSelected, setIsSelected] = useState(1);
  const [restaurantsArray, setRestaurantsArray] = useState([]);
  const [topRestaurants, setTopRestaurants] = useState([]);
  const [tagsArray, setTagsArray] = useState([]);

  // EXTRA MODAL CHECKS
  const [firstLog, setFirstLog] = useState(false);
  const [openReset, setOpenReset] = useState(false);

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
    // CONTROLLER TO CHECK ACCOUNT STATUS
    getAccStatus()
      .then((response) => {
        if (response === "first") {
          setFirstLog(true);
        }

        if (response === "reset") {
          setOpenReset(true);
        }
      });
    
    // Loads all available restaurant tags
    getAllRestaurantTags()
      .then((response) => {
        // console.log(response);
        setTagsArray(response);  
      })
      .catch(error => console.log(error));

    // Gets all the restaurants that are open for business
    getAllRestaurants()
      .then((response) => {
        // console.log(response);
        setRestaurantsArray(response);
      })
      .catch(error => console.log(error));
    // Gets the account's status to trigger first login for customer

    retrieveTopRestaurants()
      .then((response) => {
        // console.log(response);
        setTopRestaurants(response);
      })
      .catch(error => console.log(error));
  }, [])

  const toggleVisibility = () => {
    if (isVisible) {
      setIsVisible(false)
    }
    else {
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
          <Route exact path='/customer/browserestaurant'><BrowseTopRestaurant restData={topRestaurants}/> <BrowseRestaurantCat restData={restaurantsArray} catData={tagsArray}/></Route>
          <Route path='/customer/restaurantdetails'><RetaurantDetails/> </Route>
          <Route path='/customer/orderdelivery'><OrderDelivery/> </Route>
          <Route path='/customer/makereservation'><Reservation/> </Route>
          <Route path='/customer/profile'><ViewProfile/> </Route>
          <Route path='/customer/deliveryhistory'><DeliveryHistory/> </Route>
          <Route path='/customer/reservationhistory'><ReservationHistory/> </Route>
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
          width:"60%",
          padding: '2%',
          maxHeight:'70%',
          overflow: 'auto',
          borderRadius:'5px'}}>
           <CustFirstLogin setFirstLog={setFirstLog}/>
         </Box>
      </Modal>

      {/* PASSWORD RESET MODAL */}
      <Modal open={openReset} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={{bgcolor:'white',position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width:"60%",
          padding: '2%',
          maxHeight:'70%',
          overflow: 'auto',
          borderRadius:'5px'}}>
           <ResetPasswordModal setOpenReset={setOpenReset}/>
         </Box>
      </Modal>
    </Box>
  )
}
