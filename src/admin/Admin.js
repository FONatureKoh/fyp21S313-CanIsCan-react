import React, { useState, useEffect } from 'react';
import NavigationAdmin from '../components/top-nav/NavigationAdmin';
import Topbar from '../components/top-nav/topbar';
import { Box } from '@mui/system';
import { Switch, Route, Redirect, useHistory }from 'react-router-dom';
import ApproveRest from './components/ApproveRest';
import ExistingCust from './components/ExistingCust';
import ExistingRest from './components/ExistingRest';
import Tags from './components/Tags';
import ViewProfile from '../profile/viewprofile';
import { getUserType } from '../store/general_controller';
// import { getUserType } from './admin_controller';

export default function Admin() {
  // CHECKING OF USER TYPE 
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

        if(response !== "System Administrator") {
          history.push("/unauthorised");
        }
      })
  }, []);

  const history = useHistory();
  
  // END OF CHECKING

  // SYSTEM CONTROLS
  const [isVisible, setIsVisible] = useState(true); 
  const [isSelected, setIsSelected] = useState(1);

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

  return <>
    <Box sx={{ padding:'1% 2%', bgcolor:'#f5f5f5', display:'block'}}>
      <Topbar toggleVisibility={toggleVisibility}/>
      <NavigationAdmin isVisible={isVisible} isSelected={isSelected} setIsSelected={setIsSelected} />

      <Box sx={{mt:'80px',  ml:isVisible ? '240px' : '', transition: 'margin 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;'}}>
        <Switch>
          <Route path='/admin/approverestaurant'><ApproveRest /></Route>
          <Route path='/admin/existingrest'><ExistingRest /></Route> 
          <Route path='/admin/search'><ExistingCust /></Route> 
          <Route path='/admin/tags'><Tags /></Route> 
          <Route path='/admin/profile' component={ViewProfile} />
          <Redirect from='/admin' to='/admin/approverestaurant'/>
        </Switch>
      </Box>
      
    </Box>
  </>
}
