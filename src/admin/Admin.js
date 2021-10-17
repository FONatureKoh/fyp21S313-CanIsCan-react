import React, { useState } from 'react';
import NavigationAdmin from '../components/top-nav/NavigationAdmin';
import Topbar from '../components/top-nav/topbar';
import { Box } from '@mui/system';
import { Switch, Route, Redirect }from 'react-router-dom';
import ApproveRest from './components/ApproveRest';
import SearchAccount from './components/SearchAccount';

export default function Admin() {
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

  return (
    <Box sx={{ padding:'1% 2%', bgcolor:'#f5f5f5', display:'block'}}>
      <Topbar toggleVisibility={toggleVisibility}/>
      <NavigationAdmin isVisible={isVisible} isSelected={isSelected} setIsSelected={setIsSelected} />

      <Box sx={{mt:'80px',  ml:isVisible ? '240px' : '', transition: 'margin 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;'}}>
        <Switch>
          <Route path='/admin/approverestaurant'><ApproveRest /></Route>
          <Route path='/admin/search'><SearchAccount /></Route> 
          <Redirect from='/admin' to='/admin/approverestaurant'/>
        </Switch>
      </Box>
      
    </Box>
  )
}
