import React, {useEffect, useState}from 'react'
import NavigationRGM from '../../components/top-nav/NavigationRGM'
import Topbar from '../../components/top-nav/topbar';
import { Box } from '@mui/system';
import { Redirect, Route, Switch } from 'react-router-dom';
import Editmenu from './components/editmenu';
import ManageUser from './components/manageuser';
import ViewInfo from './components/restaurantprofile';
import AddSubUser from './components/addsubuser';
import Stats from './components/statistics';
import ViewProfile from '../../profile/viewprofile';
import { retrieveCatItems, retrieveRestaurantStatus } from '../restaurant_controller';
import { Modal } from '@mui/material';
import FirstLogin from './components/firstlogin';

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
  // Setting some general states
  // const [menuData, setMenuData] = useState([]);
  const [isVisible, setIsVisible] = useState(true); 
  const [isSelected, setIsSelected] = useState(1);
  const [isChecked, setIsChecked] = useState(false);
  const [firstlog, setFirstLog] = useState(false);

  // Async function to get status of restaurant
  async function getStatus() {
    try {
      const restaurantStatus = await retrieveRestaurantStatus();
      if (restaurantStatus == "first") {
        return true;
      }
      else {
        return false;
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  // Note: Using useEffect to get the firstlogin status
  useEffect(() =>{
    getStatus()
      .then((response) => {
        setFirstLog(response);
      })
      .catch(error => console.log(error));
  });

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
    if (isChecked)
    {
      setIsChecked(false)
    }
    else
    {
      setIsChecked(true)
    }
  }

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

      {/* Passing some info into the side bar navigation component */}
      <NavigationRGM 
        isVisible={isVisible} 
        isSelected={isSelected} 
        setIsSelected={setIsSelected} 
        isChecked={isChecked} 
        toggleChecked={toggleChecked} />

      <Box sx={{mt:'80px',  ml:isVisible ? '240px' : '', transition: 'margin 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;'}}>
        <Switch>
          <Route path="/generalmanager/editmenu"> <Editmenu/></Route>
          <Route path="/generalmanager/manageuser" component= {ManageUser} />
          <Route path="/generalmanager/restaurantinformation"> <ViewInfo isChecked={isChecked} toggleChecked={toggleChecked}/> </Route>
          <Route path="/generalmanager/addsub-user" component= {AddSubUser}/>
          <Route path="/generalmanager/statistics" component= {Stats}/>
          <Route path="/generalmanager/profile" component={ViewProfile}/>
          <Redirect from='/generalmanager' to='/generalmanager/editmenu'/>
        </Switch>
      </Box>

      <Modal
        open={firstlog}
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
