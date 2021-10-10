import React, { useState } from 'react'
import NavigationDM from '../../components/top-nav/NavigationDM'
import Topbar from '../../components/top-nav/topbar';
import { Box } from '@mui/system';
import ViewPending from './components/ViewPending';
import AcceptedOrders from './components/AcceptedOrders';
import { Redirect, Route, Switch } from 'react-router-dom';

/***********************************************************************
 * Orders Table data
 * fieldnames: 	order_ID, o_cust_ID,	o_rest_ID,	order_datetime,
 * order_type, order_status, total_cost, payment_status
 * NOTE: order_type will contain delivery / preorder,
 * order_status will contain accepted, preparing, delivering, delivered,
 * payment_status (not relevant here?) will be true, false
 ***********************************************************************
 * order_item Table data
 * fieldnames: 	order_item_ID, oi_order_ID, oi_menu_item_ID, 
 * oi_item_name,	special_order
 * NOTE: special_order will contain the customer's special request, like
 * for example, no garlic, not spicy, so on...
 ***********************************************************************
*/

export default function DeliveriesManager() {
  
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
      <NavigationDM isVisible={isVisible} isSelected={isSelected} setIsSelected={setIsSelected} />

      <Box sx={{mt:'80px',  ml:isVisible ? '240px' : '', transition: 'margin 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;'}}>
        <Switch>
          <Route path='/deliveriesmanager/viewpending'><ViewPending/></Route>
          <Route path='/deliveriesmanager/acceptedorders'><AcceptedOrders/></Route>
          <Redirect from='/deliveriesmanager' to='/deliveriesmanager/viewpending'/>
        </Switch>
      </Box>
    </Box>
  )
}
