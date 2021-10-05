import React, {useRef, useState}from 'react'
import { useHistory } from 'react-router';
import Navigation1 from '../../components/top-nav/navigation1'
import Topbar from '../../components/top-nav/topbar';
import { Box } from '@mui/system';
import { Route, Switch } from 'react-router-dom';
import Editmenu from './components/editmenu';
import AddItem from './components/additem';
import ManageUser from './components/manageuser';

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
    <div className="main">
    <Topbar toggleVisibility={toggleVisibility}/>
    <Navigation1 isVisible={isVisible} isSelected={isSelected} setIsSelected={setIsSelected} />

    <Box className="main3" sx={{mt:'80px',  ml:isVisible ? '240px' : '', transition: 'margin 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;'}}>
      <Switch>
        <Route path="/generalmanager/editmenu" component= {Editmenu}/>
        <Route path="/generalmanager/additem" component= {AddItem}/>
        <Route path="/generalmanager/manageuser" component= {ManageUser} />
        <Route path="/editmenu/deletemenu" component= {() => <div>delete Menu</div>} />
      </Switch>
    </Box>
    </div>
  )
}
