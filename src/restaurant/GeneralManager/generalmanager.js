import React, {useState}from 'react'
import Navigation1 from '../../components/top-nav/navigation1'
import Topbar from '../../components/top-nav/topbar';
import { Box } from '@mui/system';
import { Redirect, Route, Switch } from 'react-router-dom';
import Editmenu from './components/editmenu';
import ManageUser from './components/manageuser';
import ViewInfo from './components/restaurantprofile';
import AddSubUser from './components/addsubuser';
import Stats from './components/statistics';
import EditItem from './components/edititem';
import Profile from '../../profile/viewprofile';


export default function GeneralManager() {
  const [isVisible, setIsVisible] = useState(true); 
  const [isSelected, setIsSelected] = useState(1);
  const [isChecked, setIsChecked] = useState(false);

  const [menuData, setMenuData] = useState([{
    id: 1,
    available: true,
    name: 'Chicken Chop',
    price: 7.90,
    desc: 'Delightful',
    allergies:'-'
  },
  {
    id: 2,
    available: true,
    name: 'Chicken Cutlet',
    price: 8.90,
    desc: 'Delightful fried crunchy chicken',
    allergies:'-'
  },
  {
    id: 3,
    available: true,
    name: 'Chicken Wing (2pcs)',
    price: 3.00,
    desc: 'Delightful ',
    allergies:'-'
  },
  {
    id: 4,
    available: false,
    name: 'Kobe Beef Steak (100g)',
    price: 99.90,
    desc: 'Most premium beef you can find in town!',
    allergies:'-'
  },
  {
    id: 5,
    available: true,
    name: 'Fish n Chips',
    price: 9.00,
    desc: 'Delightful ',
    allergies:'-'
  },
  {
    id: 6,
    available: true,
    name: 'Seafood Platter',
    price: 15.90,
    desc: 'Delightful ',
    allergies:'Shell (Prawn, Clams)'
  },
  {
    id: 7,
    available: true,
    name: 'Fries',
    price: 11.00,
    desc: 'Delightful ',
    allergies:'-'
  },
  {
    id: 8,
    available: true,
    name: 'Chicken Nugget (10pcs)',
    price: 3.00,
    desc: 'Delightful ',
    allergies:'-'
  },
  {
    id: 9,
    available: true,
    name: 'Cheese Dipping Sauce',
    price: 2.00,
    desc: 'Delightful ',
    allergies:'-'
  }
])

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
