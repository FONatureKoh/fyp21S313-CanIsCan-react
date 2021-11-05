import React, { useState, useEffect } from 'react'
import NavigationRM from '../../components/top-nav/NavigationRM'
import Topbar from '../../components/top-nav/topbar';
import { Modal, Box } from '@mui/material';
import { Switch, Route, Redirect, useHistory }from 'react-router-dom';
import PendingReservations from './components/PendingReservations';
import AcceptedReservations from './components/AcceptedReservations';
import ViewProfile from '../../profile/viewprofile';
import ResFirstLogin from './components/ResFirstLogin';
import ManageSlots from './components/ManageSlots';
import { getAccStatus, getRestName } from '../restaurant_controller';
import { getUserType } from '../../store/general_controller';

export default function ReservationsManager() {
  // CHECKING OF USER TYPE 
  const history = useHistory(); // To push path if required

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

        if(response !== "Restaurant Reservations Manager") {
          history.push("/unauthorised");
        }
      })
  }, [history]);  
  // END OF CHECKING


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
      <NavigationRM restName={restaurantName} isVisible={isVisible} isSelected={isSelected} setIsSelected={setIsSelected} />

      <Box sx={{mt:'80px',  ml:isVisible ? '240px' : '', transition: 'margin 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;'}}>
        <Switch>
          <Route path='/reservationsmanager/viewpendingres'><PendingReservations/></Route>
          <Route path='/reservationsmanager/acceptedres'><AcceptedReservations/></Route>
          <Route path='/reservationsmanager/manageslots'><ManageSlots/></Route>
          <Route path="/reservationsmanager/profile" component={ViewProfile}/>
          <Redirect from='/reservationsmanager' to='/reservationsmanager/viewpendingres'/>
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
           <ResFirstLogin setFirstLog={setFirstLog}/>
         </Box>
      </Modal>
      
    </Box>
  )
}
