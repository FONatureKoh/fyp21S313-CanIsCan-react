import React, { useState } from 'react'
import NavigationRM from '../../components/top-nav/NavigationRM'
import Topbar from '../../components/top-nav/topbar';
import { Box } from '@mui/system';
import { Switch, Route, Redirect }from 'react-router-dom';
import PendingReservations from './components/PendingReservations';
import AcceptedReservations from './components/AcceptedReservations';

export default function ReservationsManager() {
  
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
      <NavigationRM isVisible={isVisible} isSelected={isSelected} setIsSelected={setIsSelected} />

      <Box sx={{mt:'80px',  ml:isVisible ? '240px' : '', transition: 'margin 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;'}}>
        <Switch>
          <Route path='/reservationsmanager/viewpendingres'><PendingReservations/></Route>
          <Route path='/reservationsmanager/acceptedres'><AcceptedReservations/></Route>
          <Redirect from='/reservationsmanager' to='/reservationsmanager/viewpendingres'/>
        </Switch>
      </Box>
      
    </Box>
  )
}
