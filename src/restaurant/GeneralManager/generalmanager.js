import React, {useEffect, useState}from 'react'
import Navigation1 from '../../components/top-nav/navigation1'
import Topbar from '../../components/top-nav/topbar';
import { Box } from '@mui/system';
import { Redirect, Route, Switch } from 'react-router-dom';
import Editmenu from './components/editmenu';
import ManageUser from './components/manageuser';
import ViewInfo from './components/restaurantprofile';
import AddSubUser from './components/addsubuser';
import Stats from './components/statistics';
import Profile from '../../profile/viewprofile';
import { retrieveMenuItems } from '../restaurant_controller';

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
  const [isVisible, setIsVisible] = useState(true); 
  const [isSelected, setIsSelected] = useState(1);
  const [isChecked, setIsChecked] = useState(false);

  const [menuData, setMenuData] = useState([]);


  // Calling the async function
  
  useEffect(() => {
    async function getMenu() {
      const testMenuData = await retrieveMenuItems(1);
      setMenuData(testMenuData);
    }
    getMenu();
  },[])
  
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
      <Navigation1 isVisible={isVisible} isSelected={isSelected} setIsSelected={setIsSelected} isChecked={isChecked} toggleChecked={toggleChecked} />
      <Box sx={{mt:'80px',  ml:isVisible ? '240px' : '', transition: 'margin 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;'}}>
        <Switch>
          <Route path="/generalmanager/editmenu"> <Editmenu menuData={menuData}/></Route>
          <Route path="/generalmanager/manageuser" component= {ManageUser} />
          <Route path="/generalmanager/restaurantinformation"> <ViewInfo isChecked={isChecked} toggleChecked={toggleChecked}/> </Route>
          <Route path="/generalmanager/addsub-user" component= {AddSubUser}/>
          <Route path="/generalmanager/statistics" component= {Stats}/>
          <Route path="/generalmanager/profile" component= {Profile}/>
          <Redirect from='/generalmanager' to='/generalmanager/editmenu'/>
        </Switch>
      </Box>
    </Box>
  )
}
