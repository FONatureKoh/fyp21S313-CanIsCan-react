import React, { useState } from 'react'
import Topbar from '../components/top-nav/topbar'
import NavigationCustomer from '../components/top-nav/NavigationCustomer'
import { Box } from '@mui/system';
import { Redirect, Route, Switch } from 'react-router-dom';
import BrowseRestaurant from './components/BrowseRestaurant';
import BrowseRestaurantCat from './components/BrowseRestaurantCat';

export default function Customer() {
  
  const [isVisible, setIsVisible] = useState(true); 
  const [isSelected, setIsSelected] = useState(1);

  const catData=['Cafe', 'Japanese', 'Indian', 'Chinese', 'Malay'];

  const restData = [{
    id: 1,
    name: "Default co", 
    phone: '+65 8765 4321',
    address: 'Blk222, Ang Mo Kio Avenue 2 #02-222 S(222222)',
    rating: 4.5,
    category: 'Cafe'
  },
  {
    id: 2,
    name: "Kelvin co", 
    phone: '+65 8765 4321',
    address: 'Blk222, Ang Mo Kio Avenue 2 #02-222 S(222222)',
    rating: 4,
    category: 'Japanese'
  },
  {
    id: 3,
    name: "Train Cafe", 
    phone: '+65 8765 4321',
    address: 'Blk222, Ang Mo Kio Avenue 2 #02-222 S(222222)',
    rating: 4.5,
    category: 'Indian'
  },
  {
    id: 4,
    name: "Koi The", 
    phone: '+65 8765 4321',
    address: 'Blk222, Ang Mo Kio Avenue 2 #02-222 S(222222)',
    rating: 4,
    category: 'Cafe'
  },
  {
    id: 5,
    name: "Shooting Star Cafe", 
    phone: '+65 8765 4321',
    address: 'Blk222, Ang Mo Kio Avenue 2 #02-222 S(222222)',
    rating: 4.2,
    category: 'Malay'
  },
  {
    id: 6,
    name: "Default co", 
    phone: '+65 8765 4321',
    address: 'Blk222, Ang Mo Kio Avenue 2 #02-222 S(222222)',
    rating: 4.5,
    category: 'Chinese'
  },
  {
    id: 7,
    name: "Default co", 
    phone: '+65 8765 4321',
    address: 'Blk222, Ang Mo Kio Avenue 2 #02-222 S(222222)',
    rating: 4.5,
    category: 'Chinese'
  },
  {
    id: 8,
    name: "Default co", 
    phone: '+65 8765 4321',
    address: 'Blk222, Ang Mo Kio Avenue 2 #02-222 S(222222)',
    rating: 4.5,
    category: 'Chinese'
  }
]

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
      <NavigationCustomer isVisible={isVisible} isSelected={isSelected} setIsSelected={setIsSelected} />

      <Box sx={{mt:'80px',  ml:isVisible ? '240px' : '', transition: 'margin 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;'}}>
        <Switch>
          <Route path='/customer/browserestaurant'><BrowseRestaurant restData={restData}/> <BrowseRestaurantCat restData={restData} catData={catData}/></Route>
          <Redirect from='/customer' to='/customer/browserestaurant'/>
        </Switch>
      </Box>
    </Box>
  )
}
