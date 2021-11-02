import React, {useEffect, useState, useContext}from 'react'
import NavigationRGM from '../../components/top-nav/NavigationRGM'
import Topbar from '../../components/top-nav/topbar';
import { Box } from '@mui/system';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Editmenu from './components/editmenu';
import ManageUser from './components/manageuser';
import ViewInfo from './components/restaurantprofile';
import AddSubUser from './components/addsubuser';
import Stats from './components/statistics';
import ViewProfile from '../../profile/viewprofile';
import { restaurantProfile, retrieveRestaurantStatus, setRestStatus } from '../restaurant_controller';
import { Modal } from '@mui/material';
import FirstLogin from './components/firstlogin';
import { UserContext } from '../../store/user_context' ;
import StatisticsReservations from './components/statisticsReservations';

/*********************************************************
 * Menu Function to retrieve items based on RestaurantID *
 * ***************************************************** *
 * retrieveMenuItems() returns an Array
 * NOTE: Current returned fields:
 * - menu_ID, restaurant_ID, menu_type, menu_item_ID,
 * item_menu_ID, item_name, item_png_ID, item_desc,
 * item_allergen_warning, item_price, item_availability
 * ***************************************************** */

export default function GeneralManager() {
  
  // CHECKING OF USER TYPE 
  const history = useHistory();
  const testContext = useContext(UserContext);
  console.log(testContext.usertype[0])
  if(testContext.usertype[0] !== "Restaurant General Manager")
  {
    history.push("/unauthorised");
  }
  // END OF CHECKING

  // Setting some general states
  // const [menuData, setMenuData] = useState([]);
  const [isVisible, setIsVisible] = useState(true); 
  const [isSelected, setIsSelected] = useState(1);
  const [isChecked, setIsChecked] = useState(false);
  const [firstLog, setFirstLog] = useState(false);
  const [restaurantName, setRestaurantName] = useState('');


  
  // Async function to get status of restaurant
  async function getStatus() {
    try {
      const restaurantStatus = await retrieveRestaurantStatus();

      // If this is the first time the restaurant RGM has logged in, then we will prompt a first login
      if (restaurantStatus === "first") {
        return true;
      }
      else {
        // If the restaurant's status is open, then we set it in, else its
        // false by default
        if (restaurantStatus === "open") {
          setIsChecked(true);
        }
        return false;
      }
    }
    catch (error) {
      return error;
    }
  }

  // Async function to get the restaurant Info
  async function getRestaurantName() {
    try {
      const response = await restaurantProfile();
      return response.restaurant_name;
    }
    catch (error) {
      return error;
    }
  }

  // Async function to set the status of the restaurant
  async function setRestaurantStatus(restStatus) {
    try {
      // This communicates with the controller
      const response = await setRestStatus(restStatus);

      return response.api_msg;
    }
    catch (err) {
      // Consider proper error handling if need be.
      console.log(err);
      return "fail";
    }
  }

  // Note: Using useEffect to get the firstlogin status
  useEffect(() =>{
    getStatus()
      .then((response) => {
        setFirstLog(response);
      })
      .catch(error => console.log(error));
    
    // Get restaurant Name
    getRestaurantName()
      .then((response) => {
        setRestaurantName(response);
      })
      .catch(error => console.log(error));
  }, []);

  // useEffect to get Restaurant's Items Data
  // NOTE: edited to retrieve restaurant items using the username in
  // accesstoken instead.
  // useEffect(() => {
  //   async function getMenu() {
  //     const retrievedItemsData = await retrieveCatItems();
  //     setMenuData(retrievedItemsData);
  //     // console.log(retrievedItemsData);
  //   }
  //   getMenu();
  // },[])
  
  const toggleChecked = () => {
    if (isChecked) {
      // Closing the restaurant
      setRestaurantStatus("closed")
        .then((response) => {
          const msg = response;

          // Alert user accordingly
          if (msg === "success") {
            alert("Your restaurant is now closed!");
          }
          else {
            alert("There's a problem, please contact an administrator.");
          }
        })
      setIsChecked(false);
    }
    else {
      setRestaurantStatus("open")
        .then((response) => {
          const msg = response;

          // Alert user accordingly
          if (msg === "success") {
            alert("Your restaurant is now OPEN!");
          }
          else {
            alert("There's a problem, please contact an administrator.");
          }
        })

      setIsChecked(true)
    }
  }

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

      {/* Passing some info into the side bar navigation component */}
      <NavigationRGM 
        restaurantName={restaurantName}
        isVisible={isVisible} 
        isSelected={isSelected} 
        setIsSelected={setIsSelected} 
        isChecked={isChecked} 
        toggleChecked={toggleChecked} />

      <Box sx={{mt:'80px',  ml:isVisible ? '240px' : '', transition: 'margin 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;'}}>
        <Switch>
          <Route path="/generalmanager/editmenu"> <Editmenu/></Route>
          <Route path="/generalmanager/manageuser"> <ManageUser/></Route>
          <Route path="/generalmanager/restaurantinformation"> <ViewInfo isChecked={isChecked} toggleChecked={toggleChecked}/> </Route>
          <Route path="/generalmanager/addsub-user" component= {AddSubUser}/>
          <Route path="/generalmanager/statistics" ><Stats/> <StatisticsReservations/></Route>
          <Route path="/generalmanager/profile" component={ViewProfile}/>
          <Redirect from='/generalmanager' to='/generalmanager/editmenu'/>
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
           <FirstLogin setFirstLog={setFirstLog}/>
         </Box>
      </Modal>
    </Box>
  )
}
