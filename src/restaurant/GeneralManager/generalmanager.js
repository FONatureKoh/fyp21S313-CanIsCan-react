import React, {useRef, useState}from 'react'
import { useHistory } from 'react-router';
import Navigation1 from '../../components/top-nav/navigation1'
import Topbar from '../../components/top-nav/topbar';
import { Box } from '@mui/system';
import { Redirect, Route, Switch } from 'react-router-dom';
import Editmenu from './components/editmenu';
import AddItem from './components/additem';
import ManageUser from './components/manageuser';
import ViewInfo from './components/restaurantprofile';
import { Container } from '@mui/material';

export default function GeneralManager() {
  const history = useHistory()
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
    <Box height="100vh;" sx={{ padding:'1% 2%', bgcolor:'#f5f5f5', display:'block'}}>
      <Topbar toggleVisibility={toggleVisibility}/>
      <Navigation1 isVisible={isVisible} isSelected={isSelected} setIsSelected={setIsSelected} />
      <Box sx={{mt:'80px',  ml:isVisible ? '240px' : '', transition: 'margin 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;'}}>
        <Switch>
          <Route path="/generalmanager/editmenu" component= {Editmenu}/>
          <Route path="/generalmanager/additem" component= {AddItem}/>
          <Route path="/generalmanager/manageuser" component= {ManageUser} />
          <Route path="/generalmanager/restaurantinformation" component= {ViewInfo} />
          <Route path="/editmenu/deletemenu" component= {() => <div>delete Menu</div>} />
          <Redirect from='/generalmanager' to='/generalmanager/editmenu'/>
        </Switch>
      </Box>
    </Box>
  )
}
