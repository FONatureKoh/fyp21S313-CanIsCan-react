import React, { useState } from 'react';
import NavigationAdmin from '../components/top-nav/NavigationAdmin';
import Topbar from '../components/top-nav/topbar';
import { Box } from '@mui/system';
import { Switch, Route, Redirect }from 'react-router-dom';
import ApproveRest from './components/ApproveRest';
import ExistingCust from './components/ExistingCust';
import ExistingRest from './components/ExistingRest';

export default function Admin() {
  const [isVisible, setIsVisible] = useState(true); 
  const [isSelected, setIsSelected] = useState(1);

    //Mock Restaurant Details
    //Replace this array with real data and it should work
    //after some little tweaks on the accordion
    const pending = [
      {
        'rest_name': 'restaurant 1',
        'uen': 123456,
        'rest_email': 'email312.gmail.com'
      },
      {
        'rest_name': 'restaurant 2',
        'uen': 12312343,
        'rest_email': 'email312.gmail.com'
      },
      {
        'rest_name': 'restaurant 3',
        'uen': 32143,
        'rest_email': 'email312.gmail.com'
      },
      {
        'rest_name': 'restaurant 4',
        'uen': 321,
        'rest_email': 'email312.gmail.com'
      },
      {
        'rest_name': 'restaurant 5',
        'uen': 23155324,
        'rest_email': 'email312.gmail.com'
      },
      {
        'rest_name': 'restaurant 6',
        'uen': 123123554,
        'rest_email': 'email312.gmail.com'
      },
    ];

    // MOCK DATA FOR EXISTINGS
    const existing = [
      {
        'rest_name': 'existing restaurant 1',
        'uen': 123456,
        'rest_email': 'email312.gmail.com'
      },
      {
        'rest_name': ' existing restaurant 2',
        'uen': 12312343,
        'rest_email': 'email312.gmail.com'
      },
      {
        'rest_name': 'existing restaurant 3',
        'uen': 32143,
        'rest_email': 'email312.gmail.com'
      },
      {
        'rest_name': 'existing restaurant 4',
        'uen': 321,
        'rest_email': 'email312.gmail.com'
      },
      {
        'rest_name': 'existing restaurant 5',
        'uen': 23155324,
        'rest_email': 'email312.gmail.com'
      },
      {
        'rest_name': 'existing restaurant 6',
        'uen': 123123554,
        'rest_email': 'email312.gmail.com'
      },
    ];

    // MOCK DATA FOR CUSTOMER
    const existing2 = [
      {
        'rest_name': 'CUSTOMER1',
        'uen': 123456,
        'rest_email': 'email312.gmail.com'
      },
      {
        'rest_name': ' CUSTOMER1',
        'uen': 12312343,
        'rest_email': 'email312.gmail.com'
      },
      {
        'rest_name': 'CUSTOMER3',
        'uen': 32143,
        'rest_email': 'email312.gmail.com'
      },
      {
        'rest_name': 'CUSTOMER 4',
        'uen': 321,
        'rest_email': 'email312.gmail.com'
      },
      {
        'rest_name': 'CUSTOMER15',
        'uen': 23155324,
        'rest_email': 'email312.gmail.com'
      },
      {
        'rest_name': 'CUSTOMER16',
        'uen': 123123554,
        'rest_email': 'email312.gmail.com'
      },
    ];

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
          <Route path='/admin/approverestaurant'><ApproveRest restDetails={pending}/></Route>
          <Route path='/admin/existingrest'><ExistingRest existingList={existing}/></Route> 
          <Route path='/admin/search'><ExistingCust existingList={existing2}/></Route> 
          <Redirect from='/admin' to='/admin/approverestaurant'/>
        </Switch>
      </Box>
      
    </Box>
  )
}
