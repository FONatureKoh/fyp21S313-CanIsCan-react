import React, { useState, useEffect } from 'react'
import NavigationDM from '../../components/top-nav/NavigationDM'
import Topbar from '../../components/top-nav/topbar';
import { Modal, Box } from '@mui/material';
import ViewPending from './components/ViewPending';
import ViewProfile from '../../profile/viewprofile';
import AcceptedOrders from './components/AcceptedOrders';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import DelFirstLogin from './components/DelFirstLogin';
import ViewOrderHistory from './components/ViewOrderHistory';
import { getRestName } from '../restaurant_controller';
import { getUserType, getAccStatus } from '../../store/general_controller';
import ResetPasswordModal from '../../store/ResetPWPage';

/***********************************************************************
 * 
 ***********************************************************************/
export default function DeliveriesManager() {
  // CHECKING OF USER TYPE 
  const history = useHistory(); // To push path if needed
  
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
        console.log(response);

        if(response !== "Restaurant Deliveries Manager") {
          history.push("/unauthorised");
        }
      })
  }, [history]);

  
  // END OF CHECKING
  // Essential useStates for the page
  const [isVisible, setIsVisible] = useState(true); 
  const [isSelected, setIsSelected] = useState(1);
  const [restaurantName, setRestaurantName] = useState('');

  // EXTRA MODAL CHECKS
  const [firstLog, setFirstLog] = useState(false);
  const [openReset, setOpenReset] = useState(false);
  
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
  
  // ASYNC FUNCTION
  // Async function to get User account Status
  async function getStatus() {
    try {
      const { account_status } = await getAccStatus();
      if (account_status === "first") {
        return true;
      }
      else {
        return false;
      }
    }
    catch (error) {
      return error;
    }
  }

  // Async function to get restaurant's name
  async function getRestaurantName() {
    try {
      const { restaurant_name } = await getRestName();
      
      return restaurant_name;
    }
    catch (error) {
      return error;
    }
  }
  
  // useEffect for when the page first loads
  useEffect(() =>{
    getAccStatus()
      .then((response) => {
        if (response === "first") {
          setFirstLog(true);
        }

        if (response === "reset") {
          setOpenReset(true);
        }
      });
    
    // Get restaurant Name
    getRestaurantName()
      .then((response) => {
        console.log(response);
        setRestaurantName(response);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <Box sx={{ padding:'1% 2%', bgcolor:'#f5f5f5', display:'block'}}>
      <Topbar toggleVisibility={toggleVisibility}/>
      <NavigationDM restName={restaurantName} isVisible={isVisible} isSelected={isSelected} setIsSelected={setIsSelected} />

      <Box sx={{mt:'80px',  ml:isVisible ? '240px' : '', transition: 'margin 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;'}}>
        <Switch>
          <Route path='/deliveriesmanager/viewpending'><ViewPending/></Route>
          <Route path='/deliveriesmanager/acceptedorders'><AcceptedOrders/></Route>
          <Route path='/deliveriesmanager/viewhistory'><ViewOrderHistory/></Route>
          <Route path="/deliveriesmanager/profile" component={ViewProfile}/>
          <Redirect from='/deliveriesmanager' to='/deliveriesmanager/viewpending'/>
        </Switch>
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
           <DelFirstLogin setFirstLog={setFirstLog}/>
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
