import React, { useState, useEffect } from 'react'
import NavigationDM from '../../components/top-nav/NavigationDM'
import Topbar from '../../components/top-nav/topbar';
import { Box } from '@mui/system';
import { Modal } from '@mui/material';
import ViewPending from './components/ViewPending';
import ViewProfile from '../../profile/viewprofile';
import AcceptedOrders from './components/AcceptedOrders';
import { Redirect, Route, Switch } from 'react-router-dom';
import DelFirstLogin from './components/DelFirstLogin';
import ViewOrderHistory from './components/ViewOrderHistory';
import { getAccStatus, getRestName } from '../restaurant_controller';

/***********************************************************************
 * 
 ***********************************************************************/
export default function DeliveriesManager() {
  // Essential useStates for the page
  const [isVisible, setIsVisible] = useState(true); 
  const [isSelected, setIsSelected] = useState(1);
  const [firstLog, setFirstLog] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  
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
    getStatus()
      .then((response) => {
        console.log(response);
        setFirstLog(response);
      })
      .catch(error => console.log(error));
    
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
    </Box>
  )
}
